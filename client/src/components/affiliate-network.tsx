import { Card } from "@/components/ui/card";
import { TrendingUp, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from 'react';
import Map from './map';

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

interface Location {
  latitude: number;
  longitude: number;
  name?: string;
}

export default function AffiliateNetwork() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        console.log('Loaded locations:', data.length);
        setLocations(data);
      } catch (error) {
        console.error('Error loading locations:', error);
      }
    };

    fetchLocations();
  }, []);
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
        <div className="relative w-full aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden mb-8">
          {typeof window !== 'undefined' ? <Map /> : null}
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