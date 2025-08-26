// import React, { useMemo, useState, useEffect } from "react";
// import { TrendingUp, Clock, DollarSign } from "lucide-react";

// /** Coerce value to number (handles "1,200", " 300 ", numbers). Returns NaN if not numeric. */
// const toNumber = (v) => {
//   if (v == null) return NaN;
//   if (typeof v === "number") return v;
//   if (typeof v === "string") {
//     const s = v.replace(/,/g, "").trim();
//     if (s === "") return NaN;
//     return Number(s);
//   }
//   return NaN;
// };

// /** Empty if null/undefined, "", 0, "0", "0.00", etc. */
// const isEmpty = (v) => {
//   if (v == null) return true;
//   if (typeof v === "string") {
//     const s = v.trim();
//     if (s === "") return true;
//     const n = toNumber(s);
//     if (!Number.isNaN(n) && n === 0) return true;
//     return false;
//   }
//   if (typeof v === "number") return v === 0;
//   return false;
// };

// /** Grid that:
//  *  - If 1–4 items: makes exactly N columns (single row, centered).
//  *  - If >4 items: locks to 4 columns and wraps to additional rows.
//  *  Equal height via children having h-full, and grid items stretched.
//  */
// function GridFour({ children, min = 260 }) {
//   const items = React.Children.toArray(children);
//   const count = items.length;
//   const cols = Math.min(4, Math.max(1, count)); // 1..4

//   return (
//     <div
//       className="grid gap-6 justify-center items-stretch"
//       style={{
//         gridTemplateColumns:
//           count <= 4
//             ? `repeat(${cols}, minmax(${min}px, 1fr))`
//             : `repeat(4, minmax(${min}px, 1fr))`,
//       }}
//     >
//       {items}
//     </div>
//   );
// }

// /** Card base with equal heights in a section */
// const cardBase = (minH = 220) =>
//   `bg-white/5 rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between min-h-[${minH}px]`;

// export default function Financials({ property }) {
//   // -------- Build raw data (no hooks) --------
//   const capexData = useMemo(
//     () => ({
//       land: property?.capexLand,
//       build: property?.capexBuild,
//       gpus: property?.capexGPU,
//       setup: property?.capexSetup,
//     }),
//     [property]
//   );

//   const revenueStreams = useMemo(
//     () => ({
//       rent: property?.revenueStreamsRent,
//       gpus: property?.revenueStreamsGPUs,
//       btc: property?.revenueStreamsBTC,
//       agro: property?.revenueStreamsAgro,
//     }),
//     [property]
//   );

//   const scenarios = useMemo(
//     () => ({
//       conservative: property?.scenarioConservative,
//       base: property?.scenarioBase,
//       aggressive: property?.scenarioAggressive,
//     }),
//     [property]
//   );

//   // Availability flags per segment
//   const hasOverview =
//     !isEmpty(property?.startingInvestment) ||
//     !isEmpty(property?.roiRange) ||
//     !isEmpty(property?.lockInPeriod);
//   const hasCapex = Object.values(capexData).some((v) => !isEmpty(v));
//   const hasRevenue = Object.values(revenueStreams).some((v) => !isEmpty(v));
//   const hasScenarios = Object.values(scenarios).some((v) => !isEmpty(v));
//   const allEmpty = !hasOverview && !hasCapex && !hasRevenue && !hasScenarios;

//   // Tabs that actually have content
//   const availableTabs = [
//     hasOverview && { id: "overview", label: "Overview" },
//     hasCapex && { id: "capex", label: "Capital Expenditure" },
//     hasRevenue && { id: "revenue", label: "Revenue Streams" },
//     hasScenarios && { id: "scenarios", label: "Return Scenarios" },
//   ].filter(Boolean);

//   // -------- Hooks (must be unconditional) --------
//   const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || "overview");

//   // Keep activeTab valid when data shape changes
//   useEffect(() => {
//     if (!availableTabs.find((t) => t.id === activeTab)) {
//       setActiveTab(availableTabs[0]?.id || "overview");
//     }
//   }, [availableTabs, activeTab]);

