import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, RefreshCw, TrendingDown, FileText, Truck, Calendar, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the volume chart with correct pallet categories
const volumeData = [
  { name: '4840 Grade A', volume: 450 },
  { name: '4840 Grade B', volume: 280 },
  { name: 'Custom', volume: 170 },
  { name: '42x42', volume: 120 },
  { name: '48x40 GMA HT', volume: 200 },
];

// Sample locations
const locations = [
  { id: 1, name: 'Atlanta Warehouse' },
  { id: 2, name: 'Chicago Distribution' },
  { id: 3, name: 'LA Fulfillment' }
];

export default function InteractiveDemo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('weekly');
  const [selectedLocation, setSelectedLocation] = useState('1');
  const [orderForm, setOrderForm] = useState({
    type: '4840-grade-a',
    length: '',
    width: '',
    height: '',
    monthlyQuantity: ''
  });

  const handleOrderSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Order Submitted!",
        description: `Quote request for ${orderForm.monthlyQuantity} ${orderForm.type} pallets per month has been sent.`,
      });
    }, 1000);
  };

  return (
    <section id="demo" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Experience Our Procurement Portal
        </h2>
        <p className="text-lg text-gray-600">
          Try our streamlined ordering system and analytics dashboard
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Form */}
        <Card className="p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-6">Request Pallet Quote</h3>
          <div className="space-y-4">
            <div>
              <Label>Pallet Type</Label>
              <Select 
                defaultValue={orderForm.type}
                onValueChange={(value) => setOrderForm({...orderForm, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4840-grade-a">4840 Grade A</SelectItem>
                  <SelectItem value="4840-grade-b">4840 Grade B</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="42x42">42x42</SelectItem>
                  <SelectItem value="48x40-gma-ht">48x40 GMA Heat Treated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Length (inches)</Label>
                <Input 
                  type="number" 
                  value={orderForm.length}
                  onChange={(e) => setOrderForm({...orderForm, length: e.target.value})}
                />
              </div>
              <div>
                <Label>Width (inches)</Label>
                <Input 
                  type="number"
                  value={orderForm.width}
                  onChange={(e) => setOrderForm({...orderForm, width: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Height (inches)</Label>
                <Input 
                  type="number"
                  value={orderForm.height}
                  onChange={(e) => setOrderForm({...orderForm, height: e.target.value})}
                />
              </div>
              <div>
                <Label>Monthly Quantity</Label>
                <Input 
                  type="number"
                  value={orderForm.monthlyQuantity}
                  onChange={(e) => setOrderForm({...orderForm, monthlyQuantity: e.target.value})}
                />
              </div>
            </div>

            <Button 
              className="w-full button-hover" 
              disabled={loading}
              onClick={handleOrderSubmit}
            >
              <Package className="mr-2 h-5 w-5 icon-hover" />
              Submit Quote Request
            </Button>
          </div>
        </Card>

        {/* Analytics Dashboard */}
        <Card className="p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold">Volume Analytics</h3>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80} 
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#415a77" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Monthly Volume</p>
                <p className="text-2xl font-bold text-primary">1,220 Pallets</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-green-600">$12,450</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}