"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount, useCurrentWallet, useSignPersonalMessage } from "@mysten/dapp-kit";
import BackgroundVideo from "../components/BackgroundVideo";
import VaultCard from "../components/VaultCard";
import { fromHex } from "@mysten/sui/utils";
import { Transaction } from "@mysten/sui/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { SealClient, SessionKey } from '@mysten/seal';
import { WalrusClient } from '@mysten/walrus';
export type Vault = {
  id: string;
  name: string;
  location: string;
  preview?: string;
};
export default function AccessPage() {
        const account = useCurrentAccount();
        const { mutate: signPersonalMessage } = useSignPersonalMessage();
        // ⚡ Fonction pour récupérer les vaults on-chain
        const [signature, setSignature] = useState("");
        async function fetchVaultsOnChain(): Promise<Vault[]> {
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


        const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
        const packageId = '0xe37a3c98f07d70b15123de1e46c5c85c83d40e69371914dad2881d3d149a98c8';
        // const secretKey = process.env.PRIVATE_KEY;
        // if (!secretKey) {
        //     process.exit(1)
        // }
        // const keypair = Ed25519Keypair.fromSecretKey(secretKey);
        // const suiAddress = keypair.getPublicKey().toSuiAddress();
        // Replace this with a list of custom key server object IDs.
        const serverObjectIds = ["0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75", "0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8", "0x9c949e53c36ab7a9c484ed9e8b43267a77d4b8d70e79aa6b39042e3d4c434105"];
        // const serverObjectIds = getAllowlistedKeyServers('testnet');
        const whitelistedId = "0x18959ea37ee943aae83b0a40662d3b94cb4b78070be8c9275178da0966094553";
        const client = new SealClient({
            suiClient,
            serverConfigs: serverObjectIds.map((id) => ({
                objectId: id,
                weight: 1,
            })),
            verifyKeyServers: false,
        });

        const walrusClient = new WalrusClient({
            network: 'testnet',
            suiClient,
        });

        const access_control = async(): Promise<boolean> => {
            try {
        //         if(!account){
        //           return false;
        //         }
        // const encryptedBytes_from_wal = await walrusClient.readBlob({blobId: "0b813QU56CXsXgDO8p1G4FGpINkKhmviLHv6XNNM_dI"});
        // const encryptedObjects = encryptedBytes_from_wal;
        // console.log(encryptedBytes_from_wal)
        // const packageId = "0x1d8dd04dd5f072d505c0bbb64180b65f402ffc932241af76528a6b6f39fb1035"
        // console.log("Creating session key...");
        // const sessionKey = await SessionKey.create({
        //     address: account?.address,
        //     packageId: packageId,
        //     ttlMin: 10, // TTL of 10 minutes
        //     suiClient: new SuiClient({ url: getFullnodeUrl('testnet') }),
        // });
        // console.log("Signing session key...");
        // const message = sessionKey.getPersonalMessage();
        // console.log("Message created...");
        // signPersonalMessage(
				// 				{
				// 					message,
				// 				},
				// 				{
				// 					onSuccess: (result) => setSignature(result.signature),
				// 				},
				// 			); // User confirms in wallet
        // console.log("Signature created...");
        // sessionKey.setPersonalMessageSignature(signature); // Initialization complete
        // console.log("Session key created...");
        // // Create the Transaction for evaluating the seal_approve function.
        // console.log("Creating transaction...");
            
        // const settingObjectId =  "0x5fbdd9b580dfc46cc9c6790beca4ee11c9f39c80d67694f249105b7c593a7c4b"
        // const tx = new Transaction();
        // const str = fromHex("0x18959ea37ee943aae83b0a40662d3b94cb4b78070be8c9275178da0966094553");
        // console.log(str)
        // tx.moveCall({
        //     target: `${packageId}::CleanWater::seal_approve`,
        //     arguments: [tx.pure.vector("u8", str), tx.object(settingObjectId)],
        // })
        // const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });
        // console.log("Decrypting data...");
        // const decryptedBytes = await withTimeout(
        // client.decrypt({ data: encryptedObjects, sessionKey, txBytes }),
        //     30000,
        //     'Seal decrypt'
        // );
        // console.log("Decrypted data:", decryptedBytes);
        return true
    } catch (error) {
        console.log("Error occured")
        console.log("Error:", error);
        console.log(error);
        return false
    }
}

// function hexToBytes(hex: string): Uint8Array {
//   const h = hex.startsWith("0x") ? hex.slice(2) : hex;
//   if (h.length % 2 !== 0) throw new Error("Invalid hex");
//   const bytes = new Uint8Array(h.length / 2);
//   for (let i = 0; i < h.length; i += 2) {
//     bytes[i / 2] = parseInt(h.slice(i, i + 2), 16);
//   }
//   return bytes;
// }

// function withTimeout(p, ms, label) {
//   return new Promise((res, rej) => {
//     const t = setTimeout(() => rej(new Error(`${label} timed out after ${ms}ms`)), ms);
//     p.then(v => { clearTimeout(t); res(v); }, e => { clearTimeout(t); rej(e); });
//   });
// }

// ⚡ Fonction pour récupérer les OwnerCaps (démo)
async function fetchOwnerCapsFor(address?: string): Promise<string[]> {
  // Remplace par un vrai fetch on-chain si besoin
  return address ? ["0xDemoVault1", "0xDemoVault2"] : [];
}

  const router = useRouter();
  const address = account?.address;

  const [vaults, setVaults] = useState<Vault[]>([]);
  const [caps, setCaps] = useState<string[]>([]);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const [v, owned] = await Promise.all([
        fetchVaultsOnChain(),
        fetchOwnerCapsFor(address),
      ]);
      setVaults(v);
      setCaps(owned);
    })();
  }, [address]);

  const canAccess = useMemo(() => new Set(caps), [caps]);

  async function openVault(v: Vault) {

    let access_allowed = await access_control();
    if (access_allowed){
      router.push(`/vault/${v.id}`)
    } 
    else router.push(`/access-denied?vid=${encodeURIComponent(v.id)}`);
  }

  return (
    <div className="relative">
      <BackgroundVideo />
      <main className="relative z-0 mx-auto max-w-6xl px-4 py-12 text-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Vault Access
          </h1>
          <span className="rounded-full bg-amber-400/20 text-amber-200 px-3 py-1 text-xs border border-amber-300/30">
            DEMO — on-chain vaults
          </span>
        </div>
        <p className="mt-3 text-lg text-slate-200/90">
          Click a vault to view its full dataset. Access requires an{" "}
          <strong>OwnerCap</strong>.
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
                locked={!canAccess.has(v.id)}
                onClick={() => openVault(v)}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
