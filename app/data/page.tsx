"use client";

import { useEffect, useRef, useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { useCurrentAccount } from "@mysten/dapp-kit";

type Row = Record<string, string>;
type Device = { id: string; name: string };

const LS_KEY = "aquapulse.devices";

export default function PublishDataPage() {
  const account = useCurrentAccount();

  // --- Devices state ---
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [newDevName, setNewDevName] = useState("");
  const [newDevId, setNewDevId] = useState("");

  // --- CSV state ---
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load & persist devices (demo)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Device[];
        setDevices(parsed);
        if (parsed[0]) setSelectedDeviceId(parsed[0].id);
      } else {
        const seed = [{ id: "dev-001", name: "River Edge #1" }];
        setDevices(seed);
        setSelectedDeviceId(seed[0].id);
        localStorage.setItem(LS_KEY, JSON.stringify(seed));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(devices));
    } catch { /* ignore */ }
  }, [devices]);

  function addDevice() {
    setError(null);
    if (!newDevName.trim() || !newDevId.trim()) {
      setError("Please provide both a device name and a device ID.");
      return;
    }
    if (devices.some((d) => d.id === newDevId.trim())) {
      setError("This device ID already exists.");
      return;
    }
    const next = [...devices, { id: newDevId.trim(), name: newDevName.trim() }];
    setDevices(next);
    setSelectedDeviceId(newDevId.trim());
    setNewDevId("");
    setNewDevName("");
  }

  function removeDevice(id: string) {
    const next = devices.filter((d) => d.id !== id);
    setDevices(next);
    if (selectedDeviceId === id) setSelectedDeviceId(next[0]?.id ?? "");
  }

  // --- CSV parsing (with quotes support) ---
  function splitCSVLine(line: string): string[] {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === "," && !inQuotes) {
        out.push(cur); cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out.map((s) => s.trim());
  }

  function parseCSV(text: string): { headers: string[]; data: Row[] } {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) throw new Error("Empty CSV.");
    const headers = splitCSVLine(lines[0]).map((h) => h.toLowerCase());
    const data: Row[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = splitCSVLine(lines[i]);
      const row: Row = {};
      headers.forEach((h, idx) => (row[h] = (parts[idx] ?? "").trim()));
      data.push(row);
    }
    return { headers, data };
  }

  async function onPickCSV(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0] || null;
    setCsvFile(f);
    setColumns([]);
    setRows([]);

    if (!f) return;
    if (!/\.csv$/i.test(f.name) && !/text\/csv/.test(f.type)) {
      setError("Please select a .csv file."); return;
    }

    const text = await f.text();
    try {
      const { headers, data } = parseCSV(text);
      const required = ["title", "lat", "lon"];
      const missing = required.filter((h) => !headers.includes(h));
      if (missing.length) {
        setError(`Missing required columns: ${missing.join(", ")}`); return;
      }
      setColumns(headers);
      setRows(data);
    } catch (err: any) {
      setError(err?.message || "Failed to parse CSV.");
    }
  }

  function clearCSV() {
    setCsvFile(null);
    setColumns([]);
    setRows([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!account) return alert("Connect your wallet in the top bar first.");
    if (rows.length === 0) return setError("Please upload a CSV first.");

    const hasDeviceColumn = columns.includes("device");
    if (!hasDeviceColumn && !selectedDeviceId) {
      setError('Select a device or include a "device" column in your CSV.');
      return;
    }
    for (let i = 0; i < rows.length; i++) {
      const rowDev = hasDeviceColumn ? rows[i]["device"]?.trim() : selectedDeviceId;
      if (!rowDev) {
        setError(`Row ${i + 1} has no device. Please select a default device or add a "device" column.`);
        return;
      }
    }

    setBusy(true);
    setError(null);
    try {
      // DEMO ONLY: no real on-chain write, we just simulate a delay
      await new Promise((r) => setTimeout(r, 900));
      setOk(`Demo: published ${rows.length} row(s)${hasDeviceColumn ? "" : ` with device "${selectedDeviceId}"`}.`);
      clearCSV();
      setTimeout(() => setOk(null), 1800);
    } catch (err: any) {
      setError(err?.message || "Failed to publish (demo).");
    } finally {
      setBusy(false);
    }
  }

  const isDisabled = busy || !account || rows.length === 0;

  return (
    <div className="relative">
      <BackgroundVideo />

      <div className="relative z-0 mx-auto max-w-5xl px-4 py-12">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold">Publish data (CSV)</h1>
          <span className="rounded-full bg-amber-400/20 text-amber-200 px-3 py-1 text-xs border border-amber-300/30">
            DEMO ONLY
          </span>
        </div>

        <p className="mt-2 text-slate-300">
          choose a device 
        </p>

        {/* DEVICE CARD */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <h2 className="text-xl font-semibold">Device</h2>
          <p className="text-sm text-slate-300 mt-1">
            Choose a device.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="w-full sm:w-80 rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
            >
              {devices.length === 0 && <option value="">No device yet</option>}
              {devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.id}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => selectedDeviceId && removeDevice(selectedDeviceId)}
              className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/5 transition disabled:opacity-40"
              disabled={!selectedDeviceId}
              title="Remove selected device"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              value={newDevName}
              onChange={(e) => setNewDevName(e.target.value)}
              placeholder="Device name (e.g., River Edge #2)"
              className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
            />
            <input
              value={newDevId}
              onChange={(e) => setNewDevId(e.target.value)}
              placeholder="Device ID (e.g., dev-002 or on-chain object ID)"
              className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
            />
            <button
              type="button"
              onClick={addDevice}
              className="rounded-xl px-4 py-2 bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
            >
              Add device
            </button>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg"
        >
          {/* Toasts */}
          {ok && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-emerald-400/90 px-6 py-3 text-slate-900 font-semibold shadow-lg">
              {ok}
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-xl bg-rose-500/15 border border-rose-400/30 px-4 py-3 text-rose-100">
              {error}
            </div>
          )}

          {/* CSV picker (custom so labels are always in English) */}
          <div className="grid gap-4 md:grid-cols-[1fr,auto] md:items-end">
            <div>
              <label className="block text-sm font-semibold">CSV file</label>

              <div className="mt-2 flex items-center gap-4">
                {/* Hidden input */}
                <input
                  id="csvInput"
                  ref={inputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={onPickCSV}
                  className="sr-only"
                />
                {/* Custom button */}
                <label
                  htmlFor="csvInput"
                  className="cursor-pointer rounded-lg bg-sky-400 px-4 py-2 font-semibold text-slate-900 hover:bg-sky-300 transition"
                >
                  Select CSV
                </label>
                {/* Filename */}
                <span className="text-slate-200/90 text-sm">
                  {csvFile ? csvFile.name : "No file selected"}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-300/90">
                Example header: <code className="font-mono">title,lat,lon,ph,ec,ntu,temp,desc,device</code>
              </p>
              <p className="mt-1 text-xs text-amber-200/90">
                Demo: publishing is simulated.
              </p>
            </div>

            <div className="flex gap-2 md:justify-end">
              <button
                type="button"
                onClick={clearCSV}
                className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/5 transition"
                disabled={!csvFile}
                title="Clear selected file"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isDisabled}
                className={`rounded-xl px-6 py-2.5 font-semibold transition
                  ${isDisabled
                    ? "bg-white/10 text-slate-400 cursor-not-allowed"
                    : "bg-sky-400 text-slate-900 hover:bg-sky-300"}`}
                title={!account ? "Connect your wallet in the top bar" : "Demo publish (simulated)"}
              >
                {busy ? "Publishing…" : rows.length > 0 ? `Publish ${rows.length} row(s)` : "Publish"}
              </button>
            </div>
          </div>

          {/* Preview (first 5 rows) */}
          {rows.length > 0 && (
            <div className="mt-6 overflow-auto rounded-xl border border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/10">
                  <tr>
                    {columns.map((col) => (
                      <th key={col} className="px-3 py-2 text-left font-semibold capitalize">
                        {col}
                      </th>
                    ))}
                    {!columns.includes("device") && (
                      <th className="px-3 py-2 text-left font-semibold">device (default)</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rows.slice(0, 5).map((r, idx) => (
                    <tr key={idx} className="odd:bg-white/0 even:bg-white/[0.03]">
                      {columns.map((c) => (
                        <td key={c} className="px-3 py-2 text-slate-200/90">
                          {r[c] ?? ""}
                        </td>
                      ))}
                      {!columns.includes("device") && (
                        <td className="px-3 py-2 text-slate-300/90">{selectedDeviceId || "—"}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-3 py-2 text-xs text-slate-300/90">
                Showing {Math.min(5, rows.length)} of {rows.length} row(s).
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
