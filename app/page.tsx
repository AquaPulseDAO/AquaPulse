"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Gift, Database, Shield } from "lucide-react";

export default function Home() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-[#07182b] via-[#0c2442] to-[#07182b] text-slate-100 relative">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[rgba(8,22,43,0.72)] border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-100">
            <Droplets className="h-6 w-6 text-sky-400" />
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
=======
    <div className="min-h-screen bg-gradient-to-b from-[var(--rp-navy-1)] via-[var(--rp-navy-2)] to-[var(--rp-navy-1)] text-slate-100 relative">
>>>>>>> f03650e6d4b503adc8e731ae82142b098d4ca658

      {/* HERO avec vidéo de fond */}
      <main className="relative">
        {/* Fond vidéo plein écran de la zone hero */}
        <div className="absolute inset-0 -z-10 overflow-hidden rp-fade-in">
          {/* Poster image visible pendant le chargement */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/media/waves-neo.jpg)" }}
            aria-hidden="true"
          />
          <video
            className="w-full h-full object-cover opacity-70 rp-motion-reduce-hide"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/waves-neo.jpg"
          >
            <source src="/media/waves-neo.webm" type="video/webm" />
            <source src="/media/waves-neo.mp4" type="video/mp4" />
          </video>

          {/* Overlay pour lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07182b]/50 via-[#07182b]/55 to-[#07182b]/85" />
        </div>

        {/* Contenu hero */}
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Open Water Quality,<br />
                <span className="text-sky-400">Community Powered.</span>
              </h1>
              <p className="mt-5 text-slate-200/90 text-lg max-w-xl">
                RiverPulse is a minimal, open network of water-quality readings secured by
                <span className="font-semibold"> Sui</span>. Ultra-low-cost sensors (~$5) let anyone
                publish pH, conductivity, turbidity and temperature on-chain.
              </p>

              {/* Boutons vers les autres pages */}
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <Button asChild size="lg" className="w-full bg-sky-400 hover:bg-sky-300 text-slate-900">
                  <Link href="/data" className="flex items-center justify-center gap-2">
                    <Database className="h-4 w-4" /> Explore Data <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full border-sky-300/30">
                  <Link href="/access" className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" /> Publisher Access
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full border-sky-300/30">
                  <Link href="/kit" className="flex items-center justify-center gap-2">
                    <Cpu className="h-4 w-4" /> $5 Hardware Kit
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full border-sky-300/30">
                  <Link href="/rewards" className="flex items-center justify-center gap-2">
                    <Gift className="h-4 w-4" /> Rewards
                  </Link>
                </Button>
              </div>

              <p className="mt-4 text-sm text-slate-200/80">
                Sample contract: <span className="font-mono">0xABC…1234</span>
              </p>
            </div>

            {/* Image device (optionnel, tu peux la retirer si tu veux la vidéo full-bleed) */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900/40 shadow-xl backdrop-blur-sm">
                <Image
                  src="/riverpulse-device.png"
                  alt="Ultra low-cost open source water sensor"
                  width={1120}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <p className="mt-3 text-sm text-slate-200/90">
                Ultra Low-Cost • Open-source • Solar/Battery capable • Optional LoRa
              </p>
            </div>
          </div>
        </div>
      </main>

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
