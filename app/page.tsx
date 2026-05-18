"use client";

import { useState } from "react";

interface Product {
  name: string;
  dose: string;
}

interface SpraySession {
  day: string;
  products: Product[];
  note?: string;
}

interface DefoliationSection {
  heading: string;
  points: string[];
}

interface DefoliationGuide {
  title: string;
  goal: string;
  sections: DefoliationSection[];
}

interface Week {
  week: string;
  label: string;
  spray: SpraySession[];
  notes: string | null;
  defoliation: DefoliationGuide | null;
  harvest?: boolean;
}

const KEEP_IT_CLEAN: DefoliationGuide = {
  title: "Ongoing — Keep It Clean",
  goal: "Stay proactive. A clean plant is a healthy plant.",
  sections: [
    {
      heading: "🪴 Weekly Maintenance",
      points: [
        "Keep an eye on your plant at all times",
        "Remove any dead or decaying tissue immediately — it invites pests and mold",
        "Tuck or remove any leaves blocking bud sites",
        "If something looks wrong, trust your instincts and remove it",
      ]
    },
  ]
};

const DAY1_DEFOLIATION: DefoliationGuide = {
  title: "Day 1 — Strategic Defoliation & Leg Shaving",
  goal: "Anticipate the stretch. Your plant will roughly double in size during flower so clean aggressively now to set up a perfect canopy.",
  sections: [
    {
      heading: "🌿 Canopy",
      points: [
        "Work up to your canopy and leave only the top 4 inches of foliage",
        "Remove all large fan leaves",
        "Strategically remove any leaves laying on top of each other with no air or light underneath",
      ]
    },
    {
      heading: "✂️ Below the Canopy",
      points: [
        "Remove every branch that is NOT reaching up into the canopy",
        "For every branch that IS reaching up — shave everything off that branch below the canopy, clean to the stalk",
      ]
    },
    {
      heading: "💡 Why This Works",
      points: [
        "On Day 21 when we defoliate again, stress will be minimal — only removing leaves, not whole branches",
        "This will look dramatic and sparse. Trust the process. After the stretch it will be perfect 🌿",
      ]
    },
  ]
};

const DAY21_DEFOLIATION: DefoliationGuide = {
  title: "Day 21 — Strategic Leaf Thinning",
  goal: "Open up the canopy for maximum light penetration and airflow. Bud sites take over from here.",
  sections: [
    {
      heading: "✂️ The Process",
      points: [
        "This is mainly a strategic thinning of leaves — not a major branch removal",
        "Remove any straggler branches you find, but anything with good girth and good light — leave it",
        "Remove all large fan leaves — only small leaves around bud sites remain",
        "Those small bud site leaves will now receive direct light and become your primary leaves",
      ]
    },
    {
      heading: "💡 The Light Test",
      points: [
        "Look at your plant from all angles",
        "Get below the plant and look up at the light — everything you see should be illuminated",
        "Find the dark spots — go to that area and you will almost always find a leaf laying on top causing the shadow",
        "When you see congestion, that is your target",
      ]
    },
    {
      heading: "✅ When You Are Done",
      points: [
        "Air moves freely through the entire plant",
        "Canopy sits at 12–16 inches depending on strain and how aggressive Day 1 was",
        "Only small leaves around bud sites remain",
        "With practice you will nail it every time 🌿",
      ]
    },
    {
      heading: "🏆 The Goal",
      points: [
        "If defoliated correctly and topped properly — 30 colas, ~6g dry weight each. That is what we are working toward 🔥",
      ]
    },
  ]
};

const WEEK7_DEFOLIATION: DefoliationGuide = {
  title: "Week 7 — Watch Closely",
  goal: "Your plant is telling you harvest is approaching. Learn to read the signs.",
  sections: [
    {
      heading: "🍂 What You Should See",
      points: [
        "Leaves should be starting to fade and change colors — this is normal and expected",
        "The plant is pulling nutrients back into the buds — let it happen",
        "Remove any fully dead or yellowed leaves but don't over-strip",
      ]
    },
    {
      heading: "👁️ Watch the Hairs",
      points: [
        "Most people go by trichomes under a loupe — that works great",
        "But a seasoned grower can read the hairs just as well",
        "Watch for the pistils (hairs) to darken and curl inward — the more amber the closer you are",
        "When the majority have darkened and curled you are getting very close to harvest",
      ]
    },
  ]
};

