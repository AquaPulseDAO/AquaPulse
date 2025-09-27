export default function Device() {
  const features = [
    {
      icon: "☀️",
      title: "Solar-powered LoRa device",
      description: "Autonomous, low-cost communication.",
    },
    {
      icon: "📊",
      title: "TDS, pH, Dissolved Oxygen",
      description: "Essential water quality indicators.",
    },
    {
      icon: "🔋",
      title: "Battery included",
      description: "Continuous data collection, day & night.",
    },
    {
      icon: "🌍",
      title: "Open-source design",
      description: "Accessible, replicable, community-driven.",
    },
  ];

  const impact = [
    {
      icon: "👥",
      title: "For citizens",
      description: "Participatory science.",
    },
    {
      icon: "🏢",
      title: "For companies",
      description: "Transparent reporting.",
    },
    {
      icon: "🌱",
      title: "For environment",
      description: "Cleaner water, sustainable agriculture = lives saved.",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 space-y-32">

      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Our Device: Ultra Low-Cost, Open-Source, Sustainable
        </h1>
        <p className="mt-4 text-slate-300 text-lg md:text-xl">
          A solar-powered LoRa sensor for real-time water quality monitoring.
        </p>
      </section>

      <hr className="border-slate-700" />

      {/* Core Features */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Core Features ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition flex flex-col items-center text-center">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
              <p className="mt-2 text-slate-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-700" />

      {/* Secured Device */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">A Secured Device 🔒</h2>
        <p className="text-center text-slate-400 mb-8">
          Data are verified before being sent on the blockchain.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-8 text-center">
          <div className="border rounded-lg p-6 w-64">
            <h3 className="font-bold text-xl">💧 Device measures water data</h3>
          </div>
          <div className="border rounded-lg p-6 w-64">
            <h3 className="font-bold text-xl">📡 Sends via LoRa → Gateway → Sui blockchain</h3>
          </div>
          <div className="border rounded-lg p-6 w-64">
            <h3 className="font-bold text-xl">📊 Data stored, analyzed & gamified</h3>
          </div>
        </div>
      </section>

      <hr className="border-slate-700" />

      {/* Impact Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Impact 🌍</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impact.map((i, idx) => (
            <div key={idx} className="border rounded-lg p-6 text-center flex flex-col items-center">
              <div className="text-4xl">{i.icon}</div>
              <h3 className="mt-4 font-bold text-lg">{i.title}</h3>
              <p className="mt-2 text-slate-400">{i.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-700" />

      {/* Call-to-Action */}
      <section className="text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg">
          See Our Challenges 🚀
        </button>
        <p className="mt-4 text-slate-400">
          Or join as a contributor to help improve water quality monitoring 💧🌱
        </p>
      </section>

    </main>
  );
}