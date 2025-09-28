"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import BackgroundVideo from "../components/BackgroundVideo";
import VaultCard from "../components/VaultCard";

export type Vault = {
  id: string;
  name: string;
  location: string;
  preview?: string;
};

export default function AccessPage() {
  const account = useCurrentAccount();
  const router = useRouter();
  const address = account?.address;

  const [vaults, setVaults] = useState<Vault[]>([]);

  // ⚡ Fonction pour récupérer les vaults on-chain
  async function fetchVaultsOnChain(): Promise<Vault[]> {
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
      const storage = data?.result?.data?.content?.fields?.storage;

      if (!storage || !Array.isArray(storage)) return [];

      return storage.map((item: any, index: number) => ({
        id: item.fields?.container_addr ?? `vault-${index}`,
        name: item.fields?.title ?? `Vault ${index + 1}`,
        location: item.fields?.location ?? "Unknown",
        preview: undefined,
      }));
    } catch (err) {
      console.error("Erreur fetchVaultsOnChain:", err);
      return [];
    }
  }

  useEffect(() => {
    if (!address) return;

    (async () => {
      const v = await fetchVaultsOnChain();
      setVaults(v);
    })();
  }, [address]);

  // ✅ Plus de contrôle d’accès → tout est accessible
  const openVault = (v: Vault) => {
    router.push(`/vault/${v.id}`);
  };

  return (
    <div className="relative">
      <BackgroundVideo />
      <main className="relative z-0 mx-auto max-w-6xl px-4 py-12 text-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Vault Access
          </h1>
          <span className="rounded-full bg-emerald-400/20 text-emerald-200 px-3 py-1 text-xs border border-emerald-300/30">
            ✅ All vaults accessible
          </span>
        </div>
        <p className="mt-3 text-lg text-slate-200/90">
          Click a vault to view its files.
        </p>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vaults.length === 0 ? (
            <p className="text-slate-400 col-span-full">No vaults created yet.</p>
          ) : (
            vaults.map((v) => (
              <VaultCard
                key={v.id}
                title={v.name}
                subtitle={v.location}
                preview={v.preview}
                locked={false} // ✅ Toujours accessible
                onClick={() => openVault(v)}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
