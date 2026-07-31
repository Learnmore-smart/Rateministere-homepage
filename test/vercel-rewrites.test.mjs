import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const vercelConfig = JSON.parse(
  readFileSync(join(__dirname, "..", "vercel.json"), "utf8"),
);

function findRewrite(source) {
  return vercelConfig.rewrites.find((rewrite) => rewrite.source === source);
}

test("/trae-echoes proxies to the live deployment root", () => {
  assert.deepEqual(findRewrite("/trae-echoes"), {
    source: "/trae-echoes",
    destination: "https://trae-echoes-2026-contest.vercel.app",
  });
});

test("/trae-echoes nested paths strip the public prefix upstream", () => {
  assert.deepEqual(findRewrite("/trae-echoes/:path*"), {
    source: "/trae-echoes/:path*",
    destination: "https://trae-echoes-2026-contest.vercel.app/:path*",
  });
});

test("/trae-contest-2026 proxies to the azure Vercel deployment", () => {
  assert.deepEqual(findRewrite("/trae-contest-2026"), {
    source: "/trae-contest-2026",
    destination:
      "https://trae-2026-contest-rankings-azure.vercel.app/trae-contest-2026",
  });
});

test("/trae-contest-2026 nested paths keep the public basePath upstream", () => {
  assert.deepEqual(findRewrite("/trae-contest-2026/:path*"), {
    source: "/trae-contest-2026/:path*",
    destination:
      "https://trae-2026-contest-rankings-azure.vercel.app/trae-contest-2026/:path*",
  });
});
