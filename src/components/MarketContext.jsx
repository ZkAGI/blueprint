import { BarChart3, TrendingUp, Plane, Cpu, DollarSign } from "lucide-react";

/** truthy, non-empty helper */
const isNonEmpty = (v) => v !== null && v !== undefined && `${v}`.trim() !== "";

/** Split value for special labels:
 * - ADR Comps: keep up to "/night" as the main line; rest goes below
 * - AI Compute Rates: keep up to "GPU" as the main line; rest goes below
 */
const splitStatValue = (label, value) => {
  const raw = isNonEmpty(value) ? String(value) : "";
  if (!raw) return { main: "—", rest: "" };

  if (label === "ADR Comps" && raw.includes("/night")) {
    const [head, ...tail] = raw.split("/night");
    return { main: `${head.trim()}/night`, rest: tail.join("").trim() };
  }

  if (label === "AI Compute Rates" && /gpu/i.test(raw)) {
    const [head, ...tail] = raw.split(/gpu/i);
    return { main: `${head.trim()} GPU`, rest: tail.join("").trim() };
  }

  return { main: raw, rest: "" };
};

export default function MarketContext({ property }) {
  const marketStats = [
    {
      label: "Occupancy rate",
      value: property?.occupancyRate, // e.g. "72%"
      icon: <Plane className="w-6 h-6" />,
      trend: "+12%",
    },
    {
      label: "ADR Comps",
      value: property?.adrComps, // e.g. "$350/night (Top 10% comps)"
      icon: <DollarSign className="w-6 h-6" />,
      trend: "+8%",
    },
    {
      label: "BTC Hash Price",
      value: property?.btcHashPrice, // e.g. "$0.05 / TH/s / day"
      icon: <BarChart3 className="w-6 h-6" />,
      trend: "+15%",
    },
    {
      label: "AI Compute Rates",
      value: property?.aiComputeRates, // e.g. "$2.50 GPU hour (A100 spot)"
      icon: <Cpu className="w-6 h-6" />,
      trend: "+22%",
    },
  ];

  // keep only cards with real values
  const nonEmptyStats = marketStats.filter((s) => isNonEmpty(s.value));
  if (nonEmptyStats.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Market Context</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Key market indicators driving investment fundamentals and growth projections
          </p>
        </div>

        {/* Cards - always centered */}
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {nonEmptyStats.map((stat, i) => {
            const { main, rest } = splitStatValue(stat.label, stat.value);
            return (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all w-full sm:w-[300px] md:w-[280px] lg:w-[260px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-yellow-500">{stat.icon}</div>
                  <h3 className="font-semibold">{stat.label}</h3>
                </div>

                <div className="text-3xl font-bold mb-1">{main}</div>
                {rest && <div className="text-xs text-white/60 mb-3">{rest}</div>}

                {stat.trend && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{stat.trend}</span>
                    <span className="text-white/60 text-sm">YoY</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
