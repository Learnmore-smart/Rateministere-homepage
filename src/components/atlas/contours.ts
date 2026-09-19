// Deterministic pseudo-topographic contour generator.
// Seeded so SSR and client render identical paths (no hydration drift).

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One closed, gently-wobbling ring around (cx, cy). */
function ring(cx: number, cy: number, r: number, rng: () => number): string {
  const p1 = rng() * Math.PI * 2;
  const p2 = rng() * Math.PI * 2;
  const a1 = 0.10 + rng() * 0.10;
  const a2 = 0.05 + rng() * 0.07;
  const pts: string[] = [];
  const N = 72;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const wobble = 1 + a1 * Math.sin(3 * t + p1) + a2 * Math.sin(7 * t + p2);
    const x = cx + r * wobble * Math.cos(t);
    const y = cy + r * wobble * 0.78 * Math.sin(t);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ") + " Z";
}

/** A hill: `rings` concentric contours around a peak. */
export function hill(cx: number, cy: number, r0: number, dr: number, rings: number, seed: number): string[] {
  const rng = mulberry32(seed);
  const paths: string[] = [];
  for (let i = 0; i < rings; i++) paths.push(ring(cx, cy, r0 + i * dr, rng));
  return paths;
}

export const PEAKS = [
  { cx: 180, cy: 210, seed: 11 },
  { cx: 1150, cy: 420, seed: 47 },
  { cx: 560, cy: 980, seed: 83 },
  { cx: 980, cy: 1350, seed: 29 },
  { cx: 240, cy: 1560, seed: 61 },
];
