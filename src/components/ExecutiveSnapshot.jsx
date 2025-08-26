import { MapPin, TrendingUp, Home, Clock, DollarSign, Shield } from "lucide-react";

export default function ExecutiveSnapshot({ property }) {
  const snapshots = [
    {
      icon: <MapPin className="w-8 h-8" />,
      label: "Location",
      value: property?.location,
      subValue: property?.country
    },
    {
      icon: <Home className="w-8 h-8" />,
      label: "Asset Type",
      value: property?.propertyType,
      subValue: "Eco-Luxury"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: "Entry Tickets",
      value: `$${property?.startingInvestment?.toLocaleString()}`,
      subValue: "Minimum Investment"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      label: "Projected Returns",
      value: property?.roiRange,
      subValue: "Annual Yield"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      label: "Lock-in Period",
      value: property?.lockInPeriod || "3-5 years",
      subValue: "Investment Term"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      label: "Management (For passive income generation)",
      value: "Aten Ventures",
      subValue: `${property?.managementFee || 2}% rev share`
    }
  ];

  const formatRoi = (roi) => {
  if (!roi) return { main: "—", rest: "" };
  const i = roi.indexOf("%");
  if (i < 0) return { main: roi, rest: "" };

  return {
    main: roi.slice(0, i + 1).trim(),     // till %
    rest: roi.slice(i + 1).trim(),        // after %
  };
};

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Executive Snapshot</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Key investment highlights and property fundamentals at a glance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {snapshots.map((item, index) => {
  // Special case for ROI
  if (item.label === "Projected Returns") {
    const { main, rest } = formatRoi(item.value);
    return (
      <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
        <div className="text-yellow-500 mb-4">{item.icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-white/90">{item.label}</h3>
        <div className="text-2xl font-bold mb-1 text-green-500">{main}</div>
        {rest && <div className="text-xs italic text-white/60">{rest}</div>}
        <div className="text-sm text-white/60">{item.subValue}</div>
      </div>
    );
  }

  // Default render
  return (
    <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
      <div className="text-yellow-500 mb-4">{item.icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white/90">{item.label}</h3>
      <div className="text-2xl font-bold mb-1">{item.value}</div>
      <div className="text-sm text-white/60">{item.subValue}</div>
    </div>
  );
})}

        </div>

        {/* Google Map Embed */}
        {property?.googleMapEmbed && (
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
