
import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { BALI_GUIDE_DATA, VILLAS } from '../constants';
import { GuideCategory } from '../types';
import { MagneticButton } from './MagneticButton';
import { MapPin, Compass, ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES: GuideCategory[] = ['Eat & Drink', 'Sacred Places', 'Nature', 'Wellness'];

export const BaliGuidePage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<GuideCategory>('Eat & Drink');

    // Filter Data
    const items = BALI_GUIDE_DATA.filter(item => item.category === activeCategory);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            gsap.from(".guide-hero-title", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.1
            });

            // Card Reveals
            gsap.from(".guide-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".guide-list",
                    start: "top 80%"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <div ref={containerRef} className="bg-cream-100 min-h-screen">
            
            {/* --- HERO --- */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-emerald-900/40 z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=2600&auto=format&fit=crop" 
                        alt="Bali Rice Terraces" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 text-center text-cream-100">
                    <h1 className="guide-hero-title font-serif text-6xl md:text-8xl lg:text-9xl mb-4 leading-none">
                        The Curator's<br/>Guide to Ubud
                    </h1>
                    <p className="guide-hero-title font-script text-4xl md:text-5xl text-emerald-300">
                        Beyond the beaten path
                    </p>
                </div>
            </section>

            {/* --- STICKY NAV --- */}
            <div className="sticky top-[70px] md:top-[80px] z-30 bg-cream-100/95 backdrop-blur-md border-b border-emerald-900/10 py-4">
                <div className="container mx-auto overflow-x-auto no-scrollbar px-6">
                    <div className="flex justify-start md:justify-center space-x-8 min-w-max">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 relative group py-2 ${
                                    activeCategory === cat ? 'text-emerald-900' : 'text-emerald-900/40 hover:text-emerald-900'
                                }`}
                            >
                                {cat}
                                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-emerald-900 transform scale-x-0 transition-transform duration-300 ${activeCategory === cat ? 'scale-x-100' : 'group-hover:scale-x-50'}`}></span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- GUIDE CONTENT --- */}
            <div className="container mx-auto px-6 py-24 guide-list">
                <div className="grid grid-cols-1 gap-32">
                    {items.map((item, index) => {
                        const isEven = index % 2 === 0;
                        // Smart Linking Logic
                        const relatedVilla = item.relatedVillaId ? VILLAS.find(v => v.id === item.relatedVillaId) : null;

                        return (
                            <div key={item.id} className={`guide-card flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                                {/* Image */}
                                <div className="w-full lg:w-1/2 relative">
                                    <div className="aspect-[4/5] overflow-hidden rounded-sm relative group">
                                         <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-cream-100/90 backdrop-blur text-emerald-900 font-script text-2xl px-4 py-1 rounded-full shadow-lg border border-emerald-900/10">
                                                {item.category}
                                            </span>
                                         </div>
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    </div>
                                    {/* Map Pin Decoration */}
                                    <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-emerald-900 text-cream-100 p-4 rounded-full shadow-xl hidden md:block`}>
                                        <Compass size={24} className={isEven ? '' : 'rotate-90'} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="w-full lg:w-1/2">
                                    <h2 className="font-serif text-4xl md:text-5xl text-emerald-900 mb-6">{item.title}</h2>
                                    <p className="font-sans text-lg text-emerald-900/70 mb-8 leading-relaxed">
                                        {item.description}
                                    </p>
                                    
                                    {/* Concierge Tip Box */}
                                    <div className="bg-emerald-900 p-8 rounded-sm text-cream-100 mb-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <MapPin size={64} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest text-emerald-300 mb-2 block font-bold">The Concierge Tip</span>
                                        <p className="font-serif italic text-lg leading-relaxed opacity-90">"{item.conciergeTip}"</p>
                                    </div>

                                    {/* Smart Link to Villa */}
                                    {relatedVilla && (
                                        <div className="border border-emerald-900/10 rounded-sm p-4 flex items-center gap-4 bg-white hover:shadow-lg transition-shadow duration-300">
                                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                                                <img src={relatedVilla.imageUrl} alt="Villa" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 block">Stay Nearby</span>
                                                <span className="font-serif text-emerald-900">{relatedVilla.name}</span>
                                            </div>
                                            <MagneticButton>
                                                <Link to={`/villas/${relatedVilla.id}`} className="w-10 h-10 rounded-full bg-emerald-900 text-cream-100 flex items-center justify-center hover:bg-emerald-800 transition-colors">
                                                    <ArrowUpRight size={16} />
                                                </Link>
                                            </MagneticButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- INTERACTIVE MAP (Placeholder) --- */}
            <section className="bg-emerald-50 py-24 relative overflow-hidden">
                 <div className="container mx-auto px-6 mb-12 text-center">
                    <h2 className="font-serif text-4xl text-emerald-900 mb-4">Explore the Locality</h2>
                    <p className="font-sans text-emerald-900/60 max-w-xl mx-auto">
                        Our curated selections mapped for your convenience.
                    </p>
                 </div>
                 
                 <div className="w-full h-[600px] relative bg-emerald-200/20 grayscale">
                    {/* Fallback Visual */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <img 
                            src="https://images.unsplash.com/photo-1559390648-dd4d941e9645?q=80&w=2600&auto=format&fit=crop" 
                            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
                            alt="Map Placeholder"
                        />
                         <div className="absolute bg-cream-100/90 backdrop-blur px-8 py-6 rounded-sm text-center border border-emerald-900/10 shadow-xl">
                            <Compass size={32} className="mx-auto text-emerald-900 mb-4 animate-spin-slow" />
                            <p className="font-serif text-xl text-emerald-900">Interactive Map</p>
                            <p className="text-xs text-emerald-900/60 mt-2">Available upon concierge request.</p>
                         </div>
                    </div>
                 </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-32 bg-emerald-900 text-cream-100 text-center px-6">
                 <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
                        Ready to <span className="italic text-emerald-400">explore</span>?
                    </h2>
                    <p className="font-sans text-lg text-cream-100/70 mb-12 max-w-xl mx-auto">
                        Book your private sanctuary and let our concierge arrange these experiences for you.
                    </p>
                    <MagneticButton>
                        <Link to="/villas" className="inline-flex items-center space-x-3 bg-cream-100 text-emerald-900 px-10 py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-400 hover:text-emerald-900 transition-colors">
                            <span>View Our Villas</span>
                            <ArrowRight size={16} />
                        </Link>
                    </MagneticButton>
                 </div>
            </section>

        </div>
    );
};
