import { MessageCircle, Mail, Calendar, Phone } from "lucide-react";
import { useState } from "react";

export default function ClosingCTA({ property }) {
  const [selectedAmount, setSelectedAmount] = useState(300);

  const investmentTiers = [300, 1000, 5000, 10000, 25000];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      value: "+65 9123 4567",
      action: "https://wa.me/6591234567"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "invest@atenventures.com", 
      action: "mailto:invest@atenventures.com"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Schedule Call",
      value: "Book consultation",
      action: "https://calendly.com/atenventures"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+65 6789 0123",
      action: "tel:+6567890123"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Invest?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Join exclusive eco-luxury investments with AI-powered returns. 
            Secure your position in {property?.projectTitle}.
          </p>
        </div>

        {/* Investment Amount Selector */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-center mb-8">Select Investment Amount</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {investmentTiers.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedAmount === amount
                      ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="font-bold">${amount.toLocaleString()}</div>
                  <div className="text-sm text-white/60">
                    {amount === 300 ? 'Starter' : 
                     amount === 5000 ? 'Premium' : 
                     amount === 25000 ? 'Elite' : 'Popular'}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center mb-8">
              <div className="text-lg text-white/70 mb-2">Your investment:</div>
              <div className="text-4xl font-bold text-yellow-400 mb-4">
                ${selectedAmount.toLocaleString()}
              </div>
              <div className="text-white/60">
                Projected annual return: {property?.roiRange || '18-24%'}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition-colors">
                Invest Now - ${selectedAmount.toLocaleString()}
              </button>
              <button className="border border-white/30 hover:border-white/50 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors">
                Download Full Prospectus
              </button>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Get In Touch</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all text-center"
              >
                <div className="text-yellow-500 mb-3 flex justify-center">{method.icon}</div>
                <div className="font-medium mb-1">{method.label}</div>
                <div className="text-white/70 text-sm">{method.value}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-white/60 text-sm">
              <strong>Investment Disclaimer:</strong> All investments carry risk. 
              Past performance does not guarantee future results. 
              Please review the full prospectus and consult with a financial advisor before investing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
