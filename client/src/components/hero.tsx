import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-start max-w-3xl">
          <img 
            src="/attached_assets/Meridian Logo six.png" 
            alt="Meridian Logo" 
            className="h-16 mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your Supply Chain with{" "}
            <span className="text-primary">Meridian</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Reduce procurement costs and ensure dependable supply chains with our outsourced procurement service.
          </p>
          <Button className="h-12 px-6 text-lg" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
            Try Demo <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}