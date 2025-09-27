"use client";

import { useRef, useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { useCurrentAccount } from "@mysten/dapp-kit";

type Row = Record<string, string>;

export default function PublishDataPage() {
  const account = useCurrentAccount();

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // --- Minimal CSV parser with quoted fields support ---
  function splitCSVLine(line: string): string[] {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"'; // escaped quote
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        out.push(cur);
        cur = "";
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
    const f = e.target.files?.[0];
    setCsvFile(f ?? null);
    setColumns([]);
    setRows([]);

    if (!f) return;
    if (!/\.csv$/i.test(f.name) && !/text\/csv/.test(f.type)) {
      setError("Please select a .csv file.");
      return;
    }

    const text = await f.text();
    try {
      const { headers, data } = parseCSV(text);
      // Minimal validation: title, lat, lon required headers
      const required = ["title", "lat", "lon"];
      const missing = required.filter((h) => !headers.includes(h));
      if (missing.length) {
        setError(`Missing required columns: ${missing.join(", ")}`);
        return;
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

    setBusy(true);
    setError(null);
    try {
      // TODO: Replace with your Move call using @mysten/sui
      // Example: for (const r of rows) publish r.title, r.ph, r.ec, r.ntu, r.temp, r.lat, r.lon, r.desc
      await new Promise((r) => setTimeout(r, 900)); // simulate
      setOk(`Published ${rows.length} row(s) to Sui!`);

      // Reset (keep file name? choose to clear for safety)
      clearCSV();
      setTimeout(() => setOk(null), 1800);
    } catch (err: any) {
      setError(err?.message || "Failed to publish.");
    } finally {
      setBusy(false);
    }
  }

  const isDisabled = busy || !account || rows.length === 0;

  return (
    <div className="relative">
      {/* Video only on /data */}
      <BackgroundVideo />

      <div className="relative z-0 mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold">Publish data (CSV)</h1>
        <p className="mt-2 text-slate-300">
          Upload a CSV with columns: <span className="font-semibold">title, lat, lon</span>{" "}
          (optional: <span className="font-semibold">ph, ec, ntu, temp, desc</span>).
        </p>

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

          {/* CSV picker */}
          <div className="grid gap-4 md:grid-cols-[1fr,auto] md:items-end">
            <div>
              <label className="block text-sm font-semibold">CSV file</label>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={onPickCSV}
                className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-sky-400 file:px-4 file:py-2 file:font-semibold file:text-slate-900 hover:file:bg-sky-300"
              />
              <p className="mt-2 text-xs text-slate-300/90">
                Example header: <code className="font-mono">title,lat,lon,ph,ec,ntu,temp,desc</code>
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
                title={!account ? "Connect your wallet in the top bar" : undefined}
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
