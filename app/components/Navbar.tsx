"use client";

import Link from "next/link";
import { ConnectButton } from "@mysten/dapp-kit";
import { Droplets } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[rgba(8,22,43,0.72)] border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-100">
          <Droplets className="h-6 w-6 text-[var(--rp-blue-1)]" />
          <span>RiverPulse • Sui</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/data" className="hover:text-white">Data</Link>
          <Link href="/access" className="hover:text-white">Access</Link>
          <Link href="/host" className="hover:text-white">Host</Link>
        </nav>

        <div className="inline-flex">
          <ConnectButton connectText="Connect" />
        </div>
      </div>
    </header>
  );
}
