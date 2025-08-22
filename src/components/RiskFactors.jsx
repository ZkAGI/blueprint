import { useState } from "react";
import { Shield, Users, ExternalLink, AlertTriangle,  BarChart3 } from "lucide-react";

export default function RiskFactors({ property }) {
  const [expandedRisk, setExpandedRisk] = useState(null);

  const risks = [
    {
      id: 'currency',
      title: 'Currency Risk',
      level: 'Medium',
      description: property?.currencyRisk || 'Exposure to foreign exchange fluctuations may impact returns',
      mitigation: 'Hedging strategies and multi-currency diversification'
    },
    {
      id: 'seasonality', 
      title: 'Seasonality Risk',
      level: 'Low',
      description: property?.seasonalityRisk || 'Tourism and occupancy patterns may vary seasonally',
      mitigation: 'Diversified revenue streams including AI compute and agriculture'
    },
    {
      id: 'regulatory',
      title: 'Regulatory Risk',
      level: 'Medium',
      description: 'Changes in local property or crypto regulations may affect operations',
      mitigation: 'Legal compliance monitoring and adaptive business model'
    },
    {
      id: 'market',
      title: 'Market Risk',
      level: 'Medium', 
      description: 'General market conditions may impact property values and rental yields',
      mitigation: 'Long-term investment horizon and diversified asset portfolio'
    }
  ];

  const mitigations = [
    {
      title: 'Insurance Coverage',
      description: property?.mitigationInsurance || 'Comprehensive property and business insurance',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Diversified Revenue',
      description: property?.mitigationDiversifiedRevenue || 'Multiple income streams reduce dependency',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: 'Professional Management',
      description: 'Experienced team with local market expertise',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Exit Flexibility',
      description: 'Multiple exit options available for liquidity',
      icon: <ExternalLink className="w-5 h-5" />
    }
  ];

  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'High': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Risk Assessment</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Transparent risk disclosure with comprehensive mitigation strategies
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Risk Factors */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                Risk Factors
              </h3>
              
              <div className="space-y-4">
                {risks.map((risk) => (
                  <div key={risk.id} className="bg-white/5 rounded-xl border border-white/10">
                    <button
                      onClick={() => setExpandedRisk(expandedRisk === risk.id ? null : risk.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{risk.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.level)}`}>
                          {risk.level}
                        </span>
                      </div>
                      <span className="text-white/60">
                        {expandedRisk === risk.id ? '−' : '+'}
                      </span>
                    </button>
                    
                    {expandedRisk === risk.id && (
                      <div className="p-4 border-t border-white/10">
                        <p className="text-white/80 mb-3">{risk.description}</p>
                        <div className="text-sm">
                          <span className="text-green-400 font-medium">Mitigation: </span>
                          <span className="text-white/70">{risk.mitigation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Strategies */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-500" />
                Mitigation Strategies
              </h3>
              
              <div className="space-y-4">
                {mitigations.map((mitigation, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="text-green-400 mt-1">{mitigation.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{mitigation.title}</h4>
                        <p className="text-white/70 text-sm">{mitigation.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
