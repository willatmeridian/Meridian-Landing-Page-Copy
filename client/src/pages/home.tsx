import Hero from "@/components/hero";
import AffiliateNetwork from "@/components/affiliate-network";
import HowItWorks from "@/components/how-it-works";
import InteractiveDemo from "@/components/interactive-demo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-8 space-y-24">
        <AffiliateNetwork />
        <HowItWorks />
        <InteractiveDemo />
      </main>
    </div>
  );
}
