import { CheckCircle } from "lucide-react";
export default function ManagementFees({ property }) {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Management & Fees</h2>
          <p className="text-white/70 text-lg">Professional management with transparent fee structure</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Aten Ventures Management</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Property acquisition & development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>AI infrastructure setup & monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Revenue optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Quarterly investor reporting</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Fee Structure</h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Management Fee</div>
                <div className="text-2xl font-bold text-yellow-400">{property?.managementFee || 2}%</div>
                <div className="text-white/60 text-sm">Annual fee on invested capital</div>
              </div>
              <div>
                <div className="font-medium">Performance Fee</div>
                <div className="text-lg">No performance fees</div>
                <div className="text-white/60 text-sm">100% of returns go to investors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}