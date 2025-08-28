// components/KeyFactsAndHighlights.jsx
import React, { useMemo } from "react";

function parseDescription(desc = "") {
  const get = (re) => (desc.match(re)?.[1] || "").trim();

  // Capture both styles:
  //  - "📜 FREEHOLD"
  //  - "📜 Ownership: 100 years leasehold"
  const ownership =
    get(/Ownership:\s*([^\n]+)$/im) ||                // explicit Ownership line
    get(/📜\s*([^\n]+)$/m);                           // generic symbol line after 📜

  return {
    ownership,
    zone:        get(/Zone:\s*([^\n]+)/i),
    completion:  get(/Completion:\s*([^\n]+)/i),
    entry:       get(/Entry:\s*([^\n]+)/i),
    villaSize:   get(/Villa Size:\s*([\d.,]+\s*m²)/i),
    landSize:    get(/Land size:\s*([\d.,]+\s*m²)/i),
    bedrooms:    get(/(\d+)\s*Bedrooms?/i),
    bathrooms:   get(/(\d+)\s*Bathrooms?/i),
    workspace:   /Dedicated Workspace/i.test(desc) ? "Yes" : "",
    parking:     get(/Parking\s*-\s*([\d.,]+\s*m²)/i),
    poolArea:    get(/Swimming pool area\s*-\s*([\d.,]+\s*m²)/i),
    highlights: (() => {
      // everything after "Highlights:" split into bullets
      const block = desc.match(/Highlights:\s*([\s\S]*)$/i)?.[1] || "";
      return block
        .split(/\r?\n/)
        .map(s => s.replace(/^•\s*|\u200B|\u2060|⁠/g, "").trim())
        .filter(Boolean);
    })(),
  };
}

export default function KeyFactsAndHighlights({ description = "" }) {
  const d = useMemo(() => parseDescription(description), [description]);

  const facts = [
    ["Ownership", d.ownership],
    ["Zone", d.zone],
    ["Completion", d.completion],
    ["Entry", d.entry],
    ["Villa Size", d.villaSize],
    ["Land Size", d.landSize],
    ["Bedrooms", d.bedrooms],
    ["Bathrooms", d.bathrooms],
    ["Workspace", d.workspace],
    ["Parking", d.parking],
    ["Pool Area", d.poolArea],
  ].filter(([, v]) => v);

  const hasHighlights = d.highlights.length > 0;

  if (facts.length === 0 && !hasHighlights) return null;

  return (
    <section className="w-full overflow-x-hidden mt-6">
      {/* Outer glass card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        {/* 60/40 layout on lg+, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left: Key Facts (60%) */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold mb-4">Key Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-white/60 text-xs">{k}</div>
                  <div className="text-white font-medium">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Highlights (40%) */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Highlights</h3>
            <div className=" px-5 py-4">
              {hasHighlights ? (
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  {d.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              ) : (
                <div className="text-white/60">No highlights provided.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
