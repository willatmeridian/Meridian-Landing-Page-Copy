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

// Sample data for the volume chart
const volumeData = [
  { name: 'Standard', volume: 450 },
  { name: 'Heavy Duty', volume: 280 },
  { name: 'Custom', volume: 170 },
  { name: 'Euro', volume: 120 },
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
    type: 'standard',
    length: '',
    width: '',
    height: '',
    quantity: ''
  });

  const handleOrderSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Order Submitted!",
        description: `Quote request for ${orderForm.quantity} ${orderForm.type} pallets has been sent.`,
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
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="heavy">Heavy Duty</SelectItem>
                  <SelectItem value="euro">Euro</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
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
                <Label>Quantity</Label>
                <Input 
                  type="number"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({...orderForm, quantity: e.target.value})}
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
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Volume Analytics</h3>
            <div className="flex gap-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
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
                <SelectTrigger className="w-[180px]">
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
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
                <p className="text-2xl font-bold text-primary">1,020 Pallets</p>
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