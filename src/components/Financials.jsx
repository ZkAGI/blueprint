import { useMemo, useState, useEffect } from "react";
import { TrendingUp, Clock, DollarSign, BarChart3, Eye, EyeOff } from "lucide-react";

/** Coerce value to number (handles "1,200", " 300 ", numbers). Returns NaN if not numeric. */
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

export default function Financials({ property }) {
  // -------- Build raw data (no hooks) --------
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
      rent: property?.revenueStreamsRent,
      gpus: property?.revenueStreamsGPUs,
      btc: property?.revenueStreamsBTC,
      agro: property?.revenueStreamsAgro,
      // if you add more keys in the future, they'll be handled automatically
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

  // Availability flags per segment
  const hasOverview =
    !isEmpty(property?.startingInvestment) ||
    !isEmpty(property?.roiRange) ||
    !isEmpty(property?.lockInPeriod);

  const hasCapex = Object.values(capexData).some((v) => !isEmpty(v));
  const hasRevenue = Object.values(revenueStreams).some((v) => !isEmpty(v));
  const hasScenarios = Object.values(scenarios).some((v) => !isEmpty(v));

  const allEmpty = !hasOverview && !hasCapex && !hasRevenue && !hasScenarios;

  // Tabs that actually have content
  const availableTabs = [
    hasOverview && { id: "overview", label: "Overview" },
    hasCapex && { id: "capex", label: "Capital Expenditure" },
    hasRevenue && { id: "revenue", label: "Revenue Streams" },
    hasScenarios && { id: "scenarios", label: "Return Scenarios" },
  ].filter(Boolean);

  // -------- Hooks (must be unconditional) --------
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || "overview");
  const [showSensitive, setShowSensitive] = useState(false);

  // Keep activeTab valid when data shape changes
  useEffect(() => {
    if (!availableTabs.find((t) => t.id === activeTab)) {
      setActiveTab(availableTabs[0]?.id || "overview");
    }
  }, [availableTabs, activeTab]);

  // Auto-open sensitive view when switching to a tab that needs it and has data
  useEffect(() => {
    if ((activeTab === "capex" && hasCapex) || (activeTab === "revenue" && hasRevenue)) {
      setShowSensitive(true);
    }
  }, [activeTab, hasCapex, hasRevenue]);

  const canToggleSensitive = hasCapex || hasRevenue;

  // Early return AFTER hooks (to satisfy hooks rules)
  if (allEmpty) return null;

  // -------- Helpers for centered layouts --------

  // Generic centered wrap (flex) for variable counts — used by Overview/Capex/Scenarios
  const CenterWrap = ({ children }) => (
    <div className="flex flex-wrap justify-center gap-6">
      {children.map((child, i) => (
        <div key={i} className="w-full sm:w-[280px] md:w-[300px] lg:w-[320px]">
          {child}
        </div>
      ))}
    </div>
  );

  /**
   * RowOrWrap:
   * - If itemCount ≤ singleRowMax: force a single centered row by making exactly N columns.
   * - If itemCount > singleRowMax: wrap, still centered.
   * Perfect for Revenue Streams where you want 1-line for up to 4 items.
   */
  const RowOrWrap = ({ children, singleRowMax = 4, min = 260, max = 340 }) => {
    const count = children.length;
    if (count <= singleRowMax) {
      // Single centered row, each column flexes to fit; caps width for nice card sizes
      return (
        <div
          className="grid gap-6 justify-center"
          style={{
            gridTemplateColumns: `repeat(${count || 1}, minmax(${min}px, ${max}px))`,
          }}
        >
          {children}
        </div>
      );
    }
    // More than max → wrap centered with consistent card width
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {children.map((child, i) => (
          <div key={i} className="w-full sm:w-[280px] md:w-[300px] lg:w-[320px]">
            {child}
          </div>
        ))}
      </div>
    );
  };

  // Build overview cards dynamically
  const overviewCards = [];
  if (!isEmpty(property?.startingInvestment)) {
    overviewCards.push(
      <div key="start" className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          Total Investment
        </h3>
        <div className="text-3xl font-bold text-green-400 mb-2">
          ${toNumber(property.startingInvestment).toLocaleString()}
        </div>
        <div className="text-white/60">Starting from</div>
      </div>
    );
  }
  if (!isEmpty(property?.roiRange)) {
    overviewCards.push(
      <div key="roi" className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          Expected Returns
        </h3>
        <div className="text-3xl font-bold text-yellow-400 mb-2">{property.roiRange}</div>
        <div className="text-white/60">Annual yield</div>
      </div>
    );
  }
  if (!isEmpty(property?.lockInPeriod)) {
    overviewCards.push(
      <div key="term" className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Investment Term
        </h3>
        <div className="text-3xl font-bold text-blue-400 mb-2">{property.lockInPeriod}</div>
        <div className="text-white/60">Years</div>
      </div>
    );
  }

  // Build revenue cards once so we can count them
  const revenueCards = Object.entries(revenueStreams)
    .filter(([, v]) => !isEmpty(v))
    .map(([k, v]) => (
      <div key={k} className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h4 className="font-semibold mb-2 capitalize">{k}</h4>
        <div className="text-2xl font-bold text-green-400">${toNumber(v).toLocaleString()}</div>
        <div className="text-white/60 text-sm">Monthly</div>
      </div>
    ));

  // Build capex cards
  const capexCards = Object.entries(capexData)
    .filter(([, v]) => !isEmpty(v))
    .map(([k, v]) => (
      <div key={k} className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h4 className="font-semibold mb-2 capitalize">{k}</h4>
        <div className="text-2xl font-bold text-yellow-400">{toNumber(v)}%</div>
        <div className="w-full bg-white/10 rounded-full h-2 mt-3">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: `${toNumber(v)}%` }}
          />
        </div>
      </div>
    ));

  // Build scenarios cards
  const scenarioCards = Object.entries(scenarios)
    .filter(([, v]) => !isEmpty(v))
    .map(([k, v]) => (
      <div key={k} className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
        <h4 className="text-lg font-semibold mb-4 capitalize">{k} Case</h4>
        <div className="text-4xl font-bold text-yellow-400 mb-2">{toNumber(v)}%</div>
        <div className="text-white/60">Annual Return</div>
      </div>
    ));

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Heading + Toggle */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Financial Overview</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Comprehensive breakdown of investment structure and projected returns
          </p>

          {canToggleSensitive && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setShowSensitive((v) => !v)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSensitive ? "Hide" : "Show"} Detailed Financials
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 rounded-lg p-1 border border-white/10">
            {availableTabs.map((tab) => (
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
          {/* OVERVIEW (centered flex wrap) */}
          {activeTab === "overview" && hasOverview && <CenterWrap>{overviewCards}</CenterWrap>}

          {/* CAPEX (centered flex wrap) */}
          {activeTab === "capex" && hasCapex && showSensitive && (
            <CenterWrap>{capexCards}</CenterWrap>
          )}

          {/* REVENUE:
              - if ≤ 4 items → always a single centered row
              - if > 4 items → wrap, still centered */}
          {activeTab === "revenue" && hasRevenue && showSensitive && (
            <RowOrWrap singleRowMax={4}>{revenueCards}</RowOrWrap>
          )}

          {/* SCENARIOS (centered flex wrap) */}
          {activeTab === "scenarios" && hasScenarios && (
            <CenterWrap>{scenarioCards}</CenterWrap>
          )}

          {/* Reveal CTA only if there's hidden detail to show */}
          {!showSensitive &&
            (activeTab === "capex" || activeTab === "revenue") &&
            (hasCapex || hasRevenue) && (
              <div className="text-center py-16">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-white/30" />
                <h3 className="text-xl font-bold mb-2">Detailed Financials Available</h3>
                <p className="text-white/60 mb-6">
                  Access comprehensive financial breakdowns and projections
                </p>
                <button
                  onClick={() => setShowSensitive(true)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  View Financial Details
                </button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
