"use client";

import Link from "next/link";
import { ConnectButton } from "@mysten/dapp-kit";
import { Droplets } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[rgba(8,22,43,0.72)] border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Droplets className="h-9 w-9 text-sky-400" />
          <span className="text-2xl font-semibold tracking-wide">AquaPulse • Sui</span>
        </Link>

        <nav className="hidden md:flex items-center gap-16 text-xl">
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
