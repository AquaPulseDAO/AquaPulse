"use client";

type SparkProps = {
  data: number[];
  width?: number;
  height?: number;
};

export default function Spark({ data, width = 400, height = 56 }: SparkProps) {
  if (!data || data.length === 0) {
    return <div className="w-full h-full grid place-items-center text-slate-300">No data</div>;
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = width / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / span) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <polyline fill="none" stroke="currentColor" className="text-sky-300" strokeWidth="2" points={points} />
    </svg>
  );
}
