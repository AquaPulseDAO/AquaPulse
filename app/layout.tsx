import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

export const metadata = { title: "RiverPulse • Sui" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
