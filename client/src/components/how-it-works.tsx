import { Card } from "@/components/ui/card";
import { Search, Shield, Handshake } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Scout Vendors",
    description: "We locate vendors near you for optimal proximity and pricing"
  },
  {
    icon: Shield,
    title: "Secure Backup",
    description: "We establish backup vendors for emergency situations"
  },
  {
    icon: Handshake,
    title: "Negotiate Terms",
    description: "We align vendor bids with your payment terms"
  }
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600">
          Our simple three-step process ensures reliable procurement
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="p-6 text-center card-hover">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4 icon-hover">
              <step.icon className="h-6 w-6 text-primary transition-colors duration-200" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}