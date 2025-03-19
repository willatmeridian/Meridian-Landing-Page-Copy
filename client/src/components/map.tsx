import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface PalletCompany {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  address: string | null;
  zip: string | null;
  rating: number | null;
  reviewCount: number | null;
  website: string | null;
  matchStatus: string;
  verified: boolean;
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const customIconRef = useRef<L.Icon>(L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [12, 20],
    iconAnchor: [6, 20],
    popupAnchor: [1, -15],
    shadowSize: [24, 24]
  }));
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [palletCompanies, setPalletCompanies] = useState<PalletCompany[]>([]);
  const [showResponsiveOnly, setShowResponsiveOnly] = useState(false);
  const [visibleMarkers, setVisibleMarkers] = useState<PalletCompany[]>([]);

  const updateVisibleMarkers = useCallback((companies: PalletCompany[], filterResponsive: boolean) => {
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    const filtered = filterResponsive
      ? companies.filter(c => c.matchStatus === 'Company Match')
      : companies;

    setVisibleMarkers(filtered);

    filtered.forEach((company) => {
      const ratingStars = company.rating
        ? '⭐'.repeat(Math.round(company.rating))
        : '';

      let websiteUrl = company.website;
      if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) {
        websiteUrl = `https://${websiteUrl}`;
      }
      const websiteLink = websiteUrl
        ? `<a href="${websiteUrl}" target="_blank" class="text-blue-600 hover:underline">Visit Website</a>`
        : '';

      const popupContent = `
        <div class="min-w-[200px]">
          <h3 class="font-bold text-lg mb-1">${company.name}</h3>
          <p class="text-gray-600 mb-2">${company.address || ''}<br>${company.city}, ${company.state} ${company.zip || ''}</p>
          ${company.rating ? `
            <div class="mb-2">
              ${ratingStars} (${company.rating}/5)
              ${company.reviewCount ? `<br>${company.reviewCount} reviews` : ''}
            </div>
          ` : ''}
          ${websiteLink}
        </div>
      `;

      L.marker([company.latitude, company.longitude], { icon: customIconRef.current })
        .bindPopup(popupContent)
        .addTo(markersLayerRef.current!);
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map instance centered on US
    const mapInstance = L.map(mapRef.current, {
      center: [39.8283, -98.5795], // Center of US
      zoom: 4,
      minZoom: 3,
      maxZoom: 18,
      scrollWheelZoom: true,
      zoomControl: true
    });

    // Add tile layer with terrain view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      subdomains: 'abc',
    }).addTo(mapInstance);

    // Create a layer group for pallet company markers
    markersLayerRef.current = L.layerGroup().addTo(mapInstance);

    // Load pallet companies data
    fetch('/api/locations')
      .then(response => response.json())
      .then(data => {
        setPalletCompanies(data);
        updateVisibleMarkers(data, showResponsiveOnly);
      })
      .catch((error: Error) => console.error('Error loading pallet companies:', error));

    // Set bounds to continental US
    const usBounds = L.latLngBounds(
      L.latLng(24.396308, -125.000000), // Southwest corner
      L.latLng(49.384358, -66.934570)  // Northeast corner
    );
    mapInstance.setMaxBounds(usBounds.pad(0.1)); // Add 10% padding

    mapInstanceRef.current = mapInstance;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showResponsiveOnly, updateVisibleMarkers]);

  const handleSearch = useCallback(async () => {
    if (!address.trim() || !mapInstanceRef.current) return;

    setLoading(true);
    try {
      // Use Nominatim for geocoding (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=us`
      );
      const data = await response.json();

      if (data && data[0]) {
        const { lat, lon } = data[0];
        const coordinates: [number, number] = [parseFloat(lat), parseFloat(lon)];

        // Remove existing marker
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Add new marker
        markerRef.current = L.marker(coordinates)
          .addTo(mapInstanceRef.current)
          .bindPopup(data[0].display_name)
          .openPopup();

        // Pan to location
        mapInstanceRef.current.setView(coordinates, 12);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Effect to update markers when filter changes
  useEffect(() => {
    if (palletCompanies.length > 0) {
      updateVisibleMarkers(palletCompanies, showResponsiveOnly);
    }
  }, [showResponsiveOnly, palletCompanies, updateVisibleMarkers]);

  return (
    <div className="relative h-full w-full">
      <div 
        ref={mapRef} 
        className="h-full w-full rounded-lg overflow-hidden"
      />
      <div className="absolute top-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 flex flex-col gap-2 w-full max-w-lg z-[1000] bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200/50">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="responsiveFilter"
            checked={showResponsiveOnly}
            onChange={(e) => setShowResponsiveOnly(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="responsiveFilter" className="text-sm font-medium text-gray-700">
            Show Responsive Companies Only
          </label>
          <span className="ml-auto text-sm text-gray-500">
            Showing {visibleMarkers.length} locations
          </span>
        </div>
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Enter your facility's address to find local packaging partners"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pr-10 text-sm text-gray-900 placeholder:text-gray-500"
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !address.trim()}
            variant="default"
            size="icon"
            className="absolute right-0 top-0 bottom-0 rounded-l-none bg-primary hover:bg-primary/90"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
