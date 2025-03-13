import { Card } from "@/components/ui/card";
import { TrendingUp, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Group Purchasing Power",
    description: "Access favorable pricing through our nationwide network of suppliers"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Consistent quality and service across all locations"
  },
  {
    icon: Truck,
    title: "Local Market Access",
    description: "Key partnerships with local suppliers for optimal proximity"
  }
];

export default function AffiliateNetwork() {
  return (
    <section id="network" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Nationwide Network
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tap into Meridian's network of 2900+ partners for unbeatable pricing and reliability. Our network spans across all 50 states, ensuring you get the best rates and service wherever you are.
        </p>
      </div>

      <Card className="bg-white p-8">
        <div className="relative w-full aspect-[3/2] bg-gray-100 rounded-lg flex items-center justify-center mb-8">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-400">U.S. Map</p>
            <p className="text-gray-400">Coming Soon</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center card-hover p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4 icon-hover">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}