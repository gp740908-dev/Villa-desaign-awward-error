
import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

export const BaliGuide: React.FC = () => {
  return (
    <section id="guide-teaser" className="py-24 bg-emerald-900 text-cream-100 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-0 overflow-hidden rounded-sm border border-emerald-800/30">
                <img 
                    src="https://images.unsplash.com/photo-1555400038-63f5ba517a91?q=80&w=1964&auto=format&fit=crop" 
                    alt="Ubud Temple" 
                    className="w-full h-full object-cover reveal-image"
                />
                 <div className="absolute bottom-6 left-6 right-6 bg-cream-100/10 backdrop-blur-md p-6 border border-cream-100/20">
                    <div className="flex items-center space-x-2 text-xs uppercase tracking-widest mb-2">
                        <MapPin size={14} />
                        <span>Featured Location</span>
                    </div>
                    <p className="font-serif text-xl">Pura Taman Saraswati</p>
                 </div>
            </div>
        </div>

        <div className="order-1 lg:order-2 reveal-text-wrapper">
          <span className="reveal-text-item text-cream-100/60 uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
            The Bali Guide
          </span>
          <h2 className="reveal-text-item font-serif text-5xl md:text-7xl mb-6">
            Unlock the <br/><span className="italic text-emerald-400 font-serif">Secrets</span> of Ubud
          </h2>
          <p className="reveal-text-item font-sans text-lg text-cream-100/80 mb-8 max-w-lg leading-relaxed">
            Beyond the crowded streets lies a world of ancient banyans, hidden waterfalls, and culinary masterpieces. Our curated guide brings you the authentic soul of the island.
          </p>
          
          <ul className="space-y-6 font-serif text-xl md:text-2xl mb-12">
            <li className="reveal-text-item flex items-center space-x-4 border-b border-emerald-800 pb-4">
                <span className="text-sm font-sans text-emerald-400">01</span>
                <span>Sacred Temples & Rituals</span>
            </li>
            <li className="reveal-text-item flex items-center space-x-4 border-b border-emerald-800 pb-4">
                <span className="text-sm font-sans text-emerald-400">02</span>
                <span>Artisan Markets & Crafts</span>
            </li>
            <li className="reveal-text-item flex items-center space-x-4 border-b border-emerald-800 pb-4">
                <span className="text-sm font-sans text-emerald-400">03</span>
                <span>Jungle Trekking Routes</span>
            </li>
          </ul>

          <div className="reveal-text-item">
            <MagneticButton>
                <Link to="/guide" className="group flex items-center space-x-4 bg-cream-100 text-emerald-900 px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 hover:text-cream-100 transition-colors border border-cream-100">
                    <span>Explore The Guide</span>
                    <Compass className="group-hover:rotate-45 transition-transform duration-300" size={18} />
                </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};