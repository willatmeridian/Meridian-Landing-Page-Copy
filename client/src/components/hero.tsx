import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-start max-w-3xl">
          <img 
            src="/meridian-logo.png"
            alt="Meridian Logo" 
            className="h-16 mb-8 transition-opacity duration-300 hover:opacity-90"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 transition-transform duration-300 hover:translate-x-2">
            Your Nationwide Procurement Partner with{" "}
            <span className="text-cta">2900+ Affiliates</span>
          </h1>
          <p className="text-xl text-neutral mb-8">
            Reduce procurement costs up to 50% and ensure dependable supply chains with our outsourced procurement service. Stay ahead with real-time market insights and group purchasing power.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-12 w-full">
            <div className="text-center">
              <p className="text-cta text-2xl font-bold">80%</p>
              <p className="text-neutral">Market Rate Savings</p>
            </div>
            <div className="text-center">
              <p className="text-cta text-2xl font-bold">24/7</p>
              <p className="text-neutral">Support Available</p>
            </div>
          </div>
          <Button 
            className="h-12 px-6 text-lg bg-cta hover:bg-cta-light text-navy button-hover"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started <ArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}