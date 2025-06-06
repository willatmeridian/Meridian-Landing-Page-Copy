import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Market trend data showing pallet price changes
const marketTrendData = [
  { month: 'Jan', price: 100 },
  { month: 'Feb', price: 95 },
  { month: 'Mar', price: 85 },
  { month: 'Apr', price: 60 },
  { month: 'May', price: 40 },
  { month: 'Jun', price: 20 },
];

// Cost comparison data for different pallet types
const savingsData = [
  { category: 'Pallets', baseline: 100, optimized: 50 },
  { category: 'Packaging', baseline: 100, optimized: 65 },
  { category: 'Logistics', baseline: 100, optimized: 55 },
];

// Vendor performance metrics
const vendorMetrics = [
  { name: 'Quality', score: 95 },
  { name: 'Delivery', score: 92 },
  { name: 'Price', score: 88 },
  { name: 'Support', score: 96 },
];

export default function ProcurementMetrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="metrics" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Real-Time Procurement Insights
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track market trends, cost savings, and vendor performance with our advanced analytics
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className={`p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-xl font-semibold mb-4">Market Price Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#415a77" 
                  fill="#778da9" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={`p-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-xl font-semibold mb-4">Cost Optimization</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="baseline" fill="#1b263b" animationDuration={1500} />
                <Bar dataKey="optimized" fill="#e1c16e" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={`p-6 md:col-span-2 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-xl font-semibold mb-4">Vendor Performance Metrics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vendorMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#415a77" 
                  strokeWidth={2}
                  dot={{ fill: '#e1c16e' }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}