import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BedDouble, Users, Bath, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VILLAS } from '../constants';
import { MagneticButton } from './MagneticButton';
import { Villa } from '../types';

gsap.registerPlugin(ScrollTrigger);

// --- Types & Constants ---
type Category = 'All' | 'Jungle' | 'River' | 'Rice Terrace';

const CATEGORIES: Category[] = ['All', 'Jungle', 'River', 'Rice Terrace'];

const getCategory = (location: string): Category => {
  if (location.includes('Ridge')) return 'River';
  if (location.includes('Tegalalang')) return 'Rice Terrace';
  return 'Jungle';
};

interface VillaListItemProps {
  villa: Villa;
  index: number;
  isEven: boolean;
}

const VillaListItem: React.FC<VillaListItemProps> = ({ villa, index, isEven }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image Curtain Reveal Effect
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.1 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

      // Text Stagger Reveal
      const textElements = textRef.current?.children;
      if (textElements) {
        gsap.fromTo(textElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-24 border-b border-emerald-900/10 last:border-0 group">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
        
        {/* Image Section */}
        <Link to={`/villas/${villa.id}`} className="w-full lg:w-3/5 relative overflow-hidden rounded-sm cursor-pointer block">
           {/* Editorial Number */}
           <div className={`absolute -top-10 ${isEven ? '-left-10' : '-right-10'} z-0 text-[10rem] md:text-[14rem] font-serif text-emerald-900/5 select-none pointer-events-none leading-none`}>
              0{index + 1}
           </div>

          <div className="relative aspect-[16/10] overflow-hidden">
             <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
             <img 
              ref={imgRef}
              src={villa.imageUrl} 
              alt={villa.name} 
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Text Section */}
        <div ref={textRef} className="w-full lg:w-2/5 flex flex-col relative z-10">
          <div className="flex items-center space-x-3 mb-6">
             <span className="w-8 h-[1px] bg-emerald-900/40"></span>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-900/60">{villa.location}</span>
          </div>

          <Link to={`/villas/${villa.id}`}>
            <h3 className="font-serif text-4xl md:text-6xl text-emerald-900 mb-6 leading-[1.1] hover:text-emerald-700 transition-colors">
              {villa.name}
            </h3>
          </Link>

          <p className="font-sans text-emerald-900/70 text-lg leading-relaxed mb-10 max-w-md">
            {villa.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-12 border-t border-emerald-900/10 pt-8">
             <div className="flex items-center space-x-3 text-emerald-800">
                <Users size={18} strokeWidth={1} />
                <span className="text-sm font-medium">{villa.guests} Guests</span>
             </div>
             <div className="flex items-center space-x-3 text-emerald-800">
                <BedDouble size={18} strokeWidth={1} />
                <span className="text-sm font-medium">{villa.bedrooms} Bedrooms</span>
             </div>
             <div className="flex items-center space-x-3 text-emerald-800">
                <Bath size={18} strokeWidth={1} />
                <span className="text-sm font-medium">{villa.bathrooms} Bathrooms</span>
             </div>
             <div className="flex items-center space-x-3 text-emerald-800">
                <Ruler size={18} strokeWidth={1} />
                <span className="text-sm font-medium">{villa.area} m²</span>
             </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
               <span className="text-xs uppercase tracking-widest text-emerald-900/50 mb-1">Starting from</span>
               <span className="font-serif text-2xl md:text-3xl text-emerald-900">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(villa.pricePerNight)}
               </span>
            </div>

            <MagneticButton>
               <Link to={`/villas/${villa.id}`} className="flex items-center space-x-3 bg-emerald-900 text-cream-100 px-8 py-4 rounded-full hover:bg-emerald-800 transition-colors duration-300">
                  <span className="uppercase tracking-widest text-xs font-bold">View Residence</span>
                  <ArrowUpRight size={18} />
               </Link>
            </MagneticButton>
          </div>
        </div>

      </div>
    </div>
  );
};

export const VillasCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [filteredVillas, setFilteredVillas] = useState(VILLAS);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll to top when mounting this page
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredVillas(VILLAS);
    } else {
      setFilteredVillas(VILLAS.filter(v => getCategory(v.location) === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="relative bg-cream-100 min-h-screen">
      
      {/* Page Header */}
      <div className="pt-40 pb-16 md:pt-56 md:pb-24 px-6 container mx-auto text-center">
         <span className="block text-emerald-900/40 font-script text-4xl mb-4 animate-fade-in">The Collection</span>
         <h2 className="font-serif text-5xl md:text-8xl text-emerald-900 mb-8 leading-[0.9]">
            Our Private<br/>Sanctuaries
         </h2>
         <p className="max-w-xl mx-auto text-emerald-900/60 font-sans leading-relaxed">
            Discover a curated selection of architectural masterpieces designed to immerse you in the spiritual heart of Bali.
         </p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[70px] md:top-[80px] z-30 bg-cream-100/90 backdrop-blur-md border-y border-emerald-900/5 py-3 md:py-4 mb-12">
         <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
            {/* Added justify-start for mobile scrolling and justify-center for desktop */}
            <div className="flex justify-start md:justify-center min-w-max space-x-2 md:space-x-4">
               {CATEGORIES.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-5 md:px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-500 border ${
                        activeCategory === cat 
                           ? 'bg-emerald-900 text-cream-100 border-emerald-900' 
                           : 'bg-transparent text-emerald-900/50 border-emerald-900/10 hover:border-emerald-900 hover:text-emerald-900'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Villa List */}
      <div className="container mx-auto px-6 pb-32">
         {filteredVillas.length > 0 ? (
            filteredVillas.map((villa, index) => (
               <VillaListItem 
                  key={villa.id} 
                  villa={villa} 
                  index={index} 
                  isEven={index % 2 === 0} 
               />
            ))
         ) : (
            <div className="py-32 text-center text-emerald-900/40 font-serif text-2xl">
               No sanctuaries found in this category.
            </div>
         )}
      </div>

    </section>
  );
};