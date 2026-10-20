const BASE = { b0: 48, p0: 24, r0: 44, x0: 24, b1: 16, p1: 13, r1: 5.5, x1: 4 };
const PRESETS = [
  { id: "small", name: "Small research lab", tag: "About 4 genomes a week", arrive: 4 },
  { id: "core", name: "Mid-size core facility", tag: "About 24 genomes a week", arrive: 24 },
  { id: "center", name: "Large genome center", tag: "About 150 genomes a week", arrive: 150 }
];
const KEYS = ["arrive", "b0", "p0", "r0", "x0", "b1", "p1", "r1", "x1"];
const $ = id => document.getElementById(id);
let cur = PRESETS[1];

function num(id) { const v = parseFloat($(id).value); return isFinite(v) && v >= 0 ? v : 0; }
function fmtH(h) {
  const a = Math.abs(h);
  if (a < 1) return `${Math.round(a * 60)} min`;
  if (a < 48) return `${Math.round(a * 10) / 10} h`;
  return `${Math.round(a / 24 * 10) / 10} days`;
}
function waitHours(batch, perWeek) { return perWeek > 0 ? (batch / perWeek) * 168 / 2 : 0; }

function renderPresets() {
  $("presets").innerHTML = PRESETS.map(p =>
    `<button class="preset" type="button" data-id="${p.id}" aria-pressed="${p.id === cur.id}"><b>${p.name}</b><span>${p.tag}</span></button>`
  ).join("");
  $("presets").querySelectorAll(".preset").forEach(b => b.addEventListener("click", () => select(b.dataset.id)));
}
function select(id) {
  cur = PRESETS.find(p => p.id === id);
  renderPresets();
  $("arrive").value = cur.arrive;
  Object.keys(BASE).forEach(k => { $(k).value = BASE[k]; });
  update();
}

function bar(el, parts, max) {
  el.innerHTML = parts.map(([v, c]) => `<div class="seg" style="width:${v / max * 100}%;background:var(${c})"></div>`).join("");
}

function update() {
  const A = Math.max(num("arrive"), 0.5);
  const b1 = Math.min(Math.max(num("b1"), 1), 16);
  const s = {
    w0: waitHours(num("b0"), A), p0: num("p0"), r0: num("r0"), x0: num("x0"),
    w1: waitHours(b1, A), p1: num("p1"), r1: num("r1"), x1: num("x1")
  };
  const t0 = s.p0 + s.w0 + s.r0 + s.x0;
  const t1 = s.p1 + s.w1 + s.r1 + s.x1;
  const saved = t0 - t1;
  const max = Math.max(t0, t1) || 1;

  $("saved").textContent = saved >= 0 ? fmtH(saved) : "No gain";
  $("pct").textContent = t0 ? `${Math.round(saved / t0 * 100)}% of today's time · ${fmtH(t0)} → ${fmtH(t1)}` : "";
  $("tNow").textContent = fmtH(t0);
  $("tNew").textContent = fmtH(t1);
  bar($("bar0"), [[s.p0, "--prep"], [s.w0, "--wait"], [s.r0, "--run"], [s.x0, "--ana"]], max);
  bar($("bar1"), [[s.p1, "--prep"], [s.w1, "--wait"], [s.r1, "--run"], [s.x1, "--ana"]], max);

  const rows = [
    ["Waiting for a run to fill", s.w0, s.w1, "Right-sized runs", `About 16 genomes per run instead of filling a large flow cell, so a run fills about ${Math.round(num("b0") / b1)}x sooner at this lab's volume.`],
    ["Library prep", s.p0, s.p1, "AXELIOS library prep kits", "About 2 to 13 hours by method. Gains depend on the method the lab chooses."],
    ["Sequencing run", s.r0, s.r1, "SBX chemistry with tunable run time", "About 5.5 hours of instrument time per run."],
    ["Analysis to variant calls", s.x0, s.x1, "On-instrument compute", "Basecalling and alignment happen during the run, not after it."]
  ];
  $("rows").innerHTML = rows.map(([stage, a, b, feat, why]) => {
    const d = a - b;
    const cls = d > 0.05 ? "good" : (d < -0.05 ? "bad" : "");
    const txt = Math.abs(d) < 0.05 ? "No change" : (d > 0 ? `${fmtH(d)} faster` : `${fmtH(-d)} slower`);
    return `<tr><td>${stage}</td><td class="n">${fmtH(a)}</td><td class="n">${fmtH(b)}</td><td class="n ${cls}">${txt}</td><td><span class="feat">${feat}</span><span class="why">${why}</span></td></tr>`;
  }).join("");

  // biggest driver
  const gains = [["right-sized runs", s.w0 - s.w1], ["the shorter SBX run", s.r0 - s.r1], ["on-instrument analysis", s.x0 - s.x1], ["library prep", s.p0 - s.p1]].sort((x, y) => y[1] - x[1]);
  const top = gains[0];
  if (saved > 0 && top[1] > 0) {
    $("insHead").textContent = `Biggest driver here: ${top[0]}`;
    $("insText").textContent = top[0] === "right-sized runs"
      ? `At ${A} genomes a week, samples wait about ${fmtH(s.w0)} for a large run to fill. That is the gap AXELIOS 1 closes most, which makes small and mid-size labs the strongest fit.`
      : `At ${A} genomes a week, large runs already fill quickly, so the gain comes mostly from ${top[0]}. The pitch here is speed per run, not batch flexibility.`;
  } else {
    $("insHead").textContent = "No time advantage at these settings";
    $("insText").textContent = "Check the inputs. If the current workflow is already this fast, lead with a different benefit.";
  }

  const runs90 = Math.ceil(A * 13 / b1);
  const sensors = Math.ceil(runs90 / 20);
  const perDay = A / 5;
  let check = `At this volume the lab would do about ${runs90} runs every 90 days. The sensor is rated for 20 runs within 90 days, so that is about ${sensors} sensor ${sensors === 1 ? "module" : "modules"} per quarter. Confirm consumable and sensor cost per genome at this run size, since cost per sample is not modeled.`;
  if (perDay > 64) check += ` Volume is above the published 64 genomes a day, so this lab would need more than one instrument.`;
  $("checkText").textContent = check;

  $("talk").textContent = saved > 0
    ? `At ${A} genomes a week, a sample takes about ${fmtH(t0)} from prep to variant calls today. On AXELIOS 1 it's about ${fmtH(t1)}, ${fmtH(saved)} sooner. Most of that comes from ${top[0]}. The run itself takes about ${fmtH(s.r1)}, and basecalling and alignment happen while it runs.`
    : `At these settings AXELIOS 1 doesn't shorten turnaround. Ask about the lab's batch size and run schedule before positioning on speed.`;
}

KEYS.forEach(k => $(k).addEventListener("input", update));
$("reset").addEventListener("click", () => select(cur.id));
$("copy").addEventListener("click", async () => {
  const text = $("talk").textContent;
  try { await navigator.clipboard.writeText(text); $("copy").textContent = "Copied"; }
  catch (e) {
    const r = document.createRange(); r.selectNodeContents($("talk"));
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    $("copy").textContent = "Selected, press Ctrl+C";
  }
  setTimeout(() => { $("copy").textContent = "Copy"; }, 1800);
});

select("core");
