"use client";

import { useState, useRef } from "react";
import BackgroundVideo from "../components/BackgroundVideo";

export default function DataPage() {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [csvVault, setCsvVault] = useState("");
  const [vaultList, setVaultList] = useState([]); // Liste des vaults
  const inputRef = useRef(null);

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
    const headers = splitCSVLine(lines[0])
      .map((h) => h.toLowerCase())
      .filter((h) => h !== "vault"); // On supprime 'vault' des colonnes
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

  function onPickCSV(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    f.text().then(parseCSV);
  }

  function clearCSV() {
    setCols([]);
    setRows([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onPublishDemo(e) {
    e.preventDefault();
    if (!rows.length) return alert("Upload a CSV first.");
    alert(`Demo: ${rows.length} row(s) ready to publish in vault "${csvVault || "No vault"}".`);
    clearCSV();
  }

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundVideo />

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">CSV (demo)</h1>
        <p className="text-sm text-white/70 mt-1">
          Required: <code>title,lat,lon</code>. Optional: <code>ph,ec,ntu,temp,desc,device</code>.
        </p>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/30 p-5">
          <div className="mb-3">
            <label className="block text-sm text-white/70">CSV Vault Name</label>
            <select
              value={csvVault}
              onChange={(e) => setCsvVault(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2"
            >
              {vaultList && vaultList.length > 0 ? (
                vaultList.map((v, i) => (
                  <option key={i} value={v}>{v}</option>
                ))
              ) : (
                <option value="">No vault</option>
              )}
            </select>
          </div>

          <div className="flex flex-wrap gap-3 items-center mb-3">
            <label
              htmlFor="csv-upload"
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 cursor-pointer"
            >
              Upload CSV file
            </label>
            <input
              ref={inputRef}
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={onPickCSV}
              className="hidden"
            />

            <button
              type="button"
              onClick={clearCSV}
              className="ml-auto rounded-lg border border-white/10 bg-white/10 px-3 py-2"
            >
              Clear
            </button>
          </div>

          {/* Tableau uniquement si un CSV réel est chargé */}
          {rows.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-white/10 mb-3">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    {cols.map((c) => (
                      <th key={c} className="px-3 py-2 text-left">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((r, i) => (
                    <tr key={i} className="odd:bg-white/0 even:bg-white/5">
                      {cols.map((c) => (
                        <td key={c} className="px-3 py-2">{r[c] || ""}</td>
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

          <form onSubmit={onPublishDemo}>
            <button
              className="rounded-lg bg-emerald-400 text-slate-900 px-4 py-2 font-medium"
              disabled={!rows.length}
            >
              {rows.length ? `Publish demo (${rows.length})` : "Publish demo"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
