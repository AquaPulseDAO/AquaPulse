"use client";

import { useEffect, useState } from "react";
import { WalrusClient } from "@mysten/walrus";
import { useParams, useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import BackgroundVideo from "../../components/BackgroundVideo";
import { fetchOwnerCapsFor, fetchVaultDataDemo, type Reading } from "../../lib/demo";
import { Vault } from "../../lib/demo";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
export default function VaultDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  console.log("VaultDetailPage: ", id);
  const account = useCurrentAccount();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string | undefined>(undefined);
  // Liste des tuples (septuplés)
  const [rows, setRows] = useState<Reading[]>([]);
  console.log(rows);
  useEffect(() => {
    (async () => {
      setLoading(true);
      //const caps = await fetchOwnerCapsFor(account?.address);
      //const ok = !!id && caps.includes(id);
      const ok = true;
      setAllowed(true);
      if (!ok) {
        router.replace(
          `/access-denied?vid=${encodeURIComponent(String(id || ""))}`
        );
        return;
      }

      // DEMO: récupère une liste de lectures (chaque lecture = septuplé)
      const data = await fetchVaultsOnChain();
      // setName(data.name);
      // setLocation(data.location);

      // // On remplit rows avec tous les septuplés disponibles
      // setRows(Array.isArray(data.readings) ? data.readings : []);
      setLoading(false);
    })();
  }, [id, account?.address, router]);
  const suiClient = new SuiClient({
      url: getFullnodeUrl('testnet'),
  });

  const walrusClient = new WalrusClient({
      network: 'testnet',
      suiClient,
  });

  // --- CSV helpers ---
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

  function parseCSVToReadings(text: string): Reading[] {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (!lines.length) return [];
    const rawHeader = lines[0].replace(/^\s*sv:\s*/i, "");
    const headers = splitCSVLine(rawHeader).map((h) => h.toLowerCase());
    const idx: Record<string, number> = {};
    headers.forEach((h, i) => (idx[h] = i));

    const toNum = (s?: string): number | undefined => {
      if (s === undefined) return undefined;
      const n = Number.parseFloat(s);
      return Number.isFinite(n) ? n : undefined;
    };

    const readings: Reading[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = splitCSVLine(lines[i]);
      const latStr = parts[idx["lat"]] ?? "";
      
      const lonStr = parts[idx["lon"]] ?? "";
      const lat = toNum(latStr);
      const lon = toNum(lonStr);
      if (lat === undefined || lon === undefined) continue; // require coordinates

      const reading: Reading = {
        device: parts[idx["device"]] ?? undefined,
        lat,
        lon,
        ph: toNum(parts[idx["ph"]]),
        ec: toNum(parts[idx["ec"]]),
        ntu: toNum(parts[idx["ntu"]]),
        temp: toNum(parts[idx["temp"]]),
      };
      readings.push(reading);
    }
    return readings;
  }

  async function fetchVaultsOnChain(): Promise<Vault[]> {
    const objectId =
      id;

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
              showPreviousTransaction: false,
              showDisplay: false,
              showContent: true,
              showBcs: false,
              showStorageRebate: false,
            },
          ],
        }),
      });

      const data = await response.json();
      const storage = data?.result?.data?.content?.fields?.blobIds as string[] | undefined;
      console.log("storage: ", storage);
      const allReadings: Reading[] = [];
      if (Array.isArray(storage)) {
        for (const blobId of storage) {
          try {
            const blob = await walrusClient.readBlob({ blobId });
            const csv = new TextDecoder().decode(blob);
            const readings = parseCSVToReadings(csv);
            console.log("readings: ", readings);
            allReadings.push(...readings);
          } catch (e) {
            console.error("Failed to read/parse blob", blobId, e);
          }
        }
      }
      setRows(allReadings);
      if (!storage || !Array.isArray(storage)) return [];
      return storage;
    } catch (err) {
      console.error("Erreur fetchVaultsOnChain:", err);
      return [];
    }
  }
  if (loading || allowed === null) {
    return (
      <div className="relative">
        <BackgroundVideo />
        <div className="relative z-0 mx-auto max-w-5xl px-4 py-16 text-slate-100">
          Loading…
        </div>
      </div>
    );
  }

  // Helper pour formater les nombres en toute sécurité
  function fmtNumber(value: unknown, decimals = 2) {
    if (value === undefined || value === null || value === "") return "-";
    const n = Number(value);
    if (!Number.isFinite(n)) return "-";
    return n.toFixed(decimals);
  }

  return (
    <div className="relative">
      <BackgroundVideo />
      <main className="relative z-0 mx-auto max-w-6xl px-4 py-12 text-slate-100">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          {name}
        </h1>
        {location && <p className="text-lg text-slate-200/90 mt-1">{location}</p>}
        {/* Tableau des septuplés */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">Stored Data</h2>
          {rows.length === 0 ? (
            <p className="text-slate-400">No data available.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-3 py-2 text-left">Device</th>
                    <th className="px-3 py-2 text-left">Latitude</th>
                    <th className="px-3 py-2 text-left">Longitude</th>
                    <th className="px-3 py-2 text-left">pH</th>
                    <th className="px-3 py-2 text-left">EC (µS/cm)</th>
                    <th className="px-3 py-2 text-left">NTU</th>
                    <th className="px-3 py-2 text-left">Temp (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="odd:bg-white/0 even:bg-white/5">
                      <td className="px-3 py-2 font-medium">{r.device ?? "-"}</td>
                      <td className="px-3 py-2">{fmtNumber(r.lat, 4)}</td>
                      <td className="px-3 py-2">{fmtNumber(r.lon, 4)}</td>
                      <td className="px-3 py-2">{fmtNumber(r.ph, 2)}</td>
                      <td className="px-3 py-2">{fmtNumber(r.ec, 0)}</td>
                      <td className="px-3 py-2">{fmtNumber(r.ntu, 1)}</td>
                      <td className="px-3 py-2">{fmtNumber(r.temp, 1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
