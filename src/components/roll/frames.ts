import {
  ARCHIVE,
  FEATURED,
  LEARNX_FILM,
  PIANO,
  SUPASTACK_FILM,
  type Project,
} from "@/lib/content";

/* The roll — every frame on the contact sheet, in page order.

   Numbers count DOWN the page. The lead product (FEATURED[0]) is
   No. 24, the last frame exposed before the one that is missing, and
   the archive runs back to No. 01.

   The whole page hangs on the roll holding exactly 24 exposed frames:
   that is what makes the redacted secret project "No. 25". Selects
   (each FEATURED product and its film, the channel, the tutorial) are
   always on the sheet; ARCHIVE fills whatever room is left, and any
   entry past the 24th drops into the "earlier rolls" list instead of
   pushing the count up. */
export const ROLL_LENGTH = 24;

export type FrameKind = "channel" | "video" | "product" | "film" | "archive";

export interface Frame {
  /** number on the roll — 24 at the top of the page, 01 at the end */
  n: number;
  /** anchor (`#f-<id>`) and asset name (`/roll/thumb/<id>.webp`) */
  id: string;
  kind: FrameKind;
  name: string;
  url: string;
  year?: string;
  /** newest additions get the red dot on the sheet */
  fresh?: boolean;
  project?: Project;
  film?: { url: string; embed: string; poster: string };
}

const FILMS: Record<string, { url: string; embed: string; poster: string; year: string }> = {
  supastack: { ...SUPASTACK_FILM, year: "2026" },
  learnx: { ...LEARNX_FILM, year: "2025" },
};

/* grease-pencil "new" dot — nothing is fresh right now; add a product
   id when something newer lands */
const FRESH = new Set<string>();

type Draft = Omit<Frame, "n">;

const work: Draft[] = FEATURED.flatMap((p): Draft[] => {
  const product: Draft = {
    id: p.id,
    kind: "product",
    name: p.name,
    url: p.url,
    year: p.year,
    fresh: FRESH.has(p.id),
    project: p,
  };
  const film = FILMS[p.id];
  if (!film) return [product];
  return [
    product,
    {
      id: `${p.id}-film`,
      kind: "film",
      name: p.name,
      url: film.url,
      year: film.year,
      film: { url: film.url, embed: film.embed, poster: film.poster },
    },
  ];
});

const piano: Draft[] = [
  { id: "piano", kind: "channel", name: PIANO.channel, url: PIANO.url },
  { id: "elise", kind: "video", name: "Für Elise", url: PIANO.url },
];

const room = Math.max(0, ROLL_LENGTH - work.length - piano.length);

const order: Draft[] = [
  ...work,
  ...piano,
  ...ARCHIVE.slice(0, room).map(
    (p): Draft => ({ id: p.id, kind: "archive", name: p.name, url: p.url, year: p.year, project: p }),
  ),
];

export const ROLL: Frame[] = order.map((f, i) => ({ ...f, n: order.length - i }));

/** archive entries that no longer fit on the sheet */
export const EARLIER: Project[] = ARCHIVE.slice(room);

/** the frame that is not on the roll */
export const SECRET_NO = ROLL.length + 1;

/* Pre-generated frame assets (public/roll). Anything without one —
   a project added to content.ts before its frame is cut — falls back
   to the project's own image. */
const THUMBS = new Set([
  "piano", "elise", "supastack", "supastack-film", "learnx", "learnx-film", "cairn",
  "spinshare", "blade", "pluto", "vorlee", "fklearn", "opennotes", "novapuraai",
  "file-guardian", "wechat", "quote-cloud", "trae-echoes", "wyt", "enforcer", "atlas",
  "panic", "rate", "msu",
]);
const PRINTS = new Set([
  "piano", "supastack", "supastack-film", "learnx", "cairn", "spinshare", "blade", "pluto",
  "vorlee", "fklearn",
]);

const fallback = (f: Frame) => f.film?.poster ?? f.project?.image ?? "/roll/thumb/piano.webp";

/** 480×252 — the contact sheet and the archive index */
export const thumbSrc = (f: Frame) => (THUMBS.has(f.id) ? `/roll/thumb/${f.id}.webp` : fallback(f));

/** up to 1400 wide — the enlargements */
export const printSrc = (f: Frame) => (PRINTS.has(f.id) ? `/roll/print/${f.id}.webp` : fallback(f));
