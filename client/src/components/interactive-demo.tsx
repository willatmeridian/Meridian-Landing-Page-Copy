import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, RefreshCw, TrendingDown, FileText, Truck } from "lucide-react";

export default function InteractiveDemo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const messages = {
        buy: "Order submitted! You'll receive competitive quotes from our network shortly.",
        swap: "Swap request sent! Our team will coordinate the trailer exchange.",
        report: "Market report generated! In 2022/23, pallet prices dropped 80% - our clients saved significantly.",
      };
      toast({
        title: "Success!",
        description: messages[action as keyof typeof messages],
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
          See how our digital-first approach streamlines your purchasing process
        </p>
      </div>

      <Card className="bg-white p-8 transition-all duration-300 hover:shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <p className="text-gray-600">Last 6 months: 500 pallets purchased</p>
              <p className="text-green-600 flex items-center mt-2">
                <TrendingDown className="h-4 w-4 mr-1" />
                50% cost reduction achieved
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <h3 className="font-semibold mb-2">Supply Chain Status</h3>
              <div className="space-y-2">
                <p className="text-gray-600 flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  2 backup vendors ready
                </p>
                <p className="text-gray-600">24/7 support available</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full h-12 button-hover" 
              disabled={loading}
              onClick={() => handleAction("buy")}
            >
              <Package className="mr-2 h-5 w-5 icon-hover" />
              Request Pallet Quotes
            </Button>

            <Button 
              className="w-full h-12 button-hover" 
              variant="outline"
              disabled={loading}
              onClick={() => handleAction("swap")}
            >
              <RefreshCw className="mr-2 h-5 w-5 icon-hover" />
              Request Trailer Swap
            </Button>

            <Button 
              className="w-full h-12 button-hover" 
              variant="secondary"
              disabled={loading}
              onClick={() => handleAction("report")}
            >
              <FileText className="mr-2 h-5 w-5 icon-hover" />
              View Market Report
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}