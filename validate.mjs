// Pre-publish gate: `node validate.mjs` must print PASS before any push.
// Checks data.js independently of the page's own rendering code.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ctx = { window: {} };
vm.runInNewContext(readFileSync(new URL("./data.js", import.meta.url), "utf8"), ctx);
const L = ctx.window.LEAGUE;

const errors = [];
const fail = msg => errors.push(msg);
const names = L.castaways.map(c => c.name);
const known = new Set(names);
const dupes = arr => arr.filter((x, i) => arr.indexOf(x) !== i);

// cast
if (names.length !== 21) fail(`expected 21 castaways, found ${names.length}`);
for (const d of dupes(names)) fail(`castaway listed twice: ${d}`);

// draft: 20 picks, 1..20, one copy each, 5 per manager, snake order
const snake = [];
for (let r = 0; r < 5; r++) snake.push(...(r % 2 ? [...L.managers].reverse() : L.managers));
if (L.draft.length !== 20) fail(`expected 20 draft picks, found ${L.draft.length}`);
L.draft.forEach((d, i) => {
  if (d.pick !== i + 1) fail(`draft row ${i + 1} has pick #${d.pick}`);
  if (snake[d.pick - 1] !== d.manager) fail(`pick #${d.pick} should belong to ${snake[d.pick - 1]}, not ${d.manager}`);
  if (!known.has(d.castaway)) fail(`draft pick #${d.pick}: unknown castaway "${d.castaway}"`);
});
for (const d of dupes(L.draft.map(d => d.castaway))) fail(`drafted twice: ${d}`);
for (const m of L.managers) {
  const n = L.draft.filter(d => d.manager === m).length;
  if (n !== 5) fail(`${m} has ${n} castaways, expected 5`);
}

// tribes
const valid = new Set([...Object.keys(L.tribes), "Exile Island"]);
for (const c of L.castaways) {
  if (!L.tribes[c.original]) fail(`${c.name}: invalid original tribe "${c.original}"`);
  if (c.current !== null && !valid.has(c.current)) fail(`${c.name}: invalid current tribe "${c.current}"`);
}

// boots vs current tribe
const booted = new Set(L.boots.map(b => b.name));
for (const b of L.boots) {
  if (!known.has(b.name)) fail(`boot: unknown castaway "${b.name}"`);
  if (b.episode > L.updatedThrough) fail(`boot ${b.name} is in episode ${b.episode}, after updatedThrough`);
}
for (const d of dupes(L.boots.map(b => b.name))) fail(`booted twice: ${d}`);
for (const c of L.castaways) {
  if (booted.has(c.name) && c.current !== null) fail(`${c.name} is booted but still has current tribe "${c.current}"`);
  if (!booted.has(c.name) && c.current === null) fail(`${c.name} has no current tribe but isn't in the boot order`);
}

// points log
const eps = L.episodes.map(e => e.n);
eps.forEach((n, i) => { if (n !== i + 1) fail(`episodes out of order: position ${i + 1} is episode ${n}`); });
if (eps.at(-1) !== L.updatedThrough) fail(`updatedThrough is ${L.updatedThrough} but last logged episode is ${eps.at(-1)}`);
for (const ep of L.episodes) {
  const bootedBy = new Set(L.boots.filter(b => b.episode < ep.n).map(b => b.name));
  const outThisEp = new Set(L.boots.filter(b => b.episode === ep.n).map(b => b.name));
  const survival = ep.events.filter(e => e.survival);
  if (survival.length !== 1) fail(`episode ${ep.n}: expected exactly one survival (+1) event, found ${survival.length}`);
  for (const ev of ep.events) {
    if (!Number.isInteger(ev.pts) || ev.pts === 0) fail(`episode ${ep.n} "${ev.event}": bad pts ${ev.pts}`);
    for (const d of dupes(ev.who)) fail(`episode ${ep.n} "${ev.event}": ${d} listed twice`);
    for (const w of ev.who) {
      if (!known.has(w)) fail(`episode ${ep.n} "${ev.event}": unknown castaway "${w}"`);
      if (bootedBy.has(w)) fail(`episode ${ep.n} "${ev.event}": ${w} was already out`);
    }
  }
  // survival: everyone still in after this episode, and nobody else
  if (survival[0]) {
    if (survival[0].pts !== 1) fail(`episode ${ep.n}: survival event must be +1`);
    const expected = names.filter(n => !bootedBy.has(n) && !outThisEp.has(n));
    const got = new Set(survival[0].who);
    for (const n of expected) if (!got.has(n)) fail(`episode ${ep.n}: ${n} survived but got no +1`);
    for (const n of got) if (!expected.includes(n)) fail(`episode ${ep.n}: ${n} got survival +1 but went home`);
    const m = survival[0].label.match(/\d+/);
    if (m && +m[0] !== expected.length) fail(`episode ${ep.n}: survival label says ${m[0]} but ${expected.length} survived`);
  }
  for (const ev of ep.events) {
    const m = ev.label.match(/all (\d+)/i);
    if (m && +m[0].match(/\d+/)[0] !== ev.who.length) fail(`episode ${ep.n} "${ev.label}": label count ≠ ${ev.who.length} names`);
  }
}

// summary (the same numbers the page shows)
const pts = Object.fromEntries(names.map(n => [n, 0]));
for (const ep of L.episodes) for (const ev of ep.events) for (const w of ev.who) pts[w] += ev.pts;
const teams = L.managers.map(m => {
  const r = L.draft.filter(d => d.manager === m).map(d => d.castaway);
  return { m, total: r.reduce((s, c) => s + pts[c], 0), alive: r.filter(c => !booted.has(c)).length,
           roster: r.map(c => `${c}${booted.has(c) ? " (out)" : ""} ${pts[c]}`) };
}).sort((a, b) => b.total - a.total);

console.log(`Standings through episode ${L.updatedThrough}:`);
for (const t of teams) console.log(`  ${t.m.padEnd(8)} ${String(t.total).padStart(4)} pts  ${t.alive}/5 alive   ${t.roster.join(" · ")}`);
console.log(`Castaway points total: ${Object.values(pts).reduce((a, b) => a + b, 0)}`);

if (errors.length) {
  console.error(`\nFAIL — ${errors.length} problem(s):`);
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log("\nPASS");
