import BackgroundVideo from "../components/BackgroundVideo";

export default function Device() {
  const features = [
    { icon: "☀️", title: "Solar-powered LoRa device", description: "Autonomous, low-cost communication." },
    { icon: "📊", title: "TDS, pH, Dissolved Oxygen", description: "Essential water quality indicators." },
    { icon: "🔋", title: "Battery included", description: "Continuous data collection, day & night." },
    { icon: "🌍", title: "Open-source design", description: "Accessible, replicable, community-driven." },
  ];

  const impact = [
    { icon: "👥", title: "For citizens", description: "Participatory science." },
    { icon: "🏢", title: "For companies", description: "Transparent reporting." },
    { icon: "🌱", title: "For environment", description: "Cleaner water, sustainable agriculture = lives saved." },
  ];

  return (
    <div className="relative">
      {/* Vidéo de fond uniquement pour /device */}
      <BackgroundVideo />

      <main className="relative z-0 mx-auto max-w-6xl px-4 py-20 space-y-24 text-slate-100">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Our Device: Ultra Low-Cost, Open-Source, Sustainable
          </h1>
          <p className="mt-4 text-slate-200/90 text-lg md:text-xl">
            A solar-powered LoRa sensor for real-time water quality monitoring.
          </p>
        </section>

        <hr className="border-white/10" />

        {/* Core Features */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center">Core Features ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg transition hover:bg-white/10"
              >
                <div className="text-4xl text-center">{f.icon}</div>
                <h3 className="mt-4 font-bold text-lg text-center">{f.title}</h3>
                <p className="mt-2 text-slate-200/90 text-center">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/10" />

        {/* Secured Device */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">A Secured Device 🔒</h2>
          <p className="text-center text-slate-200/90 mb-8">
            Data are verified before being sent on the blockchain.
          </p>
          <div className="flex flex-col md:flex-row justify-around items-center gap-6 md:gap-8 text-center">
            <div className="w-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg">
              <h3 className="font-bold text-xl">💧 Device measures water data</h3>
            </div>
            <div className="w-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg">
              <h3 className="font-bold text-xl">📡 Sends via LoRa → Gateway → Sui blockchain</h3>
            </div>
            <div className="w-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg">
              <h3 className="font-bold text-xl">📊 Data stored, analyzed & gamified</h3>
            </div>
          </div>
        </section>

        <hr className="border-white/10" />

        {/* Impact */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center">Impact 🌍</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impact.map((i, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg text-center"
              >
                <div className="text-4xl">{i.icon}</div>
                <h3 className="mt-4 font-bold text-lg">{i.title}</h3>
                <p className="mt-2 text-slate-200/90">{i.description}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/10" />

        {/* Call-to-Action */}
        <section className="text-center">
          <button className="rounded-xl bg-sky-400 text-slate-900 px-6 py-3 font-semibold hover:bg-sky-300 transition text-lg">
            See Our Challenges 🚀
          </button>
          <p className="mt-4 text-slate-200/90">
            Or join as a contributor to help improve water quality monitoring 💧🌱
          </p>
        </section>
      </main>
    </div>
  );
}
