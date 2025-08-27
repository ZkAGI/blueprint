import { useState } from "react";
import { CheckCircle, Users, Shield } from "lucide-react";

export default function OwnershipModel({ property }) {
  const [selectedTier, setSelectedTier] = useState('basic');

  const ownershipStructure = {
    structure: property?.ownershipStructure || "SPV (Special Purpose Vehicle)",
    paymentTerms: property?.paymentTerms || "Monthly subscription model",
    managementFee: property?.managementFee || 2,
    currency: property?.currency || "USD"
  };

  const tiers = [
    {
      name: "Basic",
      price: "$199",
      features: ["10 Page Blueprint", "+ Community Access"],
      highlight: false,
      checkoutUrl:"https://buy.stripe.com/28E28k4HA8zq7EYaDs18c01"
    },
    {
      name: "Standard", 
      price: "$997",
      features: ["Full ROI + Legal", "Structure Pack"],
      highlight: true,
      checkoutUrl:"https://buy.stripe.com/eVq5kw4HA2b2bVeh1Q18c02"
    },
    {
      name: "Premium",
      price: "$2,997", 
      features: ["+ 1-on-1 Strategy Call"],
      highlight: false,
      checkoutUrl:"https://buy.stripe.com/9B69AM4HAbLC4sMaDs18c03"
    }
  ];

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Ownership Model</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Transparent structure designed for flexible participation and growth
          </p>
        </div>

        {/* Ownership Structure */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Structure
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Legal Structure</div>
                  <div className="text-white/70">{ownershipStructure.structure}</div>
                </div>
                <div>
                  <div className="font-medium">Payment Model</div>
                  <div className="text-white/70">{ownershipStructure.paymentTerms}</div>
                </div>
                <div>
                  <div className="font-medium">Management Fee <span className="text-[10px] italic text-gray-300">(For passive income generation)</span></div>
                  <div className="text-white/70">{ownershipStructure.managementFee}% rev share</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Investor Rights
              </h3>
              <ul className="space-y-2">
                {[
                  'Profit sharing based on investment size',
                  'Quarterly financial reporting',
                  'Voting rights on major decisions',
                  'Exit liquidity options',
                  'Asset transparency guarantee'
                ].map((right, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Tiers */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Blueprint Tiers</h3>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
  {tiers.map((tier, i) => (
    <div
      key={i}
      className={`relative flex flex-col h-full rounded-2xl p-8 text-center border-2 ${
        tier.highlight
          ? "border-[#af89fb] bg-yellow-500/10"
          : "border-white/20 bg-white/5"
      }`}
    >
      {tier.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#af89fb] text-black px-4 py-1 rounded-full text-sm font-bold">
          POPULAR
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
      <div className="text-4xl font-bold mb-6">{tier.price}</div>

      {/* content area – can vary in height */}
      <div className="space-y-3 mb-8">
        {tier.features.map((feature, j) => (
          <div key={j} className="text-white/80">{feature}</div>
        ))}
      </div>

      {/* push button to bottom */}
      <div className="mt-auto">
        <button
          onClick={() => (window.location.href = tier.checkoutUrl)}
          className={`w-full py-3 rounded-lg font-bold transition-colors ${
            tier.highlight
              ? "bg-[#af89fb] hover:bg-[#af89fb]/20 text-white"
              : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </section>
  );
}