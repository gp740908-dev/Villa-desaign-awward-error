
import React from 'react';
import { VILLAS } from '../constants';
import { Link } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';

export const LocationsMap: React.FC = () => {
  // Central Ubud Embed URL
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63140.79634289832!2d115.23439034999999!3d-8.5068536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d706e409da7%3A0x3030bfbcaf77320!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid";

  return (
    <section className="py-24 bg-cream-50 px-6 border-b border-emerald-900/5">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <span className="block font-script text-4xl text-emerald-600 mb-4">Our Locations</span>
            <h2 className="font-serif text-5xl md:text-6xl text-emerald-900 leading-tight">
                Sanctuaries Hidden<br/>in Nature
            </h2>
        </div>

        {/* Map Container - Height is explicit */}
        <div className="w-full h-[600px] rounded-sm overflow-hidden shadow-[0_30px_60px_-15px_rgba(5,100,8,0.1)] border border-emerald-900/10 relative z-0 bg-emerald-900/5 group">
            
            {/* 1. Google Maps Embed Iframe */}
            <iframe 
                src={googleMapsEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.3] contrast-[1.1] opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                title="Ubud Locations Map"
            ></iframe>

            {/* 2. Interactive Overlay Card (Desktop) */}
            <div className="hidden lg:block absolute top-6 left-6 w-80 bg-cream-100/90 backdrop-blur-md border border-emerald-900/10 shadow-xl rounded-sm p-6 z-10">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-900/60 font-bold">Featured Estates</span>
                </div>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    {VILLAS.map((villa) => (
                        <div key={villa.id} className="group/item flex items-start space-x-3 border-b border-emerald-900/5 pb-3 last:border-0 hover:bg-emerald-900/5 p-2 rounded-sm transition-colors cursor-pointer">
                            <div className="mt-1 text-emerald-900">
                                <MapPin size={14} />
                            </div>
                            <div>
                                <h4 className="font-serif text-emerald-900 leading-none mb-1">{villa.name}</h4>
                                <p className="text-[10px] uppercase tracking-widest text-emerald-900/50 mb-2">{villa.location}</p>
                                <Link to={`/villas/${villa.id}`} className="text-xs text-emerald-700 font-bold underline decoration-emerald-900/20 hover:text-emerald-900">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Decoration Overlay (Top Right) */}
            <div className="absolute top-6 right-6 z-[400] bg-cream-100/90 backdrop-blur border border-emerald-900/10 px-4 py-3 rounded-sm shadow-sm pointer-events-none">
                <div className="flex items-center space-x-2">
                    <Navigation className="text-emerald-900" size={14} />
                    <span className="font-serif text-xs text-emerald-900">Ubud, Bali</span>
                </div>
            </div>

        </div>

        {/* Mobile List View (Below Map) */}
        <div className="lg:hidden mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             {VILLAS.map((villa) => (
                <Link key={villa.id} to={`/villas/${villa.id}`} className="bg-white p-4 rounded-sm border border-emerald-900/5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                        <MapPin size={16} className="text-emerald-800" />
                        <div>
                            <h4 className="font-serif text-emerald-900 leading-none">{villa.name}</h4>
                            <span className="text-[10px] uppercase tracking-widest text-emerald-900/50">{villa.location}</span>
                        </div>
                    </div>
                </Link>
             ))}
        </div>

      </div>
    </section>
  );
};
