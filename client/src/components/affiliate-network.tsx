import { Card } from "@/components/ui/card";

export default function AffiliateNetwork() {
  return (
    <section id="network" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Nationwide Network
        </h2>
        <p className="text-lg text-gray-600">
          Tap into Meridian's network of 2900+ partners for unbeatable pricing and reliability
        </p>
      </div>

      <Card className="bg-white p-8">
        <div className="relative w-full aspect-[3/2] bg-gray-100 rounded-lg flex items-center justify-center mb-8">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-400">U.S. Map</p>
            <p className="text-gray-400">Coming Soon</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">2900+</h3>
            <p className="text-gray-600">Affiliate Partners</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">50</h3>
            <p className="text-gray-600">States Covered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>
      </Card>
    </section>
  );
}