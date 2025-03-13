import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, RefreshCw } from "lucide-react";

export default function InteractiveDemo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: action === "buy" 
          ? "Order submitted successfully!" 
          : "Swap request sent successfully!",
      });
    }, 1000);
  };

  return (
    <section id="demo" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Try Our Demo Portal
        </h2>
        <p className="text-lg text-gray-600">
          Experience how easy procurement can be
        </p>
      </div>

      <Card className="bg-white p-8 transition-all duration-300 hover:shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <p className="text-gray-600">Last 6 months: 500 pallets purchased</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <h3 className="font-semibold mb-2">Active Orders</h3>
              <p className="text-gray-600">2 orders in progress</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full h-12 button-hover" 
              disabled={loading}
              onClick={() => handleAction("buy")}
            >
              <Package className="mr-2 h-5 w-5 icon-hover" />
              Buy Pallets
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
          </div>
        </div>
      </Card>
    </section>
  );
}