import Hero from "@/components/hero";
import AffiliateNetwork from "@/components/affiliate-network";
import HowItWorks from "@/components/how-it-works";
import InteractiveDemo from "@/components/interactive-demo";
import CoreBenefits from "@/components/core-benefits";
import ProcurementMetrics from "@/components/procurement-metrics";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-8 space-y-24">
        <AffiliateNetwork />
        <CoreBenefits />
        <ProcurementMetrics />
        <HowItWorks />
        <InteractiveDemo />
      </main>
    </div>
  );
}