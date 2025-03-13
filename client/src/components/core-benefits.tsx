import { Card } from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  BarChart4,
  Search,
  Award
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Collective Buying Power",
    description: "Access competitive pricing through our extensive network, leveraging group purchasing for the best rates"
  },
  {
    icon: UserCheck,
    title: "Expert Guidance",
    description: "Our specialists guide you through supplier selection and quality assurance with personalized recommendations"
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Quarterly reviews help you save costs and gain competitive edge by staying ahead of market trends"
  },
  {
    icon: BarChart4,
    title: "Cost Optimization",
    description: "Our team identifies ways to reduce spend and enhance value, ensuring cost-effective procurement"
  },
  {
    icon: Search,
    title: "Simplified Sourcing",
    description: "Streamlined process guarantees competitive pricing, quality control, and proactive management"
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "Leverage our deep knowledge of the pallet and packaging landscape for optimal decisions"
  }
];

export default function CoreBenefits() {
  return (
    <section id="benefits" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Choose Meridian
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We simplify procurement with industry expertise, purchasing power, and cutting-edge insights. Our streamlined process ensures you get the best value and service.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="p-6 card-hover">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4 icon-hover">
              <benefit.icon className="h-6 w-6 text-primary transition-colors duration-200" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
