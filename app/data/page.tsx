"use client";

import { useRef, useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function PublishDataPage() {
  const account = useCurrentAccount();

  const [title, setTitle] = useState("");
  const [ph, setPh] = useState("");
  const [ec, setEc] = useState("");     // conductivity (µS/cm)
  const [ntu, setNtu] = useState("");   // turbidity (NTU)
  const [temp, setTemp] = useState(""); // temperature (°C)
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [desc, setDesc] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFile(f ?? null);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  function getLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(String(pos.coords.latitude.toFixed(6)));
        setLon(String(pos.coords.longitude.toFixed(6)));
      },
      (err) => alert(`Location error: ${err.message}`),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!account) return alert("Connect your wallet in the top bar first.");

    setBusy(true);
    try {
      // TODO: Replace with your Move call using @mysten/sui
      // Package fields: { title, ph, ec, ntu, temp, lat, lon, desc, file? }
      await new Promise((r) => setTimeout(r, 800)); // simulate
      setOk(true);
      setTimeout(() => setOk(false), 1600);

      // Reset
      setTitle(""); setPh(""); setEc(""); setNtu(""); setTemp("");
      setLat(""); setLon(""); setDesc(""); setFile(null); setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } finally {
      setBusy(false);
    }
  }

  const isDisabled =
    busy ||
    !account ||
    !title.trim() ||
    !lat.trim() ||
    !lon.trim() ||
    (!ph.trim() && !ec.trim() && !ntu.trim() && !temp.trim());

  return (
    <div className="relative">
      {/* Vidéo uniquement pour /data */}
      <BackgroundVideo />

      <div className="relative z-0 mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold">Publish data</h1>
        <p className="mt-2 text-slate-300">
          Share a new water-quality reading on Sui. Connect your wallet in the top bar to publish.
        </p>

        <form
          onSubmit={onSubmit}
          className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg"
        >
          {/* Success toast */}
          {ok && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-emerald-400/90 px-6 py-3 text-slate-900 font-semibold shadow-lg">
              Upload success!!
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
            {/* Colonne gauche: image + description */}
            <div>
              <label className="block text-sm font-semibold">Photo (optional)</label>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  {preview ? (
                    // Utiliser <img> pour supporter blob: URLs sans config Next/Image
                    <img src={preview} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-slate-400">
                      No image
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={onPick}
                  className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-sky-400 file:px-4 file:py-2 file:font-semibold file:text-slate-900 hover:file:bg-sky-300"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold">Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  placeholder="Short note about location, weather, calibration…"
                  className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                />
              </div>
            </div>

            {/* Colonne droite: champs */}
            <div>
              <label className="block text-sm font-semibold">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., pH at Pont Neuf"
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                required
              />

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold">pH</label>
                  <input
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    placeholder="e.g., 7.2"
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold">Conductivity (µS/cm)</label>
                  <input
                    value={ec}
                    onChange={(e) => setEc(e.target.value)}
                    placeholder="e.g., 580"
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold">Turbidity (NTU)</label>
                  <input
                    value={ntu}
                    onChange={(e) => setNtu(e.target.value)}
                    placeholder="e.g., 2.3"
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold">Temperature (°C)</label>
                  <input
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    placeholder="e.g., 18.4"
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold">Latitude</label>
                    <button
                      type="button"
                      onClick={getLocation}
                      className="text-xs rounded-full px-2 py-1 bg-white/10 hover:bg-white/20 transition"
                      title="Use device GPS"
                    >
                      Get GPS
                    </button>
                  </div>
                  <input
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="48.8566"
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold">Longitude</label>
                  <input
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="2.3522"
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/50"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`rounded-xl px-6 py-2.5 font-semibold transition
                    ${isDisabled
                      ? "bg-white/10 text-slate-400 cursor-not-allowed"
                      : "bg-sky-400 text-slate-900 hover:bg-sky-300"}`}
                  title={!account ? "Connect your wallet in the top bar" : undefined}
                >
                  {busy ? "Publishing…" : "Publish to Sui"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
