import Link from "next/link";
import { ShieldCheck, Wallet, Cpu, Database, KeyRound } from "lucide-react";

export default function AccessPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 md:pt-16 pb-24 text-slate-100">
      {/* Title */}
      <header className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Access</h1>
        <p className="text-lg md:text-xl text-slate-200/90">
          Get publisher access, register your device, and start contributing to AquaPulse.
        </p>
      </header>

      {/* Steps */}
      <section className="mt-10 grid gap-4">
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex items-start gap-4">
          <Wallet className="h-6 w-6 text-sky-300 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">1) Connect your wallet</h3>
            <p className="text-slate-300 mt-1">
              Use the <span className="font-semibold">Connect</span> button in the top bar to link your Sui wallet.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 text-sky-300 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">2) Request publisher access</h3>
            <p className="text-slate-300 mt-1">
              Publisher role lets you submit verified readings and join challenges.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                className="cursor-not-allowed rounded-xl px-4 py-2 bg-white/10 text-slate-400"
                title="Coming soon"
                disabled
              >
                Request access (soon)
              </button>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex items-start gap-4">
          <Cpu className="h-6 w-6 text-sky-300 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">3) Register your device</h3>
            <p className="text-slate-300 mt-1">
              Set up the $5 kit and link it to your wallet.
            </p>
            <div className="mt-3">
              <Link
                href="/host"
                className="rounded-xl px-4 py-2 bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
              >
                View setup guide
              </Link>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex items-start gap-4">
          <Database className="h-6 w-6 text-sky-300 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">4) Publish a test reading</h3>
            <p className="text-slate-300 mt-1">
              Submit pH, conductivity, turbidity, and temperature from your location.
            </p>
            <div className="mt-3">
              <Link
                href="/data"
                className="rounded-xl px-4 py-2 border border-sky-300/40 hover:bg-white/5 transition"
              >
                Go to Publish
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* API (light touch) */}
      <section className="mt-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex items-start gap-4">
          <KeyRound className="h-6 w-6 text-sky-300 mt-1" />
          <div>
            <h3 className="text-xl font-semibold">API Access</h3>
            <p className="text-slate-300 mt-1">
              Read public data and integrate AquaPulse into your apps. Endpoints will be published soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
