import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, RefreshCw, TrendingDown, FileText, Truck, Calendar, MapPin, BarChart4 } from "lucide-react";
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
    <section id="demo" className="py-12 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Interactive Demo Portal
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience our procurement platform with real-time data and ordering capabilities
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Volume Analytics */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BarChart4 className="h-5 w-5" />
              Volume Analytics
            </h3>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded">
              <TrendingDown className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-medium">Cost Down 35%</p>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <Truck className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="text-sm font-medium">On-Time 98%</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <Calendar className="h-5 w-5 text-orange-600 mx-auto mb-1" />
              <p className="text-sm font-medium">Lead Time 3d</p>
            </div>
          </div>
        </Card>

        {/* Order Form */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Request Quote
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Delivery Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {location.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Pallet Type</Label>
              <Select value={orderForm.type} onValueChange={(value) => setOrderForm({...orderForm, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4840-grade-a">4840 Grade A</SelectItem>
                  <SelectItem value="4840-grade-b">4840 Grade B</SelectItem>
                  <SelectItem value="custom">Custom Size</SelectItem>
                  <SelectItem value="42x42">42x42</SelectItem>
                  <SelectItem value="48x40-gma-ht">48x40 GMA HT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="length">Length (in)</Label>
                <Input
                  id="length"
                  value={orderForm.length}
                  onChange={(e) => setOrderForm({...orderForm, length: e.target.value})}
                  placeholder="48"
                />
              </div>
              <div>
                <Label htmlFor="width">Width (in)</Label>
                <Input
                  id="width"
                  value={orderForm.width}
                  onChange={(e) => setOrderForm({...orderForm, width: e.target.value})}
                  placeholder="40"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (in)</Label>
                <Input
                  id="height"
                  value={orderForm.height}
                  onChange={(e) => setOrderForm({...orderForm, height: e.target.value})}
                  placeholder="6"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quantity">Monthly Quantity</Label>
              <Input
                id="quantity"
                value={orderForm.monthlyQuantity}
                onChange={(e) => setOrderForm({...orderForm, monthlyQuantity: e.target.value})}
                placeholder="1000"
              />
            </div>

            <Button 
              onClick={handleOrderSubmit} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <FileText className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Processing...' : 'Get Quote'}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}