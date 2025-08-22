export default function ExitLiquidity({ property }) {
  const exitOptions = [
    {
      title: "Secondary Market",
      timeline: "Anytime after 12 months",
      description: "Trade your investment with other qualified investors"
    },
    {
      title: "Buyback Program", 
      timeline: "After 3 years",
      description: "Aten Ventures buyback option at fair market value"
    },
    {
      title: "Property Sale",
      timeline: "5-7 years",
      description: "Full exit upon property sale or portfolio liquidation"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Exit & Liquidity</h2>
          <p className="text-white/70 text-lg">Multiple exit pathways designed for investor flexibility</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {exitOptions.map((option, index) => (
            <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-2">{option.title}</h3>
              <div className="text-yellow-400 font-medium mb-3">{option.timeline}</div>
              <p className="text-white/70 text-sm">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}