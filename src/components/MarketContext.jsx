import { BarChart3, TrendingUp, Plane, Cpu, DollarSign } from "lucide-react";

export default function MarketContext({ property }) {
  const marketStats = [
    {
      label: "Occupancy rate",
      value: property?.occupancyRate,
      subtitle: "Annual visitors",
      trend: "+12%",
      icon: <Plane className="w-6 h-6" />
    },
    {
      label: "ADR Comps",
      value: property?.adrComps,
      subtitle: "Average daily rate",
      trend: "+8%",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      label: "BTC Hash Price",
      value: property?.btcHashPrice,
      subtitle: "Per TH/s/day",
      trend: "+15%",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      label: "AI Compute Rates",
      value: property?.aiComputeRates,
      subtitle: "Per GPU hour",
      trend: "+22%",
      icon: <Cpu className="w-6 h-6" />
    }
  ];

  // Filter out null/empty values
  const nonEmptyStats = marketStats.filter(stat => stat.value !== null && stat.value !== undefined && stat.value !== "");

  // If ALL are empty, don’t render anything
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {nonEmptyStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-yellow-500">{stat.icon}</div>
                <h3 className="font-semibold">{stat.label}</h3>
              </div>

              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm mb-3">{stat.subtitle}</div>

              {stat.trend && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{stat.trend}</span>
                  <span className="text-white/60 text-sm">YoY</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Market Analysis Chart Placeholder */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold mb-6 text-center">Market Performance Trends</h3>
            <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <div className="text-center text-white/60">
                <BarChart3 className="w-12 h-12 mx-auto mb-3" />
                <p>Interactive market charts available in full report</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
