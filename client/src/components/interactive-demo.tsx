import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Building, Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InteractiveDemo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.company || !formData.phone || !formData.email || !formData.description) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit your request.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Contact Request Submitted!",
        description: "We'll get back to you within 24 hours to discuss your pallet procurement needs.",
      });
      // Reset form
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        description: ''
      });
    }, 1000);
  };

  return (
    <section id="demo" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get Started Today
        </h2>
        <p className="text-lg text-gray-600">
          Tell us about your pallet procurement needs and we'll connect you with the right suppliers
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8 transition-all duration-300 hover:shadow-xl">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input 
                  id="name"
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Smith"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <Label htmlFor="company" className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4" />
                  Company Name *
                </Label>
                <Input 
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Acme Corporation"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input 
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@company.com"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4" />
                Description of Needs *
              </Label>
              <Textarea 
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Please describe your pallet requirements, including quantities, dimensions, frequency, and any specific needs..."
                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Button 
              className="w-full button-hover py-3 text-lg" 
              disabled={loading}
              onClick={handleSubmit}
            >
              <Send className="mr-2 h-5 w-5 icon-hover" />
              {loading ? "Submitting..." : "Submit Contact Request"}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              * All fields are required. We'll respond within 24 hours.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}