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
      id: 'basic',
      name: 'Basic Investor',
      minInvestment: 300,
      features: ['Quarterly reports', 'Basic dashboard access', 'Email support'],
      color: 'bg-blue-500'
    },
    {
      id: 'premium',
      name: 'Premium Investor', 
      minInvestment: 5000,
      features: ['Monthly reports', 'Advanced analytics', 'Priority support', 'Voting rights'],
      color: 'bg-yellow-500'
    },
    {
      id: 'elite',
      name: 'Elite Investor',
      minInvestment: 25000,
      features: ['Weekly reports', 'Direct manager access', 'Site visits', 'Strategic input'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-black">
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
                  <div className="font-medium">Management Fee</div>
                  <div className="text-white/70">{ownershipStructure.managementFee}% annually</div>
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
          <h3 className="text-2xl font-bold text-center mb-8">Investment Tiers</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                  selectedTier === tier.id 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    ${tier.minInvestment.toLocaleString()}
                  </div>
                  <div className="text-white/60">Minimum investment</div>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 rounded-lg transition-colors">
                  Select {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}