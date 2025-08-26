import React from "react";
import { DollarSign, PiggyBank, Maximize, Crown } from "lucide-react";

/** ---------- local helpers ---------- */
const num = (v) => {
  const n = Number(String(v ?? "").replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const money = (v) => {
  const n = num(v);
  return Number.isFinite(n) ? `$${n.toLocaleString()}` : "—";
};

export default function InvestmentSummaryCards({
  property = {},
  className = "",
  // You can override these via props; otherwise we read from `property` and then fall back to sensible defaults
  poolSize: poolSizeProp,
  minSharesPerInvestor: minSharesProp,
  maxSharesPerInvestor: maxSharesProp,
  maxInvestorPercent: maxPercentProp,
}) {
  // ---- configurable (with fallbacks)
  const poolSize =
    Number(poolSizeProp ?? property.poolSize) > 0 ? Number(poolSizeProp ?? property.poolSize) : 100;

  const minSharesPerInvestor =
    Number(minSharesProp ?? property.minSharesPerInvestor) > 0
      ? Number(minSharesProp ?? property.minSharesPerInvestor)
      : 1;

  // either explicit max shares, or cap via percent, or no cap (poolSize)
  const maxSharesPerInvestor =
    Number(maxSharesProp ?? property.maxSharesPerInvestor) > 0
      ? Number(maxSharesProp ?? property.maxSharesPerInvestor)
      : (Number(maxPercentProp ?? property.maxInvestorPercent) > 0
          ? Math.max(
              1,
              Math.floor(
                (Number(maxPercentProp ?? property.maxInvestorPercent) / 100) * poolSize
              )
            )
          : poolSize);

  // ---- inputs
  const perShare = num(property?.startingInvestment); // “startingInvestment” = price per share
  const explicitTotal = num(property?.totalPropertyValue);

  const totalPropertyValue =
    Number.isFinite(explicitTotal)
      ? explicitTotal
      : (Number.isFinite(perShare) ? perShare * poolSize : null);

  // ---- derived
  const minInvestment = Number.isFinite(perShare)
    ? perShare * Math.max(1, minSharesPerInvestor)
    : null;

  const cappedShares = Math.min(poolSize, Math.max(1, maxSharesPerInvestor));
  const maxInvestmentPerInvestor = Number.isFinite(perShare)
    ? perShare * cappedShares
    : (Number.isFinite(totalPropertyValue)
        ? Math.round((cappedShares / poolSize) * totalPropertyValue)
        : null);

  // Build cards conditionally (only render what we can compute)
  const items = [];

  if (Number.isFinite(perShare)) {
    items.push({
      key: "start",
      icon: <DollarSign className="w-5 h-5 text-green-400" />,
      title: "Starting Investment / Investor",
      value: money(perShare),
      sub: "Per share",
      color: "text-green-400",
    });
  }

  if (Number.isFinite(minInvestment)) {
    items.push({
      key: "min",
      icon: <PiggyBank className="w-5 h-5 text-yellow-400" />,
      title: "Minimum Investment",
      value: money(minInvestment),
      sub: `${Math.max(1, minSharesPerInvestor)} of ${poolSize} shares`,
      color: "text-yellow-400",
    });
  }

  if (Number.isFinite(maxInvestmentPerInvestor)) {
    items.push({
      key: "max-per",
      icon: <Maximize className="w-5 h-5 text-cyan-400" />,
      title: "Max Investment (Per Investor)",
      value: money(maxInvestmentPerInvestor),
      sub: `Up to ${cappedShares} shares (${Math.round((cappedShares / poolSize) * 100)}% of pool)`,
      color: "text-cyan-400",
    });
  }

  if (Number.isFinite(totalPropertyValue)) {
    items.push({
      key: "max-total",
      icon: <Crown className="w-5 h-5 text-purple-400" />,
      title: "Max Investment (Buy Entire Property)",
      value: money(totalPropertyValue),
      sub: "100% of pool (1 party owner)",
      color: "text-purple-400",
    });
  }

  if (!items.length) return null;

  return (
    <section className={`py-6 sm:py-8 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div
            key={it.key}
            className="bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                {it.icon}
                {it.title}
              </h3>
              <div className={`text-2xl sm:text-3xl font-bold ${it.color} mb-1 sm:mb-2`}>
                {it.value}
              </div>
            </div>
            <div className="text-white/60 text-sm">{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
