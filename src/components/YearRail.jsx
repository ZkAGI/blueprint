import React from 'react';

const YEAR_COPY = {
  2015: {
    title: 'Origins in Academia and VR',
    body:
      'Studied under Prof. Steve Lavelle; co-led a VR lab at IIT Madras. TA under Prof. Lui Sha (UIUC), focusing on real-time embedded systems.',
  },
  2016: {
    title: 'Robotics & Augmented Intelligence',
    body:
      'Built autonomous robot with Google Tango LiDAR; began Ethereum journey; AR interfaces at Mitsubishi Electric Automotive America.',
  },
  2017: {
    title: 'Systems Engineering & Crypto',
    body:
      'Systems engineering at a cybersecurity startup; active altcoin investor—learned crypto volatility firsthand.',
  },
  2018: {
    title: 'Aten Ventures Is Born',
    body:
      'Formed Aten Ventures LLC (USA); launched remote-first consulting/tech agency serving startups & institutions.',
  },
  2019: {
    title: 'Global Client Work & Alliances',
    body:
      'Served clients across Chicago/SV/NY; deep collaboration with Tektorch AI for APAC enterprise AI.',
  },
  2020: {
    title: 'Enterprise Tech Facilitation',
    body:
      'Launched Bitbaza (B2B deep-tech marketplace); facilitated $500K+ in high-ticket deals.',
  },
  2021: {
    title: 'Product Pivot & AI Infra',
    body:
      'After 50+ enterprise interviews, Bitbaza pivoted to scalable AI product; invested in AI infra; incorporated in Singapore.',
  },
  2022: {
    title: 'Bootstrapped Scaling & Web3',
    body:
      'Bitbaza profitable; $1M+ in value delivered; growing Web3 & mid-market adoption.',
  },
  2023: {
    title: 'Agent Marketplace & Recognition',
    body:
      'Launched agent marketplace; EngageX adopted by 20+ Web3 projects; recognized by Startup Lithuania; refocused on infra.',
  },
  2024: {
    title: 'ZkAGI Is Born',
    body:
      'Raised $500K+; launched ZkAGI DePIN cluster & ZkTerminal; 100K+ users; MoUs unlocking reach to 1M+ entrepreneurs; 100+ partnerships.',
  },
  2025: {
    title: 'Recognition & Global Influence',
    body:
      '#3 in Solana AI Hackathon (AI Infra). Re-centered on enabling AI-first enterprises with product+capital+advisory.',
  },
};

export default function YearRail({
  years = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
  className = '',
  dashClass = 'bg-white/60',
  padX = 'px-6',
}) {
  return (
    <div className={`w-full ${padX} ${className}`} style={{ paddingTop: '40px' }}>
      <div className="flex items-center w-full overflow-visible">
        {years.map((year, i) => (
          <React.Fragment key={year}>
            {/* Year + tooltip */}
            <div className="relative group">
              <span
                className="text-white whitespace-nowrap tracking-wide cursor-pointer hover:text-cyan-300 transition-colors duration-200"
                style={{ fontSize: 'clamp(12px, 1.4vw, 16px)', letterSpacing: '0.02em' }}
              >
                {year}
              </span>

              {/* Tooltip */}
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <div className="w-[450px] max-w-[90vw] rounded-xl border border-cyan-400/30 bg-slate-900/95 backdrop-blur-sm p-5 shadow-2xl">
                  <div className="text-cyan-300 text-sm font-semibold mb-2">{YEAR_COPY[year]?.title}</div>
                  <div className="text-gray-200 text-xs leading-relaxed">{YEAR_COPY[year]?.body}</div>
                  
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Single dash BETWEEN items only */}
            {i < years.length - 1 && (
              <div
                className={`mx-4 h-px ${dashClass}`}
                style={{
                  width: 'clamp(28px, 6.5vw, 110px)',
                  opacity: 0.7,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}