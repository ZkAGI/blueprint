import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Share2, Heart } from "lucide-react";

// Import all your existing section components
import PropertyHero from "../components/PropertyHero";
import ExecutiveSnapshot from "../components/ExecutiveSnapshot";
import VisualShowcase from "../components/VisualShowcase";
import MarketContext from "../components/MarketContext";
import Financials from "../components/Financials";
import OwnershipModel from "../components/OwnershipModel";
import ManagementFees from "../components/ManagementFees";
import ExitLiquidity from "../components/ExitLiquidity";
import RiskFactors from "../components/RiskFactors";
import ClosingCTA from "../components/ClosingCTA";

// Header component for the property page
function PropertyHeader({ property, onBack }) {
  console.log('propert',property)
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{property?.projectTitle}</h1>
            <p className="text-sm text-white/60">{property?.location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

// Main Property Detail Page Component
export default function PropertyDetailPage() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // React Router hooks - FIXED routing approach
  const { slug } = useParams(); // Get slug from URL path
  const [searchParams] = useSearchParams(); // Get query parameters  
  const navigate = useNavigate(); // For navigation

  // Get property ID from query params - this is the correct approach
  const propertyId = searchParams.get('id');

  useEffect(() => {
    if (propertyId !== null) {
      fetchPropertyDetails(propertyId);
    } else {
      setError("Property ID not found in URL");
      setLoading(false);
    }
  }, [propertyId]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      // Use your existing API endpoint that returns all listings
      const response = await fetch("https://zynapse.zkagi.ai/listings", {
        headers: {
          "Content-Type": "application/json",
          "api-key": "zk-123321",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const allListings = await response.json();
      
      // Find the property by index (propertyId is the index)
      const foundProperty = Array.isArray(allListings) 
        ? allListings[parseInt(propertyId)]
        : null;
        
      if (!foundProperty) {
        throw new Error(`Property not found at index ${propertyId}`);
      }
      
      setProperty(foundProperty);
    } catch (err) {
      setError(err.message || "Failed to fetch property details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page using React Router
  };

  const handleShare = () => {
    // Share current URL
    if (navigator.share) {
      navigator.share({
        title: property?.projectTitle,
        text: property?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/80 text-xl">Loading property details...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Property Not Found</h2>
          <p className="text-white/70 mb-6">{error || "The requested property could not be found."}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Go Back
            </button>
            <button 
              onClick={() => navigate('/ecoluxury/listings')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors"
            >
              View All Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <PropertyHeader property={property} onBack={handleBack} />
      
      <main className="pb-20">
        {/* 1. Hero Section */}
        <PropertyHero property={property} />
        
        {/* 2. Executive Snapshot */}
        <ExecutiveSnapshot property={property} />
        
        {/* 3. Visual Showcase */}
        <VisualShowcase property={property} />
        
        {/* 4. Market Context */}
        <MarketContext property={property} />
        
        {/* 5. Financials */}
        <Financials property={property} />
        
        {/* 6. Ownership Model */}
        <OwnershipModel property={property} />
        

        
        {/* 8. Exit & Liquidity */}
        <ExitLiquidity property={property} />
        
        {/* 9. Risk Factors */}
        <RiskFactors property={property} />
        
       
      </main>
    </div>
  );
}