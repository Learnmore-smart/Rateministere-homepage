import { Github, Instagram, Mail, Youtube } from "lucide-react";

type P = { size?: number; className?: string };

export function XIcon({ size = 12, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export function BilibiliIcon({ size = 12, className }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m7.5 4.5-3-2.6M16.5 4.5l3-2.6" />
      <rect x="2.5" y="5" width="19" height="14.5" rx="3.5" />
      <path d="M9 10.5v3M15 10.5v3" />
    </svg>
  );
}

export function RedNoteIcon({ size = 12, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <g stroke="var(--s-bg, #0a0a0c)" strokeWidth="1.8" strokeLinecap="round">
        <path d="M7.5 8.5h9M7.5 12h9M7.5 15.5h5.5" />
      </g>
    </svg>
  );
}

const MAP = {
  x: XIcon,
  github: Github,
  youtube: Youtube,
  instagram: Instagram,
  bilibili: BilibiliIcon,
  rednote: RedNoteIcon,
  mail: Mail,
} as const;

export type BrandName = keyof typeof MAP;

export default function BrandIcon({ name, size = 12, className }: P & { name: BrandName }) {
  const C = MAP[name];
  return <C size={size} className={className} />;
}
