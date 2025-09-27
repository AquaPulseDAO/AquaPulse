import Link from "next/link";
import BackgroundVideo from "../components/BackgroundVideo";

export default function History() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Video */}
      <BackgroundVideo />

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-6 pt-12 md:pt-16 pb-24 space-y-10">
        {/* Back */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="underline decoration-white underline-offset-4 hover:text-slate-300 transition"
          >
            ← Back to home
          </Link>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15]">
          <span role="img" aria-label="water crisis">💧</span>{" "}
          Water that kills: a silent global crisis
        </h1>

        {/* One-liner */}
        <div className="rounded-2xl border border-white/20 bg-white/20 p-6 backdrop-blur-sm">
          <p className="text-xl md:text-2xl font-semibold">
            Every year, unsafe water kills more people than all wars combined.
          </p>
        </div>

        {/* Key numbers */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Key numbers</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/20 p-5">
              <div className="text-3xl md:text-4xl font-bold mb-1">3.4M</div>
              <p className="text-slate-200/90">Deaths from unsafe water each year</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/20 p-5">
              <div className="text-3xl md:text-4xl font-bold mb-1">2.2M</div>
              <p className="text-slate-200/90">Diarrheal disease deaths (water-related)</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/20 p-5">
              <div className="text-3xl md:text-4xl font-bold mb-1">1.8M</div>
              <p className="text-slate-200/90">Children under 5 lost to diarrhea</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/20 p-5">
              <div className="text-3xl md:text-4xl font-bold mb-1">785M</div>
              <p className="text-slate-200/90">People without basic drinking water</p>
            </div>
          </div>
        </section>

        {/* Water-borne diseases */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Water-borne diseases</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-white/10 bg-white/20 p-5">
              <h3 className="text-lg font-bold mb-1">Cholera</h3>
              <p className="text-slate-200/90">Acute diarrhea; can be fatal within hours without treatment.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/20 p-5">
              <h3 className="text-lg font-bold mb-1">Typhoid</h3>
              <p className="text-slate-200/90">Bacterial infection from fecally contaminated water.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/20 p-5">
              <h3 className="text-lg font-bold mb-1">Schistosomiasis</h3>
              <p className="text-slate-200/90">Parasitic disease from contact with contaminated freshwater.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/20 p-5">
              <h3 className="text-lg font-bold mb-1">Hepatitis A</h3>
              <p className="text-slate-200/90">Viral liver disease; often spread via unsafe water/food.</p>
            </li>
          </ul>
        </section>

        {/* Global impact */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Global impact</h2>
          <ul className="space-y-2 text-slate-200/90">
            <li>• Sub-Saharan Africa, South Asia, and parts of Latin America face the highest burden.</li>
            <li>• Climate change intensifies water stress and contamination risks worldwide.</li>
          </ul>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/20 p-6 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-sky-300 mb-3">Our mission</h2>
            <p className="text-slate-200/90 mb-4">
              We’re building a decentralized, open network to monitor water quality and protect communities.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/data"
                className="rounded-full px-5 py-3 bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
              >
                See our solution
              </Link>
              <Link
                href="/"
                className="rounded-full px-5 py-3 border border-sky-300/40 text-slate-100 hover:bg-white/5 transition"
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
