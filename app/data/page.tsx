"use client";

import { useState, useRef, useEffect } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { SealClient } from "@mysten/seal";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
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
  const [vault, setVault] = useState<Vault | null>(null);
  const [vaultList, setVaultList] = useState<Vault[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const whitelistedId = "0x18959ea37ee943aae83b0a40662d3b94cb4b78070be8c9275178da0966094553";
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
  const packageId = '0x1d8dd04dd5f072d505c0bbb64180b65f402ffc932241af76528a6b6f39fb1035';
  const STORAGE_ID = '0x7aa30758bc879c53dfb723bd6c1110d5f11a36afbf0551ff486ee34dfffefa7c';
  const PUBLISHER = "https://publisher.walrus-testnet.walrus.space";
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const serverObjectIds = ["0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75", "0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8", "0x9c949e53c36ab7a9c484ed9e8b43267a77d4b8d70e79aa6b39042e3d4c434105"];
 
  const sealClient = new SealClient({
    suiClient,
    serverConfigs: serverObjectIds.map((id) => ({
      objectId: id,
      weight: 1,
    })),
    verifyKeyServers: false,
  });

  /** ---------- API Sui ---------- */
  async function fetchVaults(): Promise<Vault[]> {
    const objectId =
      "0x7aa30758bc879c53dfb723bd6c1110d5f11a36afbf0551ff486ee34dfffefa7c";
  
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

  async function fetchContainer(containerId: string) {
    try {
      const response = await fetch("https://fullnode.testnet.sui.io:443", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "sui_getObject",
          params: [
            containerId,
            { showType: true, showOwner: false, showContent: true },
          ],
        }),
      });
      const json = await response.json();
      return json?.result?.data?.content?.fields;
    } catch (e) {
      console.error("Failed to fetch container", e);
      return null;
    }
  }
  
  /** ---------- Utils CSV ---------- */
  function splitCSVLine(line: string): string[] {
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

  async function onPublishDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rows.length) {
      alert("Upload a CSV first.");
      return;
    }
    if (!vault?.fields?.container_addr) {
      alert("Select a vault first.");
      return;
    }
    const f = inputRef.current?.files?.[0];
    if (!f) {
      alert("Pick a CSV file first.");
      return;
    }

    const blobId = await storeCSV_flie(f);
    await submitToVault(vault.fields.container_addr, String(blobId));
    clearCSV();
  }

  /** ---------- API Walrus ---------- */
  
  const storeCSV_flie = async(csv_file: File): Promise<string> => {
    const text = await csv_file?.text();
    const sealed_data = new TextEncoder().encode(text);
    // console.log("Encrypting data...");
    // const { encryptedObject: encryptedBytes, key: backupKey } = await sealClient.encrypt({
    //     threshold: 1,
    //     packageId: packageId,
    //     id: whitelistedId,
    //     data: sealed_data
    // });
    // console.log("Encrypted data: ", encryptedBytes);
    const res = await fetch(`${PUBLISHER}/v1/blobs?epochs=10`, {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
      },
      body: sealed_data,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Upload failed: ${res.status} ${res.statusText} ${text}`);
    }

    // Walrus publisher returns JSON with info about the blob
    const data = await res.json();
    console.log("Publisher response:", data?.newlyCreated.blobObject.blobId);
    const id = data?.newlyCreated.blobObject.blobId;
    if (!id) throw new Error("Publisher response missing blob id");
    return String(id);
  }
  async function submitToVault(containerId: string, blobId: string) {
    if (!containerId) return;
    const tx = new Transaction();

    tx.moveCall({
      target: `${packageId}::CleanWater::submit_data`,
      arguments: [tx.object(containerId), tx.pure.string(blobId)],
    });

    await new Promise<void>((resolve, reject) =>
      signAndExecuteTransaction(
        {
          transaction: tx,
          chain: 'sui:testnet',
        },
        {
          onSuccess: (result) => {
            console.log('executed transaction', result);
            resolve();
          },
          onError: (err) => {
            console.error(err);
            reject(err);
          }
        },
      )
    );
  }

  async function createVaultOnChain(params: { title: string; amount: number; max: number }) {
    const { title, amount, max } = params;
    const tx = new Transaction();

    const coin = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);

    tx.moveCall({
      target: `${packageId}::CleanWater::create_vault`,
      arguments: [
        tx.object(STORAGE_ID),
        tx.pure.string(title),
        tx.pure.u64(amount),
        coin,
        tx.pure.u32(max),
      ],
    });

    await new Promise<void>((resolve, reject) =>
      signAndExecuteTransaction(
        { transaction: tx, chain: 'sui:testnet' },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        },
      )
    );

    const vs = await fetchVaults();
    setVaultList(vs);
    const first = vs[0] ?? null;
    setVault(first);
    setCsvVault(first?.fields?.container_addr ?? "");
  }
  /** ---------- Charge les vaults au montage ---------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const vs = await fetchVaults();
      if (!cancelled) {
        setVaultList(vs);
        // pré-sélection du premier vault si vide
        const first = vs[0] ?? null;
        const firstAddr = first?.fields?.container_addr;
        setVault(first);
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

  // Optionally fetch full container info when selection changes
  useEffect(() => {
    (async () => {
      const addr = vault?.fields?.container_addr;
      if (!addr) return;
      const info = await fetchContainer(addr);
      console.log("Selected vault container info:", info);
    })();
  }, [vault]);

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
              value={vault?.fields?.container_addr ?? ""}
              onChange={(e) => {
                const addr = e.target.value;
                const v = vaultList.find((x) => x.fields?.container_addr === addr) ?? null;
                setVault(v);
                setCsvVault(addr);
              }}
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