const FINAL_DEFOLIATION: DefoliationGuide = {
  title: "Final Week — Last Defoliation",
  goal: "One final clean up before harvest. Remove everything that is not a sugar leaf.",
  sections: [
    {
      heading: "✂️ The Final Strip",
      points: [
        "Go through the entire plant and remove every leaf with a stem",
        "If it has a stem and is not a small sugar leaf coming directly out of a bud — remove it",
        "Sugar leaves stay — everything else goes",
        "This final clean up makes trimming at harvest much faster and cleaner",
        "Your buds should be fully exposed and looking their absolute best 🔥",
      ]
    },
  ]
};

// COMMERCIAL VEG — 7 gallon pots
const COMMERCIAL_VEG_WEEKS: Week[] = [
  {
    week: "Veg Week 1", label: "Wk 1",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "15 mL/gal" }, { name: "OxiPhos", dose: "15 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: "First day of veg. Begin IPM protocol immediately.",
    defoliation: null,
  },
  {
    week: "Veg Week 2", label: "Wk 2",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: "Increase ZeroTol & OxiPhos to full dose.",
    defoliation: null,
  },
  {
    week: "Veg Week 3", label: "Wk 3",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: "Transplant to 7 gallon pots this week.",
    defoliation: null,
  },
  {
    week: "Veg Week 4", label: "Wk 4",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: null,
    defoliation: null,
  },
  {
    week: "Veg Week 5", label: "Wk 5",
    spray: [
      { day: "Day 1", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
      { day: "Day 4", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
    ],
    notes: null,
    defoliation: null,
  },
  {
    week: "Veg Week 6", label: "Wk 6",
    spray: [
      { day: "Day 1", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
      { day: "Day 4", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
    ],
    notes: null,
    defoliation: null,
  },
  {
    week: "Veg Week 7", label: "Wk 7",
    spray: [
      { day: "Day 1", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
      { day: "Day 4", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
    ],
    notes: null,
    defoliation: null,
  },
  {
    week: "Veg Week 8", label: "Wk 8",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: "Last full veg spray week before flip.",
    defoliation: null,
  },
];

// COMMERCIAL FLOWER — 7 gallon pots
const COMMERCIAL_FLOWER_WEEKS: Week[] = [
  {
    week: "Flower Week 1", label: "Wk 1",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }], note: "Spray after defoliation" },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: "Begin Day 1 Strategic Defoliation. Trellis plants once finished.",
    defoliation: DAY1_DEFOLIATION,
  },
  {
    week: "Flower Week 2", label: "Wk 2",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
      { day: "Day 5", products: [{ name: "Organic Shield", dose: "40 mL/gal (preventative)" }] },
    ],
    notes: null,
    defoliation: KEEP_IT_CLEAN,
  },
  {
    week: "Flower Week 3", label: "Wk 3",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "30 mL/gal" }, { name: "OxiPhos", dose: "30 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }] },
    ],
    notes: "Take clones from mother plants. Soak in ZeroTol at 15 mL/gal for 45–60 sec. Trim leaf tips, cut stem at 45° angle. Dip in rooting hormone, insert into amended plug. Lightly mist with Clonex. Keep domes closed 3–4 days. ⚠️ Only use sterilized scissors or scalpel.",
    defoliation: KEEP_IT_CLEAN,
  },
  {
    week: "Flower Week 4", label: "Wk 4",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "35 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }], note: "If needed. Once defoliation is complete." },
    ],
    notes: "Begin Day 21 Strategic Thinning.",
    defoliation: DAY21_DEFOLIATION,
  },
  {
    week: "Flower Week 5", label: "Wk 5",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "35 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }], note: "If needed" },
    ],
    notes: "Day 14–17 of rooted clones — begin transplant to 1 gal pots.",
    defoliation: KEEP_IT_CLEAN,
  },
  {
    week: "Flower Week 6", label: "Wk 6",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "35 mL/gal" }, { name: "Azaguard", dose: "4 mL/gal" }], note: "If needed" },
    ],
    notes: null,
    defoliation: KEEP_IT_CLEAN,
  },
  {
    week: "Flower Week 7", label: "Wk 7",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "35 mL/gal" }], note: "Strategic thinning if needed" },
    ],
    notes: null,
    defoliation: WEEK7_DEFOLIATION,
  },
  {
    week: "Flower Week 8 — Begin Flush", label: "Wk 8",
    spray: [
      { day: "Day 1", products: [{ name: "ZeroTol", dose: "35 mL/gal" }] },
    ],
    notes: "Begin flush this week.",
    defoliation: FINAL_DEFOLIATION,
  },
  {
    week: "Flower Week 9 — Flush", label: "Wk 9",
    spray: [],
    notes: "Flush only. No spraying during late flush.",
    defoliation: null,
  },
  {
    week: "Flower Week 10 — Harvest", label: "Wk 10",
    spray: [],
    notes: "Harvest & Tear Down. BioFoam all surfaces with SaniDate 5.0 at 1.25 oz/gal + 4 oz BioFoaming Agent. Clean drip lines with ZeroTol and SaniDate.",
    defoliation: null,
    harvest: true,
  },
];

