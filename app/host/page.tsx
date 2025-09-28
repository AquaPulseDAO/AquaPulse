"use client";
import { useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useCurrentWallet, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import STORAGE_ID from "constants"
import TESTNET_PACKAGE_ID from "constants"

export default function HostPage() {

  const [title, setTitle] = useState("");
  const [coins, setCoins] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const client = new SuiClient({ url: getFullnodeUrl('testnet') });
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const [digest, setDigest] = useState("");
  const handleStart = async() => {
    if (currentWallet){
   
      
      const tx = new Transaction();
      const numCoins = Number(coins)*(10**9);
      console.log(tx);
      const [coin] = tx.splitCoins(tx.gas, [numCoins]);
      console.log(coin)
      const packageId = '0x1d8dd04dd5f072d505c0bbb64180b65f402ffc932241af76528a6b6f39fb1035';
      const storageId = '0x7aa30758bc879c53dfb723bd6c1110d5f11a36afbf0551ff486ee34dfffefa7c';
      tx.moveCall({ 
          arguments: [tx.object(storageId), tx.pure.string(title), tx.pure.u64(numCoins), coin, tx.pure.u32(Number(maxPeople))],
          target: `${packageId}::CleanWater::create_vault`
        });

        // const suiClinet = new SuiClient({url: getFullnodeUrl("testnet")});
        // tx.setSender("0x18959ea37ee943aae83b0a40662d3b94cb4b78070be8c9275178da0966094553");
        // const respone = await tx.build({
        //   client: suiClinet
        // });
        // console.log({respone});

        // return;


        // console.log(tx);
        signAndExecuteTransaction(
          {
            transaction: tx,
            chain: 'sui:testnet',
          },
          {
            onSuccess: (result) => {
              console.log('executed transaction', result);
              setDigest(result.digest);
            },
            onError: (err) => {
              console.log(err)
            }
          },
        );
    }

  };

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Video */}
      <BackgroundVideo />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-20 space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 drop-shadow-lg">
          Host a Vault
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-sm p-6 space-y-6 shadow-lg">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full rounded-xl border border-white/10 bg-white/10 p-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400/50"
            />
          </div>

          {/* Coins & Max People */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Amount of SUI to invest</label>
              <input
                type="number"
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-white/10 bg-white/10 p-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Max people</label>
              <input
                type="number"
                value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-white/10 bg-white/10 p-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400/50"
              />
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full bg-sky-400 hover:bg-sky-300 text-slate-900 font-semibold py-3 rounded-xl transition shadow-md"
          >
            Start!!
          </button>
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-emerald-400 text-slate-900 px-6 py-3 rounded-lg shadow-lg pointer-events-auto animate-fade-in-out">
              Upload successful!
            </div>
          </div>
        )}

        {/* Animation */}
        <style jsx>{`
          @keyframes fade-in-out {
            0%, 100% { opacity: 0; transform: translateY(-10px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 2s ease-in-out forwards;
          }
        `}</style>
      </main>
    </div>
  );
}