//   if (allEmpty) return null;

//   // -------- Build cards (equal height within each section) --------
//   const overviewMinH = 220;
//   const revenueMinH = 220;
//   const capexMinH = 220;
//   const scenarioMinH = 240;

//   const overviewCards = [];
//   if (!isEmpty(property?.startingInvestment)) {
//     overviewCards.push(
//       <div key="start" className={cardBase(overviewMinH)}>
//         <div>
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <DollarSign className="w-5 h-5 text-green-400" />
//             Total Investment
//           </h3>
//           <div className="text-3xl font-bold text-green-400 mb-2">
//             ${toNumber(property.startingInvestment).toLocaleString()}
//           </div>
//         </div>
//         <div className="text-white/60">Starting from</div>
//       </div>
//     );
//   }
//   if (!isEmpty(property?.roiRange)) {
//     const [beforePercent, afterPercent] = String(property.roiRange).split("%", 2);
//     overviewCards.push(
//       <div key="roi" className={cardBase(overviewMinH)}>
//         <div>
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-yellow-400" />
//             Expected Returns
//           </h3>
//           <div className="text-3xl font-bold text-yellow-400 mb-1">{beforePercent}%</div>
//           {!!afterPercent && (
//             <div className="text-xs italic text-white/70 mb-2">({afterPercent.trim()})</div>
//           )}
//         </div>
//         <div className="text-white/60">Annual yield</div>
//       </div>
//     );
//   }
//   if (!isEmpty(property?.lockInPeriod)) {
//     overviewCards.push(
//       <div key="term" className={cardBase(overviewMinH)}>
//         <div>
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <Clock className="w-5 h-5 text-blue-400" />
//             Investment Term
//           </h3>
//           <div className="text-3xl font-bold text-blue-400 mb-2">{property.lockInPeriod}</div>
//         </div>
//         <div className="text-white/60">Years</div>
//       </div>
//     );
//   }

//   const revenueCards = Object.entries(revenueStreams)
//     .filter(([, v]) => !isEmpty(v))
//     .map(([k, v]) => (
//       <div key={k} className={cardBase(revenueMinH)}>
//         <div>
//           <h4 className="font-semibold mb-2 capitalize">{k}</h4>
//           <div className="text-2xl font-bold text-green-400">
//             ${toNumber(v).toLocaleString()}
//           </div>
//         </div>
//         <div className="text-white/60 text-sm">Monthly</div>
//       </div>
//     ));

//   const capexCards = Object.entries(capexData)
//     .filter(([, v]) => !isEmpty(v))
//     .map(([k, v]) => (
//       <div key={k} className={cardBase(capexMinH)}>
//         <div>
//           <h4 className="font-semibold mb-2 capitalize">{k}</h4>
//           <div className="text-2xl font-bold text-yellow-400">{toNumber(v)}%</div>
//           <div className="w-full bg-white/10 rounded-full h-2 mt-3">
//             <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${toNumber(v)}%` }} />
//           </div>
//         </div>
//         <div className="text-white/60 text-sm">Allocation</div>
//       </div>
//     ));

//   const scenarioCards = Object.entries(scenarios)
//     .filter(([, v]) => !isEmpty(v))
//     .map(([k, v]) => (
//       <div key={k} className={cardBase(scenarioMinH)}>
//         <div className="text-center">
//           <h4 className="text-lg font-semibold mb-4 capitalize">{k} Case</h4>
//           <div className="text-4xl font-bold text-yellow-400 mb-2">{toNumber(v)}%</div>
//         </div>
//         <div className="text-white/60 text-center">Annual Return</div>
//       </div>
//     ));

//   // Tabs (recomputed after we know which sections have content)
//   const tabs = [
//     hasOverview && { id: "overview", label: "Overview" },
//     hasCapex && { id: "capex", label: "Capital Expenditure" },
//     hasRevenue && { id: "revenue", label: "Revenue Streams" },
//     hasScenarios && { id: "scenarios", label: "Return Scenarios" },
//   ].filter(Boolean);

