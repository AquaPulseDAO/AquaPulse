import "./globals.css";
import Providers from "./providers";
import TopBar from "./components/TopBar";

export const metadata = { title: "AquaPulse • Sui" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-b from-[#07182b] via-[#0c2442] to-[#07182b] text-slate-100 antialiased">
        <Providers>
          <TopBar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
