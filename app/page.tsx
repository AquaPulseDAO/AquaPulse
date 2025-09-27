"use client";

import Link from "next/link";
import BackgroundVideo from "./components/BackgroundVideo";

export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Video */}
      <BackgroundVideo />
      
      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-6 pt-12 md:pt-16 pb-24 space-y-10">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold leading-[1.15]">
          <span role="img" aria-label="droplet"></span>{" "}
          A decentralized network for water quality monitoring
        </h1>

        {/* Subhead */}
        <p className="text-xl md:text-2xl text-slate-200/90">
          “Combining data, the Sui protocol, and sustainability to protect our water resources.”
        </p>

        {/* Get started (big button) */}
        <div className="mt-6">
          <Link
            href="/history"
            className="inline-block bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold text-lg md:text-xl px-8 py-4 rounded-2xl shadow-lg transition"
          >
            The problem we solve
          </Link>
        </div>

        {/* Our Solution */}
        <section className="pt-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Our Solution</h2>
          <ul className="space-y-3 text-slate-200/90">
            <li>• An open-source, ultra low-cost device, combined with a decentralized network.</li>
            <li>• <span className="font-semibold">Solar-powered device</span></li>
            <li>• <span className="font-semibold">Gamification:</span> challenges, NFT badges, XP scoring</li>
            <li>• <span className="font-semibold">Participatory science:</span> engaging local communities in data collection and education</li>
          </ul>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur-sm">
            <p className="text-sky-300 text-base md:text-lg">
              “We are launching the first challenges soon. Follow us to stay updated!”
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
