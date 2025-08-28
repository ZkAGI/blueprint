import { MapPin, TrendingUp, Home, Clock, DollarSign, Shield } from "lucide-react";

export default function ExecutiveSnapshot({ property = {} }) {
  /** ---------- helpers ---------- */
  const formatRoi = (roi) => {
    if (!roi) return { main: "—", rest: "" };
    const i = roi.indexOf("%");
    if (i < 0) return { main: roi, rest: "" };
    return { main: roi.slice(0, i + 1).trim(), rest: roi.slice(i + 1).trim() };
  };

  /** ---------- inline details (override via props) ---------- */
  const projectedDetails = property.projectedSummary ?? [
    { label: "Net rental yield", value: "≈ 7.8%/yr" },
    { label: "5-yr total ROI", value: "≈ 46.5% (≈9.3% p.a.)" },
    { label: "5-yr resale price", value: "≈ $3.23M" },
    { label: "5-yr rental profit", value: "≈ $510k" },
  ];

  const managementDetails = property.managementSummary ?? [
    { label: "Mgmt fee", value: `${property.managementFee ?? 20}% of rental revenue` },
    { label: "OTA commission", value: "0%" },
    { label: "Corporate tax", value: "10%" },
    { label: "Fixed expenses", value: "$2,900 / yr" },
    { label: "Repair costs", value: "$2,223 / yr" },
  ];

  const lockDetails = property.lockSummary ?? [
    { label: "Leasehold", value: property.ownership || "100 years" },
    { label: "Entry", value: property.entryDate || "28 Aug 2025" },
    { label: "Completion", value: property.completionDate || "01 Dec 2027" },
    { label: "Payment plan", value: "Deposit + quarterly to Nov ’27" },
    { label: "Model exit", value: "5-year resale modeled" },
  ];

  /** ---------- data ---------- */
  const topRow = [
    {
      icon: <MapPin className="w-8 h-8" />,
      label: "Location",
      value: property.location || "Bali, Indonesia",
      subValue: property.country || "Indonesia",
    },
    {
      icon: <Home className="w-8 h-8" />,
      label: "Asset Type",
      value: property.propertyType || "Villa",
      subValue: "Eco-Luxury",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: "Entry Tickets",
      value:
        property.startingInvestment != null
          ? `$${Number(property.startingInvestment).toLocaleString()}`
          : "$25,000",
      subValue: "Minimum Investment",
    },
  ];

  const bottomRow = [
    {
      _type: "roi",
      icon: <TrendingUp className="w-8 h-8" />,
      label: "Projected Returns",
      value: property.roiRange || "7.8% rental, 9.3% resale.",
      subValue: "Annual Yield",
      details: projectedDetails,
    },
    {
      _type: "lock",
      icon: <Clock className="w-8 h-8" />,
      label: "Lock-in Period",
      value: property.lockInPeriod || "5 years",
      subValue: "Investment Term",
      details: lockDetails,
    },
    {
      _type: "mgmt",
      icon: <Shield className="w-8 h-8" />,
      label: "Management (For passive income generation)",
      value: "Aten Ventures",
      subValue: `${property.managementFee ?? 20}% rev share`,
      details: managementDetails,
    },
  ];

  /** ---------- tiny building blocks ---------- */
  const Card = ({ icon, label, children, minH = "min-h-[240px]" }) => (
    <div className="h-full">
      <div
        className={`bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all ${minH} h-full flex flex-col`}
      >
        <div className="text-yellow-500 mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-white/90 line-clamp-2">{label}</h3>
        {children}
        <div className="mt-auto" />
      </div>
    </div>
  );

  const DetailList = ({ items }) => (
    <ul className="mt-3 space-y-1.5 text-xs text-white/80">
      {items.map((pt, i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
        >
          <span className="opacity-70">{pt.label}</span>
          <span className="font-medium">{pt.value}</span>
        </li>
      ))}
    </ul>
  );

  /** ---------- UI ---------- */
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Executive Snapshot</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Key investment highlights and property fundamentals at a glance
          </p>
        </div>

        {/* Row 1: compact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {topRow.map((item, idx) => (
            <Card key={idx} icon={item.icon} label={item.label} minH="min-h-[240px]">
              <div className="text-2xl font-bold mb-1 break-words">{item.value}</div>
              <div className="text-sm text-white/60">{item.subValue}</div>
            </Card>
          ))}
        </div>

        {/* Row 2: detailed (taller) cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {bottomRow.map((item, idx) => {
            // ROI: 3 clean lines + inline detail list
            if (item._type === "roi") {
              const { main, rest } = formatRoi(item.value);
              return (
                <Card key={idx} icon={item.icon} label={<span className="inline-flex items-center gap-2">{item.label} </span>} minH="min-h-[340px]">
                  <div className="text-3xl font-extrabold mb-1 text-green-500">{main || "—"}</div>
                  {rest ? (
                    <div className="text-sm text-white/70 mb-1">{rest}</div>
                  ) : (
                    <div className="text-sm text-white/70 mb-1">&nbsp;</div>
                  )}
                  <div className="text-sm text-white/60">{item.subValue}</div>
                  <DetailList items={item.details} />
                  <div className="mt-2 text-[10px] leading-snug text-white/50">
                    Assumptions include mgmt/tax/fixed-expense deductions; resale at year 5. Indicative values.
                  </div>
                </Card>
              );
            }

            // Lock-in: headline + inline detail list
            if (item._type === "lock") {
              return (
                <Card key={idx} icon={item.icon} label={item.label} minH="min-h-[340px]">
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-white/60">{item.subValue}</div>
                  <DetailList items={item.details} />
                </Card>
              );
            }

            // Management: headline + inline detail list
            if (item._type === "mgmt") {
              return (
                <Card key={idx} icon={item.icon} label={item.label} minH="min-h-[340px]">
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-white/60">{item.subValue}</div>
                  <DetailList items={item.details} />
                </Card>
              );
            }

            return null;
          })}
        </div>

        {/* optional Google Map */}
        {property.googleMapEmbed && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Location</h3>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={property.googleMapEmbed}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
