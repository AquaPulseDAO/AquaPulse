"use client";

import { useState, useRef, useEffect } from "react";
import BackgroundVideo from "../components/BackgroundVideo";

// --- Export de la liste des vaults récupérés ---
export let INITIAL_VAULT_LIST = [];

// Fonction pour récupérer la liste depuis Sui
async function fetchVaults() {
  const objectId = "0x29ee0e7fb4d9867235899cdccdda33ad365f78241ca6f208ba2a9fb66e242c11"; 
  try {
    const response = await fetch("https://fullnode.testnet.sui.io:443", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sui_getObject",
        params: [objectId,
          {
            showType: true,
            showOwner: false,
            showPreviousTransaction: true,
            showDisplay: false,
            showContent: true,
            showBcs: false,
            showStorageRebate: true
          }
        ],
      }),
    });

    const data = await response.json();
    const vaults = data.result?.data?.content?.fields?.storage ?? [];
    INITIAL_VAULT_LIST = vaults;
  } catch (err) {
    console.error("Erreur lors de la récupération des vaults:", err);
    INITIAL_VAULT_LIST = [];
  }
}

// Appel immédiat pour remplir INITIAL_VAULT_LIST
fetchVaults();

export default function DataPage() {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [csvVault, setCsvVault] = useState("");
  const [vaultList, setVaultList] = useState([]);
  const inputRef = useRef(null);

  // --- CSV Parsing ---
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
      .filter((h) => h !== "vault");
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

  // --- Mise à jour automatique de vaultList après fetch ---
  useEffect(() => {
    console.log("Vault list raw:", INITIAL_VAULT_LIST); // Pour vérifier
    setVaultList([...INITIAL_VAULT_LIST]);
  }, []);

  // --- Fonction utilitaire pour récupérer le nom d’un vault ---
  function getVaultLabel(vault) {
    return vault.fields?.title || "Unknown Vault";
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
                  <option key={i} value={v.fields.container_addr}>
                    {getVaultLabel(v)}
                  </option>
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
