"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/waves.jpg)" }}
          aria-hidden="true"
        />
        <video
          className="w-full h-full object-cover opacity-65"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/waves.jpg"
        >
          {/* garde mp4 seul si tu veux */}
          <source src="/media/waves.webm" type="video/webm" />
          <source src="/media/waves.mp4"  type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#07182b]/40 via-[#07182b]/45 to-[#07182b]/70" />
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Monitor water quality, <span className="text-sky-400">together.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-200/90">
          An open, low-cost sensor network for rivers—deploy, collect, and share trusted data.
        </p>

        {/* CTAs (plus de bouton Connect ici) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/data"
            className="rounded-full px-5 py-3 bg-sky-400 text-slate-900 font-medium hover:bg-sky-300 transition"
          >
            Launch App
          </Link>
          <Link
            href="/rewards"
            className="rounded-full px-5 py-3 border border-sky-300/40 text-slate-100 hover:bg-white/5 transition"
          >
            Explore Challenges
          </Link>
        </div>

        <section className="pt-10">
          <h2 className="text-2xl md:text-3xl font-bold">Why it matters</h2>
          <ul className="mt-4 space-y-3 text-slate-200/90">
            <li>• Open-source hardware, easy to install</li>
            <li>• Real-time, auditable data</li>
            <li>• Rewards for meaningful contributions</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
