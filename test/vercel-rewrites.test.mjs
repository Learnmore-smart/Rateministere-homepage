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
