"use client";

import Spark from "./charts/Spark";

type Props = {
  title: string;
  subtitle?: string;
  preview?: string;
  locked?: boolean;
  onClick?: () => void;
};

export default function VaultCard({ title, subtitle, preview , locked, onClick }: Props) {
  
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-5 backdrop-blur-sm shadow-lg transition w-full
        ${locked ? "border-white/10 bg-white/5" : "border-sky-400/40 bg-white/10 hover:bg-white/15"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {subtitle && <p className="text-slate-300 text-sm mt-1">{subtitle}</p>}
        </div>
        
      </div>

      <div className="mt-4 h-16 rounded-xl border border-white/10 bg-white/5 p-2">
        <Spark data={preview ? JSON.parse(preview) : []} />
      </div>

      <div className="mt-4 text-sm text-slate-300">
        {locked ? "You need an OwnerCap to open this vault." : "Click to open vault."}
      </div>
    </button>
  );
}
