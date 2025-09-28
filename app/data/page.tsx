"use client";

import { useState, useRef, useEffect } from "react";
import BackgroundVideo from "../components/BackgroundVideo";

/** ---------- Types ---------- */
type Row = Record<string, string>;

type Vault = {
  fields?: {
    container_addr?: string;
    title?: string;
    // autres champs éventuels…
  };
} & Record<string, unknown>;

/** Type minimal pour typer la réponse JSON de sui_getObject */
type SuiGetObjectResponse = {
  jsonrpc?: string;
  id?: number | string;
  result?: {
    data?: {
      content?: {
        fields?: {
          storage?: unknown;
        };
      };
    };
  };
  error?: unknown;
};

/** ---------- API Sui ---------- */
async function fetchVaults(): Promise<Vault[]> {
  const objectId =
    "0x29ee0e7fb4d9867235899cdccdda33ad365f78241ca6f208ba2a9fb66e242c11";

  try {
    const response = await fetch("https://fullnode.testnet.sui.io:443", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sui_getObject",
        params: [
          objectId,
          {
            showType: true,
            showOwner: false,
            showPreviousTransaction: true,
            showDisplay: false,
            showContent: true,
            showBcs: false,
            showStorageRebate: true,
          },
        ],
      }),
    });

    const json: SuiGetObjectResponse = await response.json();
    const storage = json?.result?.data?.content?.fields?.storage;

    if (Array.isArray(storage)) {
      // On suppose que chaque entrée ressemble à Vault
      return storage as Vault[];
    }
    return [];
  } catch (err) {
    console.error("Erreur lors de la récupération des vaults:", err);
    return [];
  }
}

/** ---------- Utils CSV ---------- */
function splitCSVLine(line: any): string[] {
  const out: string[] = [];
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

export default function DataPage(): JSX.Element {
  const [cols, setCols] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [csvVault, setCsvVault] = useState<string>("");
  const [vaultList, setVaultList] = useState<Vault[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function parseCSV(text: string): void {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (!lines.length) return;

    const headers = splitCSVLine(lines[0])
      .map((h) => h.toLowerCase())
      .filter((h) => h !== "vault"); // on ignore la colonne "vault" si présente

    const data: Row[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = splitCSVLine(lines[i]);
      const obj: Row = {};
      headers.forEach((h, j) => {
        obj[h] = (parts[j] ?? "").trim();
      });
      data.push(obj);
    }

    setCols(headers);
    setRows(data);
  }

  function onPickCSV(e: React.ChangeEvent<HTMLInputElement>): void {
    const f = e.target.files?.[0];
    if (!f) return;
    void f.text().then(parseCSV);
  }

  function clearCSV(): void {
    setCols([]);
    setRows([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onPublishDemo(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!rows.length) {
      alert("Upload a CSV first.");
      return;
    }
    alert(
      `Demo: ${rows.length} row(s) ready to publish in vault "${
        csvVault || "No vault"
      }".`
    );
    clearCSV();
  }

  /** ---------- Charge les vaults au montage ---------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const vs = await fetchVaults();
      if (!cancelled) {
        setVaultList(vs);
        // pré-sélection du premier vault si vide
        const firstAddr = vs[0]?.fields?.container_addr;
        if (!csvVault && typeof firstAddr === "string" && firstAddr.length > 0) {
          setCsvVault(firstAddr);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // chargement unique

  function getVaultLabel(v: Vault): string {
    return v.fields?.title || "Unknown Vault";
  }

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundVideo />

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">CSV (demo)</h1>
        <p className="mt-1 text-sm text-white/70">
          Required: <code>title,lat,lon</code>. Optional:{" "}
          <code>ph,ec,ntu,temp,desc,device</code>.
        </p>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/30 p-5">
          <div className="mb-3">
            <label className="block text-sm text-white/70">CSV Vault Name</label>
            <select
              value={csvVault}
              onChange={(e) => setCsvVault(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2"
            >
              {vaultList.length > 0 ? (
                vaultList.map((v, i) => (
                  <option key={i} value={v.fields?.container_addr ?? ""}>
                    {getVaultLabel(v)}
                  </option>
                ))
              ) : (
                <option value="">No vault</option>
              )}
            </select>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-3">
            <label
              htmlFor="csv-upload"
              className="cursor-pointer rounded-lg border border-white/10 bg-white/10 px-3 py-2"
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
            <div className="mb-3 overflow-x-auto rounded-lg border border-white/10">
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
                          {r[c] ?? ""}
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

          <form onSubmit={onPublishDemo}>
            <button
              className="rounded-lg bg-emerald-400 px-4 py-2 font-medium text-slate-900"
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
