"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Bounty = {
  id: string;
  title: string;
  left: number;
  reward: number; // SUI
  img: string;
};

const SAMPLE: Bounty[] = [
  { id: "ph",    title: "pH spot checks",           left: 42, reward: 0.2, img: "/riverpulse-device.png" },
  { id: "turb",  title: "Turbidity after rainfall", left: 17, reward: 0.3, img: "/riverpulse-device.png" },
  { id: "temp",  title: "River temperature @ noon", left: 29, reward: 0.15, img: "/riverpulse-device.png" },
];

export default function DataIndex() {
  const [items] = useState(SAMPLE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Data bounties</h1>
          <p className="mt-2 text-slate-300">
            Contribute fresh measurements and claim small SUI rewards.
          </p>
        </div>
        <Link
          href="/data/upload"
          className="rounded-xl px-4 py-2 bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
        >
          Upload a reading
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => (
          <article
            key={b.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <span className="text-xs md:text-sm rounded-full bg-white/10 px-2 py-1">
                {b.left} left
              </span>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative w-full aspect-video">
                <Image src={b.img} alt={b.title} fill className="object-cover" />
              </div>
            </div>

            <button
              onClick={() => alert("Connect wallet to claim. (Wire to Sui later)")}
              className="mt-4 w-full rounded-xl px-4 py-2 bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
            >
              Claim {b.reward} SUI
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
