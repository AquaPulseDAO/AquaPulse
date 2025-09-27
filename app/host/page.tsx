"use client";
import { useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";

export default function HostPage() {
  const [title, setTitle] = useState("");
  const [coins, setCoins] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleStart = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Video */}
      <BackgroundVideo />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-20 space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 drop-shadow-lg">
          Host a Sensor
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
              <label className="block text-sm font-semibold mb-1">Coins to invest</label>
              <input
                type="number"
                value={coins}
                onChange={(e) => setCoins(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                className="w-full rounded-xl border border-white/10 bg-white/10 p-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Max people</label>
              <input
                type="number"
                value={maxPeople}
                onChange={(e) => setMaxPeople(Math.max(0, Number(e.target.value)))}
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
