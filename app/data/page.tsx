"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Database, Filter, Search, Shield } from "lucide-react";
import { useState } from "react";

export default function DataPage() {
  const [stationOrObjectId, setStationOrObjectId] = useState("");
  const [metric, setMetric] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--rp-navy-1)] via-[var(--rp-navy-2)] to-[var(--rp-navy-1)] text-slate-100 relative">

      <main className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
              <Database className="h-8 w-8 text-[var(--rp-blue-1)]" />
              Explore Data
            </h1>
            <p className="mt-2 text-slate-300 max-w-2xl">
              Browse water-quality readings published to Sui. Filter by station/object ID, metric, and date.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-slate-300">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Open network, on-chain integrity</span>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Filter className="h-4 w-4 text-[var(--rp-blue-1)]" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="col-span-2">
                <Input
                  value={stationOrObjectId}
                  onChange={(e) => setStationOrObjectId(e.target.value)}
                  placeholder="Search by station name or Sui object ID (0x...)"
                  className="bg-slate-950/60 border-slate-800 placeholder:text-slate-500 text-slate-100"
                />
              </div>
              <div>
                <select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="w-full h-10 rounded-md border border-slate-800 bg-slate-950/60 px-3 text-slate-100"
                >
                  <option value="all">All metrics</option>
                  <option value="ph">pH</option>
                  <option value="conductivity">Conductivity</option>
                  <option value="turbidity">Turbidity</option>
                  <option value="temperature">Temperature</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button disabled className="bg-[var(--rp-blue-1)] text-slate-900">
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
              <Button variant="secondary" onClick={() => { setStationOrObjectId(""); setMetric("all"); }}>
                Clear
              </Button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Note: This is a placeholder UI. Hook this up to your indexer or Sui queries to return results.
            </p>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mt-8 grid gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Latest Readings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-300 text-sm">
                No data yet. Once connected, recent readings will appear here as a list or table.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-300 flex items-center justify-between">
          <p>© {new Date().getFullYear()} RiverPulse on Sui</p>
          <div className="flex items-center gap-4">
            <Link href="/host" className="hover:text-white">Host</Link>
            <Link href="/kit" className="hover:text-white">$5 Kit</Link>
            <Link href="/rewards" className="hover:text-white">Rewards</Link>
            <Link href="/data" className="hover:text-white">Data</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