const PRODUCT_COLORS: Record<string, string> = {
  "ZeroTol": "#ef4444",
  "OxiPhos": "#3b82f6",
  "Azaguard": "#22c55e",
  "Organic Shield": "#a855f7",
  "Lost Coast Plant Therapy": "#f59e0b",
};

const HOME_GROW_SCHEDULE = [
  { day: "Week 1 — Day 1", products: [{ name: "Lost Coast Plant Therapy", dose: "2 oz/gal" }] },
  { day: "Week 2 — Day 1", products: [{ name: "Organic Shield", dose: "50 mL/gal" }] },
  { day: "Week 3 — Day 1", products: [{ name: "Lost Coast Plant Therapy", dose: "2 oz/gal" }] },
  { day: "Week 4 — Day 1", products: [{ name: "Organic Shield", dose: "50 mL/gal" }] },
];

const ORGANIC_SHIELD_DOSES = [
  { level: "Preventative", dose: "40 mL/gal", color: "#22c55e", description: "Clean environment, no visible issues" },
  { level: "Moderate", dose: "60 mL/gal", color: "#f59e0b", description: "Early signs of pests or mold" },
  { level: "Infested", dose: "80 mL/gal", color: "#ef4444", description: "Active infestation or outbreak" },
];

export default function IPMGuide() {
  const [phase, setPhase] = useState<string>("veg");
  const [weekIndex, setWeekIndex] = useState<number>(0);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [growMode, setGrowMode] = useState<string>("commercial");

  const vegSchedule = COMMERCIAL_VEG_WEEKS;
  const flowerSchedule = COMMERCIAL_FLOWER_WEEKS;
  const schedule = phase === "veg" ? vegSchedule : flowerSchedule;
  const currentWeek = schedule[weekIndex];
  const phaseColor = phase === "veg" ? "#4ade80" : "#fb923c";
  const phaseDark = phase === "veg" ? "#052e16" : "#1c0700";
  const potSize = growMode === "commercial" ? "7 gallon" : "5 gallon";

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'Georgia', serif", color: "#e4ddd0" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(160deg, #0a1a0a 0%, #1a0a1a 100%)", borderBottom: "1px solid #1f1f1f", padding: "28px 20px 18px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 7, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>by MushLuvv</div>
        <div style={{ fontSize: 28, fontWeight: "bold", color: "#e4ddd0", letterSpacing: 1 }}>IPM & Defoliation 🛡️</div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>Spray schedule & defoliation guide by Clinton</div>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* GROW MODE TOGGLE */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: 10, textTransform: "uppercase" }}>Grow Mode</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { id: "commercial", label: "🏭 Commercial", color: "#fb923c", dark: "#1c0700" },
              { id: "homegrow", label: "🏠 Home Grow", color: "#4ade80", dark: "#052e16" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => { setGrowMode(m.id); setActivePanel(null); }}
                style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: `2px solid ${growMode === m.id ? m.color : "#222"}`, background: growMode === m.id ? m.dark : "#111", color: growMode === m.id ? m.color : "#555", fontFamily: "Georgia, serif", fontSize: 14, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* HOME GROW PANEL */}
        {growMode === "homegrow" && (
          <div style={{ background: "#0a1a0a", border: "1px solid #1a3a1a", borderRadius: 14, padding: "20px 18px", marginBottom: 22 }}>
            <div style={{ fontSize: 15, fontWeight: "bold", color: "#4ade80", marginBottom: 10 }}>🏠 Home Grow Spray Program</div>
            <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6, background: "#050f05", borderRadius: 10, padding: "12px 14px", marginBottom: 16, borderLeft: "3px solid #4ade80" }}>
              If you never want to see bugs or PM, you're going to have to spray something. To completely cover your bases you need something that kills hard-bodied insects, eggs, soft-bodied insects, and mold spores. You can do this with weekly alternating organic sprays.
            </div>

            {/* Alternating schedule */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>Weekly Rotation</div>
              {HOME_GROW_SCHEDULE.map((s: { day: string; products: Product[] }, i: number) => (
                <div key={i} style={{ background: "#0a0a0a", borderRadius: 10, padding: "12px 14px", marginBottom: 8, borderLeft: `3px solid ${i % 2 === 0 ? "#f59e0b" : "#a855f7"}` }}>
                  <div style={{ fontSize: 11, color: i % 2 === 0 ? "#f59e0b" : "#a855f7", fontWeight: "bold", marginBottom: 6 }}>{s.day}</div>
                  {s.products.map((p: Product, j: number) => (
                    <div key={j} style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ fontSize: 13, color: "#ddd" }}>{p.name}</div>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: i % 2 === 0 ? "#f59e0b" : "#a855f7" }}>{p.dose}</div>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ fontSize: 12, color: "#555", marginTop: 8, fontStyle: "italic" }}>Continue alternating every 7 days throughout your grow</div>
            </div>

            {/* Pot size */}
            <div style={{ background: "#0a0a0a", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: "#aaa" }}>🪴 Recommended Pot Size</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#4ade80" }}>5 Gallon</div>
            </div>
          </div>
        )}

        {/* COMMERCIAL SPRAY PHILOSOPHY */}
        {growMode === "commercial" && (
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden", marginBottom: 22 }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase" }}>
              🛡️ Commercial Spray Philosophy
            </div>
            <div style={{ padding: "18px" }}>
              <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7, marginBottom: 16 }}>
                Our commercial IPM approach addresses every threat — hard-bodied insects, soft-bodied insects, mold spores, and eggs — every single week. The goal is maximum protection with minimum stress on the plant.
              </div>
              {[
                {
                  icon: "🗓️",
                  title: "Staggered — Never Combined",
                  desc: "We wait 4 days between sprays and rotate solutions so the plant is never overwhelmed and pests never develop resistance.",
                },
                {
                  icon: "💀",
                  title: "Day 1 — Hard Attack",
                  desc: "We target hard-bodied insects and eggs with a penetrating solution that gets into crevices and kills what hides.",
                },
                {
                  icon: "🌿",
                  title: "Day 5 — Broad Sweep",
                  desc: "Four days later we hit mold spores and soft-bodied insects with a different mode of action — covering what Day 1 missed.",
                },
                {
                  icon: "🪴",
                  title: "Commercial Pot Size",
                  desc: "7 gallon pots for commercial grows.",
                },
              ].map((item: { icon: string; title: string; desc: string }, i: number) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < 3 ? 14 : 0, paddingBottom: i < 3 ? 14 : 0, borderBottom: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#e4ddd0", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE TOGGLE — commercial only */}
        {growMode === "commercial" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
              {[
                { id: "veg", label: "🌱 Veg", color: "#4ade80", dark: "#052e16" },
                { id: "flower", label: "🌸 Flower", color: "#fb923c", dark: "#1c0700" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPhase(p.id); setWeekIndex(0); setActivePanel(null); }}
                  style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: `2px solid ${phase === p.id ? p.color : "#222"}`, background: phase === p.id ? p.dark : "#111", color: phase === p.id ? p.color : "#555", fontFamily: "Georgia, serif", fontSize: 15, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* WEEK PILLS */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: 10, textTransform: "uppercase" }}>Select Week</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {schedule.map((w: Week, i: number) => (
                  <button
                    key={i}
                    onClick={() => { setWeekIndex(i); setActivePanel(null); }}
                    style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${weekIndex === i ? phaseColor : "#222"}`, background: weekIndex === i ? phaseDark : "#111", color: weekIndex === i ? phaseColor : "#666", fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer" }}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* WEEK HEADER */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "16px 18px", marginBottom: 18 }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: phaseColor, marginBottom: 6 }}>{currentWeek.week}</div>
              {currentWeek.notes && (
                <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6, background: "#0a0a0a", borderRadius: 10, padding: "10px 14px", marginTop: 8, borderLeft: `3px solid ${phaseColor}` }}>
                  {currentWeek.notes}
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <button
                onClick={() => setActivePanel(activePanel === "spray" ? null : "spray")}
                style={{ flex: 1, padding: "16px", borderRadius: 14, border: `2px solid ${activePanel === "spray" ? "#ef4444" : "#222"}`, background: activePanel === "spray" ? "#1a0000" : "#111", color: activePanel === "spray" ? "#ef4444" : "#666", fontFamily: "Georgia, serif", fontSize: 15, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
              >
                🌿 Spray Schedule
              </button>
              <button
                onClick={() => setActivePanel(activePanel === "defoliation" ? null : "defoliation")}
                style={{ flex: 1, padding: "16px", borderRadius: 14, border: `2px solid ${activePanel === "defoliation" ? "#22c55e" : "#222"}`, background: activePanel === "defoliation" ? "#001a00" : "#111", color: activePanel === "defoliation" ? "#22c55e" : "#666", fontFamily: "Georgia, serif", fontSize: 15, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
              >
                🪴 Defoliation
              </button>
            </div>

            {/* SPRAY PANEL */}
            {activePanel === "spray" && (
              <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase" }}>
                  Spray Instructions
                </div>
                {currentWeek.spray.length === 0 ? (
                  <div style={{ padding: "24px 18px", textAlign: "center", color: "#555", fontSize: 14 }}>
                    No spraying this week 💧
                  </div>
                ) : (
                  currentWeek.spray.map((session: SpraySession, i: number) => (
                    <div key={i} style={{ padding: "16px 18px", borderBottom: i < currentWeek.spray.length - 1 ? "1px solid #161616" : "none" }}>
                      <div style={{ fontSize: 12, color: phaseColor, fontWeight: "bold", marginBottom: 10, letterSpacing: 1 }}>
                        {session.day}
                        {session.note && <span style={{ color: "#666", fontWeight: "normal", marginLeft: 8 }}>— {session.note}</span>}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {session.products.map((p: Product, j: number) => (
                          <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a0a0a", borderRadius: 10, padding: "10px 14px", borderLeft: `3px solid ${PRODUCT_COLORS[p.name] || "#a855f7"}` }}>
                            <div style={{ fontSize: 14, color: "#ddd" }}>{p.name}</div>
                            <div style={{ fontSize: 14, fontWeight: "bold", color: PRODUCT_COLORS[p.name] || "#a855f7" }}>{p.dose}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
                <div style={{ padding: "12px 18px", borderTop: "1px solid #1a1a1a", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {Object.entries(PRODUCT_COLORS).map(([name, color]: [string, string]) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEFOLIATION PANEL */}
            {activePanel === "defoliation" && (
              <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase" }}>
                  Defoliation Guide
                </div>
                {currentWeek.defoliation ? (
                  <div style={{ padding: "18px" }}>
                    <div style={{ fontSize: 15, fontWeight: "bold", color: "#22c55e", marginBottom: 8 }}>
                      {currentWeek.defoliation.title}
                    </div>
                    <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6, background: "#0a0a0a", borderRadius: 10, padding: "10px 14px", marginBottom: 16, borderLeft: "3px solid #22c55e" }}>
                      {currentWeek.defoliation.goal}
                    </div>
                    {currentWeek.defoliation.sections.map((section: DefoliationSection, si: number) => (
                      <div key={si} style={{ marginBottom: si < (currentWeek.defoliation as DefoliationGuide).sections.length - 1 ? 16 : 0 }}>
                        <div style={{ fontSize: 13, fontWeight: "bold", color: "#e4ddd0", marginBottom: 8 }}>
                          {section.heading}
                        </div>
                        {section.points.map((point: string, pi: number) => (
                          <div key={pi} style={{ display: "flex", gap: 10, marginBottom: pi < section.points.length - 1 ? 8 : 0 }}>
                            <div style={{ color: "#22c55e", fontSize: 14, flexShrink: 0, marginTop: 1 }}>•</div>
                            <div style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{point}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "24px 18px", textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🪴</div>
                    <div style={{ fontSize: 14, color: "#555" }}>No defoliation this week</div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* SPRAY TIMING GUIDE */}
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 14, padding: "16px 18px" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 14 }}>Spray Timing Rules</div>
          {[
            { icon: "🌙", text: "Always spray at lights off or just before the dark period" },
            { icon: "💨", text: "Ensure good airflow after spraying" },
            { icon: "⚠️", text: "Stop all foliar sprays after Flower Week 5" },
            { icon: "🧪", text: "Never mix ZeroTol with other products — apply separately" },
            { icon: "🌡️", text: "Let spray dry completely before lights come on" },
          ].map((tip: { icon: string; text: string }, i: number) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 4 ? 10 : 0 }}>
              <span style={{ fontSize: 16 }}>{tip.icon}</span>
              <span style={{ fontSize: 13, color: "#777", lineHeight: 1.5 }}>{tip.text}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
