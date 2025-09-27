"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import BackgroundVideo from "../components/BackgroundVideo";
import VaultCard from "../components/VaultCard";
import { fetchVaultsDemo, fetchOwnerCapsFor, type Vault } from "../lib/demo";

export default function AccessPage() {
  const router = useRouter();
  const account = useCurrentAccount();

  const [vaults, setVaults] = useState<Vault[]>([]);
  const [caps, setCaps] = useState<string[]>([]);
  const address = account?.address;

  useEffect(() => {
    (async () => {
      const [v, owned] = await Promise.all([fetchVaultsDemo(), fetchOwnerCapsFor(address)]);
      setVaults(v);
      setCaps(owned);
    })();
  }, [address]);

  const canAccess = useMemo(() => new Set(caps), [caps]);

  function openVault(v: Vault) {
    if (canAccess.has(v.id)) router.push(`/vault/${v.id}`);
    else router.push(`/access-denied?vid=${encodeURIComponent(v.id)}`);
  }

  return (
    <div className="relative">
      <BackgroundVideo />
      <main className="relative z-0 mx-auto max-w-6xl px-4 py-12 text-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Vault Access</h1>
          <span className="rounded-full bg-amber-400/20 text-amber-200 px-3 py-1 text-xs border border-amber-300/30">
            DEMO — replace with on-chain queries
          </span>
        </div>
        <p className="mt-3 text-lg text-slate-200/90">
          Click a vault to view its full dataset and charts. Access requires an <strong>OwnerCap</strong>.
        </p>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vaults.map((v) => (
            <VaultCard
              key={v.id}
              title={v.name}
              subtitle={v.location}
              preview={v.preview}
              locked={!canAccess.has(v.id)}
              onClick={() => openVault(v)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
