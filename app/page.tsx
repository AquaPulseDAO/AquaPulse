"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Gift, Database, Shield } from "lucide-react";

/** Petite bande de vagues animées en haut/bas */
function Waves({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        flip ? "-bottom-20 rotate-180" : "-top-20"
      }`}
    >
      <div className="relative h-24 sm:h-28 overflow-hidden">
        {/* Couche 1 */}
        <div
          className="absolute inset-0 flex w-[200%]"
          style={{ animation: "waveSlideA 18s linear infinite" }}
        >
          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="w-[100%] h-full"
          >
            <defs>
              <linearGradient id="gradA" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--rp-blue-1)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--rp-blue-1)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 C 200,120 400,40 600,80 C 800,120 1000,40 1200,80 C 1300,100 1400,90 1440,85 L1440,150 L0,150 Z"
              fill="url(#gradA)"
            />
          </svg>
          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="w-[100%] h-full"
          >
            <use href="#waveA" />
          </svg>
        </div>

        {/* Couche 2 (plus douce) */}
        <div
          className="absolute inset-0 flex w-[200%] opacity-70"
          style={{ animation: "waveSlideB 28s linear infinite" }}
        >
          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="w-[100%] h-full"
          >
            <defs>
              <linearGradient id="gradB" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--rp-blue-2)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--rp-blue-2)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,75 C 180,110 360,55 540,75 C 720,100 930,55 1140,78 C 1290,95 1395,85 1440,82 L1440,150 L0,150 Z"
              fill="url(#gradB)"
            />
          </svg>
          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="w-[100%] h-full"
          >
            <use href="#waveB" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--rp-navy-1)] via-[var(--rp-navy-2)] to-[var(--rp-navy-1)] text-slate-100 relative">

      {/* Vagues en haut */}
      <Waves />

      {/* Hero */}
      <main className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Open Water Quality,<br />
              <span className="text-[var(--rp-blue-1)]">Community Powered.</span>
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-xl">
              RiverPulse is a minimal, open network of water-quality readings secured by
              <span className="font-semibold"> Sui</span>. Ultra-low-cost sensors (~$5) let anyone
              publish pH, conductivity, turbidity and temperature on-chain.
            </p>

            {/* Boutons vers les autres pages */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <Button asChild size="lg" className="w-full bg-[var(--rp-blue-1)] hover:bg-sky-400 text-slate-900">
                <Link href="/data" className="flex items-center justify-center gap-2">
                  <Database className="h-4 w-4" /> Explore Data <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full border-sky-400/30">
                <Link href="/access" className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4" /> Publisher Access
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full border-sky-400/30">
                <Link href="/kit" className="flex items-center justify-center gap-2">
                  <Cpu className="h-4 w-4" /> $5 Hardware Kit
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full border-sky-400/30">
                <Link href="/rewards" className="flex items-center justify-center gap-2">
                  <Gift className="h-4 w-4" /> Rewards
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Sample contract: <span className="font-mono">0xABC…1234</span>
            </p>
          </div>

          {/* Image du device */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl">
              <Image
                src="/riverpulse-device.png"
                alt="Ultra low-cost open source water sensor"
                width={1120}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Ultra Low-Cost • Open-source • Solar/Battery capable • Optional LoRa
            </p>
          </div>
        </div>
      </main>

      {/* Vagues en bas */}
      <Waves flip />
      
      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-300 flex items-center justify-between">
          <p>© {new Date().getFullYear()} RiverPulse on Sui</p>
          <div className="flex items-center gap-4">
            <Link href="/host" className="hover:text-white">Host</Link>
            <Link href="/kit" className="hover:text-white">$5 Kit</Link>
            <Link href="/rewards" className="hover:text-white">Rewards</Link>
            <Link href="/data" className="hover:text-white">Data</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
