"use client";

type P = { data: { x: number; y: number }[]; height?: number };

export default function LineChart({ data, height = 180 }: P) {
  if (!data || data.length === 0) {
    return <div className="h-[180px] grid place-items-center text-slate-300">No data</div>;
  }

  const w = 600;
  const h = height;

  const xs = data.map(d => d.x);
  const ys = data.map(d => d.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;

  const path = data
    .map((d, i) => {
      const x = ((d.x - minX) / spanX) * w;
      const y = h - ((d.y - minY) / spanY) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-300" />
    </svg>
  );
}
