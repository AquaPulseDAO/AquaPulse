import "./globals.css";
import Providers from "./providers";
<<<<<<< HEAD
import TopBar from "./components/TopBar";
=======
import Navbar from "@/components/Navbar";
>>>>>>> f03650e6d4b503adc8e731ae82142b098d4ca658

export const metadata = { title: "RiverPulse • Sui" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
<<<<<<< HEAD
      <body className="min-h-screen bg-gradient-to-b from-[#07182b] via-[#0c2442] to-[#07182b] text-slate-100 antialiased">
        <Providers>
          <TopBar />
          <main>{children}</main>
=======
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Providers>
          <Navbar />
          {children}
>>>>>>> f03650e6d4b503adc8e731ae82142b098d4ca658
        </Providers>
      </body>
    </html>
  );
}
