"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import BackgroundVideo from "../../components/BackgroundVideo";
import LineChart from "../../components/charts/LineChart";
import { fetchOwnerCapsFor, fetchVaultDataDemo, type Reading } from "../../lib/demo";

export default function VaultDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const account = useCurrentAccount();

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [rows, setRows] = useState<Reading[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // DEMO: remplace fetchOwnerCapsFor() par une lecture on-chain
      const caps = await fetchOwnerCapsFor(account?.address);
      const ok = !!id && caps.includes(id);
      setAllowed(ok);
      if (!ok) {
        router.replace(`/access-denied?vid=${encodeURIComponent(String(id || ""))}`);
        return;
      }
      const data = await fetchVaultDataDemo(String(id));
      setName(data.name);
      setLocation(data.location);
      setRows(data.readings);
      setLoading(false);
    })();
  }, [id, account?.address, router]);

  const seriesPH   = useMemo(() => rows.map(r => ({ x: r.t, y: r.ph })),   [rows]);
  const seriesEC   = useMemo(() => rows.map(r => ({ x: r.t, y: r.ec })),   [rows]);
  const seriesNTU  = useMemo(() => rows.map(r => ({ x: r.t, y: r.ntu })),  [rows]);
  const seriesTEMP = useMemo(() => rows.map(r => ({ x: r.t, y: r.temp })), [rows]);

  if (loading || allowed === null) {
    return (
      <div className="relative">
        <BackgroundVideo />
        <div className="relative z-0 mx-auto max-w-5xl px-4 py-16 text-slate-100">Loading…</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <BackgroundVideo />
      <main className="relative z-0 mx-auto max-w-6xl px-4 py-12 text-slate-100">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{name}</h1>
        {location && <p className="text-lg text-slate-200/90 mt-1">{location}</p>}

        {rows.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-sm text-slate-300">Last pH</div>
              <div className="text-2xl font-bold">{rows.at(-1)!.ph.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-sm text-slate-300">Last EC (µS/cm)</div>
              <div className="text-2xl font-bold">{rows.at(-1)!.ec.toFixed(0)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-sm text-slate-300">Last Turbidity (NTU)</div>
              <div className="text-2xl font-bold">{rows.at(-1)!.ntu.toFixed(1)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-sm text-slate-300">Last Temp (°C)</div>
              <div className="text-2xl font-bold">{rows.at(-1)!.temp.toFixed(1)}</div>
            </div>
          </div>
        )}

        {/* Charts */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">pH</h3>
            <LineChart data={seriesPH} height={180} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">EC (µS/cm)</h3>
            <LineChart data={seriesEC} height={180} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Turbidity (NTU)</h3>
            <LineChart data={seriesNTU} height={180} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Temperature (°C)</h3>
            <LineChart data={seriesTEMP} height={180} />
          </div>
        </section>
      </main>
    </div>
  );
}
