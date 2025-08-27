import React from "react";

/** Helpers */
const toList = (v) =>
  (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const isEmpty = (v) => v == null || (typeof v === "string" && v.trim() === "");

function buildOption(optionName, property) {
  const name = optionName.toLowerCase();

  const lockIn = property?.lockInPeriod?.trim();
  const afterLockIn = lockIn ? `After lock-in (${lockIn})` : "After minimum holding period";

  // You can tweak these copy blocks safely without touching the render logic
  const templates = {
    "secondary market": {
      title: "Secondary Market",
      timeline: afterLockIn,
      description:
        "Trade or transfer your shares to qualified investors via managed secondary channels (subject to SPV transfer terms).",
    },
    resale: {
      title: "Resale",
      timeline: afterLockIn,
      description:
        "Resell your position through platform-facilitated buyer discovery and SPV share transfer.",
    },
    buyback: {
      title: "Buyback Program",
      timeline: afterLockIn,
      description:
        "Issuer-facilitated buyback subject to availability and fair market value, per program terms.",
    },
    "buyback program": {
      title: "Buyback Program",
      timeline: afterLockIn,
      description:
        "Issuer-facilitated buyback subject to availability and fair market value, per program terms.",
    },
    "property sale": {
      title: "Property Sale",
      timeline: "Target 5–7 years (market-dependent)",
      description:
        "Full exit upon asset disposition with pro-rata distributions after fees and obligations.",
    },
  };

  // Fallback if API returns something new
  return (
    templates[name] || {
      title: optionName,
      timeline: afterLockIn,
      description: "Exit pathway subject to SPV terms and platform policies.",
    }
  );
}

export default function ExitLiquidity({ property = {} }) {
  // 1) Parse exit options from API (string like "Resale, Buyback, Secondary Market")
  const rawOptions = toList(property.exitOptions);
  const hasOptions = rawOptions.length > 0;

  // 2) Materialize option cards from templates
  const exitOptions = hasOptions
    ? rawOptions.map((opt) => buildOption(opt, property))
    : [
        // Fallback set if API has nothing
        buildOption("Secondary Market", property),
        buildOption("Buyback Program", property),
        buildOption("Property Sale", property),
      ];

  // 3) Liquidity / returns badges from API (optional)
  const roi = property?.roiRange?.trim();
  const scenarios = [
    !isEmpty(property?.scenarioConservative) && {
      label: "Conservative",
      value: property.scenarioConservative,
    },
    !isEmpty(property?.scenarioBase) && {
      label: "Base",
      value: property.scenarioBase,
    },
    !isEmpty(property?.scenarioAggressive) && {
      label: "Aggressive",
      value: property.scenarioAggressive,
    },
  ].filter(Boolean);

  const notes = [
    property?.ownershipStructure && `Structure: ${property.ownershipStructure}`,
    property?.lockInPeriod && `Lock-in: ${property.lockInPeriod}`,
    property?.currencyRisk && `Currency Risk: ${property.currencyRisk}`,
    property?.paymentTerms && `Payment Terms: ${property.paymentTerms}`,
  ].filter(Boolean);

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">Exit &amp; Liquidity</h2>
          <p className="text-white/70 text-lg">
            Multiple exit pathways designed for investor flexibility and real-world liquidity.
          </p>
        </div>


        {/* Exit Options */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
          {exitOptions.map((option, idx) => (
            <div
              key={`${option.title}-${idx}`}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold mb-2">{option.title}</h3>
              <div className="text-yellow-400 font-medium mb-3">{option.timeline}</div>
              <p className="text-white/70 text-sm">{option.description}</p>
            </div>
          ))}
        </div>

    
      </div>
    </section>
  );
}
