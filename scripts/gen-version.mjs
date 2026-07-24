// Writes public/version.json at build time so the deployed site exposes its
// build provenance (commit + timestamp). Netlify sets COMMIT_REF during builds.
import { writeFileSync, mkdirSync } from "node:fs";

const commit = process.env.COMMIT_REF || process.env.GITHUB_SHA || "dev";
const builtAt = new Date().toISOString();

mkdirSync("public", { recursive: true });
writeFileSync("public/version.json", JSON.stringify({ commit, builtAt }, null, 2) + "\n");

console.log(`[version] wrote public/version.json — ${commit.slice(0, 7)} @ ${builtAt}`);
