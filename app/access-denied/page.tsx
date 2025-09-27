import BackgroundVideo from "../components/BackgroundVideo";

export default function AccessDenied() {
  return (
    <div className="relative min-h-screen">
      {/* Background video */}
      <BackgroundVideo />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-slate-100">
        <h1 className="text-3xl md:text-4xl font-extrabold">Access denied</h1>
        <p className="mt-3 text-slate-300">
          Your connected wallet does not hold the required <strong>OwnerCap</strong> for this vault.
        </p>
        <p className="mt-2 text-slate-300">
          Ask the vault owner to grant access, or connect a different wallet.
        </p>
      </div>
    </div>
  );
}