//   return (
//     <section className="py-20 bg-black">
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Financial Overview</h2>
//           <p className="text-white/70 text-lg max-w-2xl mx-auto">
//             Comprehensive breakdown of investment structure and projected returns
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center mb-12">
//           <div className="bg-white/5 rounded-lg p-1 border border-white/10">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 rounded-md transition-colors ${
//                   activeTab === tab.id
//                     ? "bg-yellow-500 text-black font-medium"
//                     : "text-white/70 hover:text-white hover:bg-white/10"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="max-w-6xl mx-auto">
//           {/* OVERVIEW: 1–4 -> single row; >4 -> 4 per row, wrap. Equal heights. */}
//           {activeTab === "overview" && hasOverview && (
//             <GridFour min={260}>{overviewCards}</GridFour>
//           )}

//           {/* CAPEX */}
//           {activeTab === "capex" && hasCapex && <GridFour min={260}>{capexCards}</GridFour>}

//           {/* REVENUE */}
//           {activeTab === "revenue" && hasRevenue && (
//             <GridFour min={260}>{revenueCards}</GridFour>
//           )}

//           {/* SCENARIOS */}
//           {activeTab === "scenarios" && hasScenarios && (
//             <GridFour min={260}>{scenarioCards}</GridFour>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useMemo, useState, useEffect } from "react";
import { TrendingUp, Clock, DollarSign } from "lucide-react";

/** ---------- helpers ---------- */
/** Coerce value to number (handles "1,200", " 300 "). Returns NaN if not numeric. */
const toNumber = (v) => {
  if (v == null) return NaN;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const s = v.replace(/,/g, "").trim();
    if (s === "") return NaN;
    return Number(s);
  }
  return NaN;
};

/** Empty if null/undefined, "", 0, "0", "0.00", etc. */
const isEmpty = (v) => {
  if (v == null) return true;
  if (typeof v === "string") {
    const s = v.trim();
    if (s === "") return true;
    const n = toNumber(s);
    if (!Number.isNaN(n) && n === 0) return true;
    return false;
  }
  if (typeof v === "number") return v === 0;
  return false;
};

/** Normalize the period found after '/' to a nice label */
const normalizePeriod = (raw = "") => {
  const s = raw.toLowerCase().trim();
  if (!s) return ""; // unknown
  if (s.startsWith("mo") || s.startsWith("mon") || s.startsWith("month")) return "Monthly";
  if (s.startsWith("yr") || s.startsWith("year") || s.startsWith("annum") || s.startsWith("pa")) return "Yearly";
  return s.charAt(0).toUpperCase() + s.slice(1); // best-effort
};

/** Parse amount/range and period from strings like "~$500–1,000/year net" or "$40,000/year" */
const parseRevenue = (input) => {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!s) return null;

  const parts = s.split("/");
  const amountPart = (parts[0] ?? "").trim(); // "~$500–1,000"
  const periodPart = (parts[1] ?? "").trim(); // "year net" -> "year"

  // period = first word after '/'
  const periodWord = periodPart.split(/\s+/)[0] || "";
  const period = normalizePeriod(periodWord);

  const hasDollar = /\$/.test(amountPart);

  // Clean leading ~, ≈, about, etc.
  const cleaned = amountPart.replace(/^[~≈\s]+/, "");

  // Split range by hyphen/en dash
  const rangeSep = cleaned.includes("–") ? "–" : (cleaned.includes("-") ? "-" : null);

  const cleanNum = (chunk) =>
    chunk
      .replace(/[^\d.,]/g, "") // keep digits, dots, commas
      .replace(/,/g, "")
      .trim();

  let isRange = false, min = NaN, max = NaN, amount = NaN;

  if (rangeSep) {
    const [left, right] = cleaned.split(rangeSep, 2);
    const leftN = Number(cleanNum(left));
    const rightN = Number(cleanNum(right));
    if (!Number.isNaN(leftN) && !Number.isNaN(rightN)) {
      isRange = true;
      min = Math.min(leftN, rightN);
      max = Math.max(leftN, rightN);
    } else if (!Number.isNaN(leftN)) {
      amount = leftN;
    }
  } else {
    const single = Number(cleanNum(cleaned));
    if (!Number.isNaN(single)) amount = single;
  }

  return {
    hasDollar,
    period,             // "Monthly" | "Yearly" | ""
    isRange,
    min: isRange ? min : null,
    max: isRange ? max : null,
    amount: !isRange ? amount : null,
  };
};

