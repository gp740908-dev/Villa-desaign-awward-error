
import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { VILLAS } from '../constants';
import { MagneticButton } from './MagneticButton';
import { ArrowUpRight, BedDouble, Bath, Users, Square } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedVillas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(VILLAS[0].id);
  // Removed isAnimating state to allow rapid clicking
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeVilla = VILLAS.find((v) => v.id === activeTab) || VILLAS[0];

  // Handle Tab Change with Animation
  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    
    // Quick Exit Animation
    // We use overwrite: true to kill any existing animations on these elements immediately.
    // This prevents the 'isAnimating' blocker issue and allows the last click to win.
    const ctx = gsap.context(() => {
        gsap.to([".villa-content-anim", ".villa-img-reveal"], {
            opacity: 0,
            duration: 0.2, // Very fast exit
            ease: "power2.in",
            overwrite: true, // IMPORTANT: Kills previous tweens so onComplete of previous clicks won't fire
            onComplete: () => {
                setActiveTab(id);
                // The Enter animation will trigger via the useLayoutEffect below
            }
        });
    }, containerRef);
  };

  // Enter Animation (Triggers when activeTab changes)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Reset state for entry
        gsap.set(".villa-content-anim", { y: 20, opacity: 0 });
        // Reset images for entry: Ensure opacity is 1 (since we faded it out on exit) and set initial clipPath
        gsap.set(".villa-img-reveal", { opacity: 1, clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 });
        
        // Image Reveal (Clip Path)
        gsap.to(".villa-img-reveal", { 
            clipPath: "inset(0% 0% 0% 0%)", 
            scale: 1,
            duration: 0.8, // Snappy duration
            ease: "power4.out",
            stagger: 0.05
        });

        // Content Fade Up
        gsap.to(".villa-content-anim", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.1
        });

    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section ref={containerRef} className="py-32 bg-cream-50 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
            <span className="block font-script text-4xl text-emerald-600 mb-4">The Collection</span>
            <h2 className="font-serif text-5xl md:text-6xl text-emerald-900 leading-tight">
                Featured Residences
            </h2>
        </div>

        {/* --- TABS --- */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 border-b border-emerald-900/10 pb-6">
            {VILLAS.map((villa) => (
                <button
                    key={villa.id}
                    onClick={() => handleTabChange(villa.id)}
                    className={`relative pb-4 px-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                        activeTab === villa.id ? 'text-emerald-900' : 'text-emerald-900/40 hover:text-emerald-900'
                    }`}
                >
                    {villa.name}
                    {/* Active Indicator Line */}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-emerald-800 transform transition-transform duration-500 ease-out ${
                        activeTab === villa.id ? 'scale-x-100' : 'scale-x-0'
                    }`}></span>
                </button>
            ))}
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]">
            
            {/* LEFT: MAIN IMAGE (Hero) */}
            <div className="lg:col-span-7 relative h-[500px] lg:h-auto">
                <div className="w-full h-full relative overflow-hidden rounded-sm group">
                    <div className="villa-img-reveal w-full h-full">
                         <Link to={`/villas/${activeVilla.id}`}>
                            <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                                <span className="bg-cream-100/90 backdrop-blur px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-900">Explore</span>
                            </div>
                            <img 
                                src={activeVilla.imageUrl} 
                                alt={activeVilla.name} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                loading="eager"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* RIGHT: INFO & CONTENT */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
                
                {/* Info Header */}
                <div className="villa-content-anim">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-[1px] bg-emerald-900/40"></div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-900/60">{activeVilla.location}</span>
                    </div>
                    <h3 className="font-serif text-5xl text-emerald-900 mb-4">{activeVilla.name}</h3>
                    <p className="font-sans text-emerald-900/70 leading-relaxed line-clamp-3 mb-6">
                        {activeVilla.description}
                    </p>
                    <div className="font-serif text-4xl text-emerald-900">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(activeVilla.pricePerNight)}
                        <span className="text-sm font-sans text-emerald-900/40 ml-2 align-middle">/ night</span>
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="villa-content-anim grid grid-cols-2 gap-6 py-8 border-t border-emerald-900/10">
                     <div className="flex items-center space-x-3 text-emerald-800">
                        <Users size={20} strokeWidth={1} />
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest opacity-50">Capacity</span>
                            <span className="font-serif">{activeVilla.guests} Guests</span>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3 text-emerald-800">
                        <BedDouble size={20} strokeWidth={1} />
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest opacity-50">Bedrooms</span>
                            <span className="font-serif">{activeVilla.bedrooms} Rooms</span>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3 text-emerald-800">
                        <Bath size={20} strokeWidth={1} />
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest opacity-50">Bathrooms</span>
                            <span className="font-serif">{activeVilla.bathrooms} Baths</span>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3 text-emerald-800">
                        <Square size={20} strokeWidth={1} />
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest opacity-50">Area</span>
                            <span className="font-serif">{activeVilla.area} m²</span>
                        </div>
                     </div>
                </div>

                {/* CTA */}
                <div className="villa-content-anim">
                    <MagneticButton>
                        <Link to={`/villas/${activeVilla.id}`} className="flex items-center justify-between w-full bg-emerald-900 text-cream-100 px-8 py-5 rounded-full hover:bg-emerald-800 transition-all group">
                            <span className="uppercase tracking-widest text-xs font-bold">View Residence Details</span>
                            <div className="w-8 h-8 rounded-full bg-cream-100/10 flex items-center justify-center group-hover:bg-cream-100 group-hover:text-emerald-900 transition-colors">
                                <ArrowUpRight size={16} />
                            </div>
                        </Link>
                    </MagneticButton>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};
