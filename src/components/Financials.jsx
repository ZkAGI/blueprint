
import { useState } from "react";
import {  TrendingUp, Clock, DollarSign,  BarChart3, Eye, EyeOff } from "lucide-react";

export default function Financials({ property }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSensitive, setShowSensitive] = useState(false);

  // Parse financial data from property
  const capexData = {
    land: property?.capexLand || 40,
    build: property?.capexBuild || 35,
    gpus: property?.capexGPU || 15,
    setup: property?.capexSetup || 10
  };

  const opexData = {
    electricity: property?.opexElectricity || 5000,
    management: property?.opexMGMT || 3000,
    upkeep: property?.opexUpkeep || 2000
  };

  const revenueStreams = {
    rent: property?.revenueStreamsRent || 15000,
    gpus: property?.revenueStreamsGPUs || 8000,
    btc: property?.revenueStreamsBTC || 5000,
    agro: property?.revenueStreamsAgro || 2000
  };

  const scenarios = {
    conservative: property?.scenarioConservative || 18,
    base: property?.scenarioBase || 24,
    aggressive: property?.scenarioAggressive || 32
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'capex', label: 'Capital Expenditure' },
    { id: 'revenue', label: 'Revenue Streams' },
    { id: 'scenarios', label: 'Return Scenarios' }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Financial Overview</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Comprehensive breakdown of investment structure and projected returns
          </p>
          
          {/* Sensitive Data Toggle */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setShowSensitive(!showSensitive)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showSensitive ? 'Hide' : 'Show'} Detailed Financials
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 rounded-lg p-1 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-black font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Total Investment
                </h3>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  ${property?.startingInvestment?.toLocaleString()}
                </div>
                <div className="text-white/60">Starting from</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Expected Returns
                </h3>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {property?.roiRange}
                </div>
                <div className="text-white/60">Annual yield</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Investment Term
                </h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {property?.lockInPeriod || '3-5'}
                </div>
                <div className="text-white/60">Years</div>
              </div>
            </div>
          )}

          {activeTab === 'capex' && showSensitive && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(capexData).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="font-semibold mb-2 capitalize">{key}</h4>
                  <div className="text-2xl font-bold text-yellow-400">{value}%</div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'revenue' && showSensitive && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(revenueStreams).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="font-semibold mb-2 capitalize">{key}</h4>
                  <div className="text-2xl font-bold text-green-400">
                    ${value?.toLocaleString()}
                  </div>
                  <div className="text-white/60 text-sm">Monthly</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'scenarios' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(scenarios).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
                  <h4 className="text-lg font-semibold mb-4 capitalize">{key} Case</h4>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{value}%</div>
                  <div className="text-white/60">Annual Return</div>
                </div>
              ))}
            </div>
          )}

          {!showSensitive && (activeTab === 'capex' || activeTab === 'revenue') && (
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