/** Grid that:
 *  - If 1–4 items: makes exactly N columns (single row, centered).
 *  - If >4 items: locks to 4 columns and wraps to additional rows.
 *  Equal height via children having h-full, and grid items stretched.
 */
function GridFour({ children, min = 260 }) {
  const items = React.Children.toArray(children);
  const count = items.length;
  const cols = Math.min(4, Math.max(1, count)); // 1..4

  return (
    <div
      className="grid gap-6 justify-center items-stretch"
      style={{
        gridTemplateColumns:
          count <= 4
            ? `repeat(${cols}, minmax(${min}px, 1fr))`
            : `repeat(4, minmax(${min}px, 1fr))`,
      }}
    >
      {items}
    </div>
  );
}

/** Card base with equal heights in a section */
const cardBase = (minH = 220) =>
  `bg-white/5 rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between min-h-[${minH}px]`;

/** ---------- your component (only the revenue section changed) ---------- */
export default function Financials({ property }) {
  const capexData = useMemo(
    () => ({
      land: property?.capexLand,
      build: property?.capexBuild,
      gpus: property?.capexGPU,
      setup: property?.capexSetup,
    }),
    [property]
  );

  const revenueStreams = useMemo(
    () => ({
      rent: property?.revenueStreamsRent,   // e.g. "$40,000/year net"
      gpus: property?.revenueStreamsGPUs,   // e.g. "~$1,000/year"
      btc:  property?.revenueStreamsBTC,    // e.g. "~$4,000/year"
      agro: property?.revenueStreamsAgro,   // e.g. "~$500–1,000/year"
    }),
    [property]
  );

  const scenarios = useMemo(
    () => ({
      conservative: property?.scenarioConservative,
      base: property?.scenarioBase,
      aggressive: property?.scenarioAggressive,
    }),
    [property]
  );

  const hasOverview =
    !isEmpty(property?.startingInvestment) ||
    !isEmpty(property?.roiRange) ||
    !isEmpty(property?.lockInPeriod);
  const hasCapex = Object.values(capexData).some((v) => !isEmpty(v));
  const hasRevenue = Object.values(revenueStreams).some((v) => !isEmpty(v));
  const hasScenarios = Object.values(scenarios).some((v) => !isEmpty(v));
  const allEmpty = !hasOverview && !hasCapex && !hasRevenue && !hasScenarios;

  const availableTabs = [
    hasOverview && { id: "overview", label: "Overview" },
    hasCapex && { id: "capex", label: "Capital Expenditure" },
    hasRevenue && { id: "revenue", label: "Revenue Streams" },
    hasScenarios && { id: "scenarios", label: "Return Scenarios" },
  ].filter(Boolean);

  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || "overview");

  useEffect(() => {
    if (!availableTabs.find((t) => t.id === activeTab)) {
      setActiveTab(availableTabs[0]?.id || "overview");
    }
  }, [availableTabs, activeTab]);

  if (allEmpty) return null;

  const overviewMinH = 220;
  const revenueMinH = 220;
  const capexMinH = 220;
  const scenarioMinH = 240;

  // ----- overview cards (unchanged from your version) -----
  const overviewCards = [];
  if (!isEmpty(property?.startingInvestment)) {
    overviewCards.push(
      <div key="start" className={cardBase(overviewMinH)}>
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Total Investment
          </h3>
          <div className="text-3xl font-bold text-green-400 mb-2">
            ${toNumber(property.startingInvestment).toLocaleString()}
          </div>
        </div>
        <div className="text-white/60">Starting from</div>
      </div>
    );
  }
  if (!isEmpty(property?.roiRange)) {
    const [beforePercent, afterPercent] = String(property.roiRange).split("%", 2);
    overviewCards.push(
      <div key="roi" className={cardBase(overviewMinH)}>
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            Expected Returns
          </h3>
          <div className="text-3xl font-bold text-yellow-400 mb-1">{beforePercent}%</div>
          {!!afterPercent && (
            <div className="text-xs italic text-white/70 mb-2">({afterPercent.trim()})</div>
          )}
        </div>
        <div className="text-white/60">Annual yield</div>
      </div>
    );
  }
  if (!isEmpty(property?.lockInPeriod)) {
    overviewCards.push(
      <div key="term" className={cardBase(overviewMinH)}>
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Investment Term
          </h3>
          <div className="text-3xl font-bold text-blue-400 mb-2">{property.lockInPeriod}</div>
        </div>
        <div className="text-white/60">Years</div>
      </div>
    );
  }

  // ----- revenue cards (PARSED) -----
  const revenueCards = Object.entries(revenueStreams)
    .filter(([, v]) => !isEmpty(v))
    .map(([k, v]) => {
      const parsed = parseRevenue(String(v));
      if (!parsed) return null;

      const { hasDollar, period, isRange, min, max, amount } = parsed;

      const prefix = hasDollar ? "$" : ""; // show $ only if present in original
      const valueText = isRange
        ? `${prefix}${Number(min).toLocaleString()}–${Number(max).toLocaleString()}`
        : `${prefix}${Number(amount).toLocaleString()}`;

      const subtitle = period || "—";

      return (
        <div key={k} className={cardBase(revenueMinH)}>
          <div>
            <h4 className="font-semibold mb-2 capitalize">{k}</h4>
            <div className="text-2xl font-bold text-green-400">{valueText}</div>
          </div>
          <div className="text-white/60 text-sm">{subtitle}</div>
        </div>
      );
    });

  // ----- capex cards (unchanged) -----
  const capexCards = Object.entries(capexData)
    .filter(([, v]) => !isEmpty(v))
    .map(([k, v]) => (
      <div key={k} className={cardBase(capexMinH)}>
        <div>
          <h4 className="font-semibold mb-2 capitalize">{k}</h4>
          <div className="text-2xl font-bold text-yellow-400">{toNumber(v)}%</div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-3">
            <div className="h-2 rounded-full bg-yellow-400" style={{ width: `${toNumber(v)}%` }} />
          </div>
        </div>
        <div className="text-white/60 text-sm">Allocation</div>
      </div>
    ));

  // ----- scenario cards (unchanged) -----
  const scenarioCards = Object.entries(scenarios)
    .filter(([, v]) => !isEmpty(v))
    .map(([k, v]) => (
      <div key={k} className={cardBase(scenarioMinH)}>
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4 capitalize">{k} Case</h4>
          <div className="text-4xl font-bold text-yellow-400 mb-2">{toNumber(v)}%</div>
        </div>
        <div className="text-white/60 text-center">Annual Return</div>
      </div>
    ));

  const tabs = [
    hasOverview && { id: "overview", label: "Overview" },
    hasCapex && { id: "capex", label: "Capital Expenditure" },
    hasRevenue && { id: "revenue", label: "Revenue Streams" },
    hasScenarios && { id: "scenarios", label: "Return Scenarios" },
  ].filter(Boolean);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Financial Overview</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Comprehensive breakdown of investment structure and projected returns
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 rounded-lg p-1 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-yellow-500 text-black font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "overview" && hasOverview && <GridFour min={260}>{overviewCards}</GridFour>}
          {activeTab === "capex" && hasCapex && <GridFour min={260}>{capexCards}</GridFour>}
          {activeTab === "revenue" && hasRevenue && <GridFour min={260}>{revenueCards}</GridFour>}
          {activeTab === "scenarios" && hasScenarios && (
            <GridFour min={260}>{scenarioCards}</GridFour>
          )}
        </div>
      </div>
    </section>
  );
}
