
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Upload } from "lucide-react";

type Address = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
};

export default function AddressMap() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Fetch addresses from the API
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/addresses');
        if (!response.ok) throw new Error('Failed to fetch addresses');
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast({
          title: "Error",
          description: "Failed to load address data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAddresses();
  }, [toast]);
  
  // Handle CSV file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      // Read the file contents
      const text = await file.text();
      
      // Send to the API
      const response = await fetch('/api/addresses/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvData: text }),
      });
      
      if (!response.ok) throw new Error('Failed to import CSV');
      
      toast({
        title: "Success",
        description: "Address data imported successfully",
      });
      
      // Refresh the address list
      const addressResponse = await fetch('/api/addresses');
      if (!addressResponse.ok) throw new Error('Failed to fetch addresses');
      const data = await addressResponse.json();
      setAddresses(data);
      
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast({
        title: "Error",
        description: "Failed to import address data",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      // Clear the file input
      event.target.value = '';
    }
  };
  
  return (
    <section id="address-map" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Location Coverage Map
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          View our service locations across the country
        </p>
        
        <div className="flex justify-center mb-8">
          <label className="inline-flex items-center justify-center gap-2 cursor-pointer">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Button variant="outline" disabled={uploading}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload CSV"}
            </Button>
          </label>
        </div>
      </div>
      
      <Card className="p-6 relative min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : addresses.length > 0 ? (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {addresses.map((address) => (
                <Card key={address.id} className="p-3 flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-gray-600">{address.address}</p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center">
              Note: This is showing the list view. For a full interactive map, you would need to integrate with a mapping API like Google Maps or Mapbox.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <MapPin className="h-12 w-12 mb-4 opacity-20" />
            <p>No address data available. Upload a CSV to get started.</p>
            <p className="text-sm mt-2">
              CSV should include columns: name, address, city, state, zip, lat, lng
            </p>
          </div>
        )}
      </Card>
    </section>
  );
}
