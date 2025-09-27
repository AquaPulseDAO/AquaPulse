"use client";

import Link from "next/link";
import BackgroundVideo from "../components/BackgroundVideo";

export default function History() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Video */}
      <BackgroundVideo />
      
      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-6 pt-12 md:pt-16 pb-24 space-y-10">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/" 
            className="text-white hover:text-gray-300 transition underline decoration-white underline-offset-4"
          >
            ← Back to home
          </Link>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold leading-[1.15]">
          <span role="img" aria-label="water crisis">💧</span>{" "}
          "Water that kills: a silent global crisis"
        </h1>

        {/* Introduction */}
        <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
          <p className="text-xl md:text-2xl text-white font-semibold">
            Every year, unsafe water kills more people than all wars combined.
          </p>
        </div>

        {/* Statistics */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Shocking numbers</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white mb-2">3.4 million</div>
              <p className="text-slate-200">People die each year from unsafe water</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white mb-2">2.2 million</div>
              <p className="text-slate-200">Deaths caused by diarrheal diseases from contaminated water</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white mb-2">1.8 million</div>
              <p className="text-slate-200">Children under 5 die each year from diarrhea</p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-white mb-2">785 million</div>
              <p className="text-slate-200">People lack access to basic drinking water</p>
            </div>
          </div>
        </section>

        {/* Diseases Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Water-borne diseases</h2>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">💧 Cholera</h3>
              <p className="text-slate-200/90">
                An acute diarrheal disease that can kill within hours if left untreated. 
                Caused by ingestion of water or food contaminated with Vibrio cholerae bacteria.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">🦠 Typhoid</h3>
              <p className="text-slate-200/90">
                Bacterial infection transmitted through water contaminated with feces. 
                Causes fever, headaches and severe digestive disorders.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">🐛 Schistosomiasis</h3>
              <p className="text-slate-200/90">
                Parasitic disease transmitted through contact with contaminated fresh water. 
                Affects more than 200 million people worldwide.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3">🦠 Hepatitis A</h3>
              <p className="text-slate-200/90">
                Liver disease caused by a virus transmitted primarily through contaminated water and food. 
                Can cause fatal liver failure.
              </p>
            </div>
          </div>
        </section>

        {/* Global Impact */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Global impact</h2>
          
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <ul className="space-y-3 text-slate-200/90">
              <li>• <span className="font-semibold text-white">Sub-Saharan Africa:</span> 40% of the population lacks access to safe water</li>
              <li>• <span className="font-semibold text-white">South Asia:</span> More than 600 million people live without basic sanitation</li>
              <li>• <span className="font-semibold text-white">Latin America:</span> 100 million people lack access to safe water</li>
              <li>• <span className="font-semibold text-white">Climate crisis:</span> Aggravates water problems worldwide</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">💡 Our mission</h2>
            <p className="text-slate-200/90 mb-4">
              Facing this silent crisis, our decentralized water quality monitoring technology 
              offers an innovative solution to protect communities and save lives.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/data"
                className="rounded-full px-5 py-3 bg-white text-black font-medium hover:bg-gray-200 transition"
              >
                See our solution
              </Link>
              <Link
                href="/"
                className="rounded-full px-5 py-3 border border-white/40 text-white hover:bg-white/5 transition"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
