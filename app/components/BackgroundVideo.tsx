"use client";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden rp-fade-in">
      {/* Poster visible pendant le chargement */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/media/waves.jpg)" }}
        aria-hidden="true"
      />
      <video
        className="w-full h-full object-cover opacity-90 rp-motion-reduce-hide"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/waves.jpg"
      >
        <source src="/media/waves.webm" type="video/webm" />
        <source src="/media/waves.mp4" type="video/mp4" />
      </video>
      {/* Assombrissement pour la lisibilité */}
      <div className="absolute inset-0 bg-[#07182b]/40" />
    </div>
  );
}
