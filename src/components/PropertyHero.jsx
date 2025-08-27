import React, { useState } from "react";


import ProxyImage from "./ProxyImage";

// 1. PROPERTY HERO SECTION
export default function PropertyHero({ property, onViewDetails }) {
  const [imageError, setImageError] = useState(false);
  
  const heroImage = property?.coverImage || property?.mainImage || 
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
       <ProxyImage
  src={heroImage}
  alt={property?.projectTitle}
  className="w-full h-full object-cover opacity-75"
/>

        <div className="absolute inset-0 " />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#4ebcf2]">
          {property?.projectTitle}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8">
          AI + Real Estate + Passive Income
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            {property?.location}
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            {property?.propertyType}
          </span>
          <span className="bg-[#4ebcf2]/20 backdrop-blur-sm px-4 py-2 rounded-full text-[#4ebcf2]">
            From ${property?.startingInvestment?.toLocaleString()}
          </span>
        </div>
        <button  onClick={onViewDetails} className="bg-[#4ebcf2] hover:bg-[#af89fb]/20 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors">
          View Investment Details
        </button>
      </div>
    </section>
  );
}