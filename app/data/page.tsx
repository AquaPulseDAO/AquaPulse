"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";

export default function DataPage() {
  const [devices, setDevices] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("aquapulse.devices");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [selIndex, setSelIndex] = useState(0);

  const [devId, setDevId] = useState("");
  const [devName, setDevName] = useState("");
  const [devVault, setDevVault] = useState("");

  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [csvVault, setCsvVault] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("aquapulse.devices", JSON.stringify(devices));
    } catch {}
  }, [devices]);

  const selDevice = useMemo(() => devices[selIndex], [devices, selIndex]);

  useEffect(() => {
    if (!csvVault && selDevice?.vault) setCsvVault(selDevice.vault);
  }, [selDevice, csvVault]);

  function addDevice() {
    if (!devId.trim() || !devVault.trim()) {
      alert("Please fill at least Device ID and Vault name");
      return;
    }
    const next = [
      ...devices,
      {
        id: devId.trim(),
        name: devName.trim() || devId.trim(),
        vault: devVault.trim(),
      },
    ];
    setDevices(next);
    setSelIndex(next.length - 1);
    setDevId("");
    setDevName("");
    setDevVault("");
  }

  function removeSelected() {
    if (devices.length === 0) return;
    const next = devices.slice();
    next.splice(selIndex, 1);
    setDevices(next);
    setSelIndex(0);
  }

  function splitCSVLine(line) {
    const out = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (ch === "," && !inQ) {
        out.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out.map((s) => s.trim());
  }

  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (!lines.length) return;
    const headers = splitCSVLine(lines[0]).map((h) => h.toLowerCase());
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = splitCSVLine(lines[i]);
      const obj = {};
      headers.forEach((h, j) => (obj[h] = (parts[j] ?? "").trim()));
      data.push(obj);
    }
    setCols(headers);
    setRows(data);
  }

  async function onPickCSV(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    parseCSV(await f.text());
  }

  function clearCSV() {
    setCols([]);
    setRows([]);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function downloadDemoCSV() {
    const d = selDevice?.id || "dev-001";
    const v = csvVault || selDevice?.vault || "vault-001";
    const header = "title,lat,lon,ph,ec,ntu,temp,desc,device,vault";
    const lines = [
      header,
      `Bridge South,46.5191,6.5668,7.2,220,2.1,15.4,Sunny,${d},${v}`,
      `River Bend,46.5211,6.5632,7.3,230,2.0,15.6,Clear,${d},${v}`,
    ].join("\n");
    const blob = new Blob([lines], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aquapulse-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onPublishDemo(e) {
    e.preventDefault();
    if (!selDevice) return alert("Add/select a device first.");
    if (!rows.length) return alert("Upload a CSV first.");
    const resolved = rows.map((r) => ({
      ...r,
      device: r.device || selDevice.id,
      vault: r.vault || csvVault || selDevice.vault,
    }));
    console.log("DEMO — would publish rows:", resolved);
    alert(
      `Demo: ${resolved.length} row(s) ready (device="${selDevice.id}", vault="${selDevice.vault}")`
    );
    clearCSV();
  }

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundVideo />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold">
          Data • Add device & CSV (demo)
        </h1>

        {/* Devices */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
          <h2 className="text-lg font-semibold">Devices</h2>
          <p className="text-sm text-white/70">
            Each device stores a default <b>vault name</b> used when CSV rows
            have no vault.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <input
              value={devId}
              onChange={(e) => setDevId(e.target.value)}
              placeholder="Device ID (required)"
              className="rounded-lg bg-white/10 border border-white/10 px-3 py-2"
            />
            <input
              value={devName}
              onChange={(e) => setDevName(e.target.value)}
              placeholder="Device name (optional)"
              className="rounded-lg bg-white/10 border border-white/10 px-3 py-2"
            />
            <input
              value={devVault}
              onChange={(e) => setDevVault(e.target.value)}
              placeholder="Vault name (required)"
              className="rounded-lg bg-white/10 border border-white/10 px-3 py-2"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={addDevice}
              className="rounded-lg bg-sky-400 text-slate-900 px-4 py-2 font-medium"
            >
              Add device
            </button>
            <button
              onClick={removeSelected}
              className="rounded-lg border border-white/10 bg-white/10 px-4 py-2"
            >
              Remove selected
            </button>
          </div>

          <div className="mt-4">
            <label className="text-sm text-white/70">Selected device</label>
            <select
              className="mt-2 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2"
              value={selIndex}
              onChange={(e) => setSelIndex(parseInt(e.target.value, 10))}
            >
              {devices.length === 0 && <option value={0}>No device</option>}
              {devices.map((d, i) => (
                <option key={`${d.id}-${i}`} value={i}>
                  {d.name || d.id} — id:{d.id} — vault:{d.vault}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* CSV */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
          <h2 className="text-lg font-semibold">CSV (demo)</h2>
          <p className="text-sm text-white/70">
            Required: <code>title,lat,lon</code>. Optional:{" "}
            <code>ph,ec,ntu,temp,desc,device,vault</code>.
          </p>

          <div className="mt-3">
            <label className="block text-sm text-white/70">
              CSV default vault name
            </label>
            <input
              value={csvVault}
              onChange={(e) => setCsvVault(e.target.value)}
              placeholder="Vault name (used if CSV has no vault column)"
              className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {/* Suppression du bouton input type=file */}
            <button
              type="button"
              onClick={downloadDemoCSV}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2"
            >
              Download demo CSV
            </button>
            <button
              type="button"
              onClick={clearCSV}
              className="ml-auto rounded-lg border border-white/10 bg-white/10 px-3 py-2"
            >
              Clear
            </button>
          </div>

          {!!rows.length && (
            <div className="mt-4 overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    {cols.map((c) => (
                      <th key={c} className="px-3 py-2 text-left">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((r, i) => (
                    <tr key={i} className="odd:bg-white/0 even:bg-white/5">
                      {cols.map((c) => (
                        <td key={c} className="px-3 py-2">
                          {r[c] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-3 py-2 text-xs text-white/70">
                Showing {Math.min(5, rows.length)} of {rows.length}
              </div>
            </div>
          )}

          <form onSubmit={onPublishDemo} className="mt-3">
            <button
              className="rounded-lg bg-emerald-400 text-slate-900 px-4 py-2 font-medium"
              disabled={!rows.length || !selDevice}
            >
              {rows.length ? `Publish demo (${rows.length})` : "Publish demo"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
