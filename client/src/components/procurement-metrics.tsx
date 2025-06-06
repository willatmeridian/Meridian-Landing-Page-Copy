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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Procurement Analytics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your savings and optimize your procurement strategy with real-time data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Market Trend Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Market Price Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Cost Savings Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Cost Optimization</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="baseline" fill="#ef4444" name="Baseline Cost" />
                  <Bar dataKey="optimized" fill="#22c55e" name="Optimized Cost" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Vendor Performance */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Vendor Performance Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vendorMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  fill="#2563eb" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}