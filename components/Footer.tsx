
import React from 'react';
import { Instagram, Facebook, Twitter, ArrowUpRight, ArrowUp } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { Link } from 'react-router-dom';

interface FooterProps {
    heightRef: React.RefObject<HTMLDivElement>;
}

export const Footer: React.FC<FooterProps> = ({ heightRef }) => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
        ref={heightRef}
        id="contact" 
        className="fixed bottom-0 left-0 w-full bg-[#022c04] text-cream-100 z-0 pt-24 pb-8 px-6 overflow-hidden"
    >
        {/* Ambient Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,_var(--tw-gradient-stops))] from-emerald-900/40 to-transparent pointer-events-none"></div>

      <div className="container mx-auto relative z-10 h-full flex flex-col justify-between">
        
        {/* Top Section: CTA & Nav */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-24">
            
            {/* Left Column: Newsletter & Socials (Span 6) */}
            <div className="lg:col-span-6 flex flex-col justify-between pr-0 lg:pr-12">
                <div>
                    <h3 className="font-serif text-4xl md:text-6xl mb-8 leading-[1.1]">
                        Join the <span className="italic text-emerald-400 font-light">inner circle</span> of Bali's finest.
                    </h3>
                    
                    <form className="relative max-w-lg group mb-12">
                        <input 
                            type="email" 
                            placeholder="Your Email Address" 
                            className="w-full bg-transparent border-b border-cream-100/20 py-6 pr-12 text-xl md:text-2xl font-serif placeholder:text-cream-100/20 text-cream-100 focus:outline-none focus:border-cream-100/60 transition-all duration-500"
                        />
                        <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 text-cream-100/40 group-hover:text-emerald-400 transition-colors duration-300">
                            <ArrowUpRight size={32} strokeWidth={1.5} />
                        </button>
                    </form>
                </div>
                
                {/* Socials Row */}
                <div className="flex items-center space-x-4">
                    {[Instagram, Facebook, Twitter].map((Icon, i) => (
                        <MagneticButton key={i}>
                            <a href="#" className="w-14 h-14 rounded-full border border-cream-100/10 flex items-center justify-center hover:bg-cream-100 hover:text-[#022c04] transition-all duration-500 group">
                                <Icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </MagneticButton>
                    ))}
                </div>
            </div>

            {/* Spacer (Span 1) */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Right Column: Navigation (Span 5) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-12">
                <div className="flex flex-col space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 mb-8 font-bold">Explore</span>
                    <Link to="/villas" className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-100/70 hover:text-white hover:pl-4 transition-all duration-500 block w-fit py-1">Our Villas</Link>
                    <Link to="/journal" className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-100/70 hover:text-white hover:pl-4 transition-all duration-500 block w-fit py-1">The Journal</Link>
                    <Link to="/guide" className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-100/70 hover:text-white hover:pl-4 transition-all duration-500 block w-fit py-1">Experiences</Link>
                    <Link to="/contact" className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-100/70 hover:text-white hover:pl-4 transition-all duration-500 block w-fit py-1">Contact Us</Link>
                </div>
                
                <div className="flex flex-col space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 mb-8 font-bold">Legal</span>
                    {['Privacy', 'Terms', 'Cookies', 'FAQ'].map((item) => (
                        <a key={item} href="#" className="font-serif text-xl md:text-2xl text-cream-100/40 hover:text-white transition-colors duration-300 block w-fit py-1">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Section: Massive Brand & Copyright */}
        <div className="border-t border-cream-100/5 pt-6 flex flex-col justify-end">
            
            <div className="flex justify-between items-end mb-4 md:mb-0">
                 {/* Copyright */}
                <div className="font-sans text-[10px] md:text-xs text-cream-100/30 uppercase tracking-widest leading-relaxed mb-4 md:mb-8">
                    © 2024 StayinUBUD. <br /> All Rights Reserved.
                </div>

                {/* Back to Top */}
                <div className="mb-4 md:mb-8 relative z-20">
                     <MagneticButton>
                        <button 
                            onClick={scrollToTop}
                            className="flex items-center space-x-3 group cursor-pointer"
                        >
                            <span className="hidden md:block text-[10px] uppercase tracking-widest text-cream-100/30 group-hover:text-cream-100 transition-colors">Back to Top</span>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream-100/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-[#022c04] transition-all duration-500">
                                <ArrowUp size={16} />
                            </div>
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* Massive Text */}
            <h1 className="font-serif text-[15vw] leading-[0.75] tracking-tighter text-cream-100/5 text-center md:text-left -ml-[0.8vw] pointer-events-none select-none mix-blend-overlay">
                STAYINUBUD
            </h1>
        </div>

      </div>
    </footer>
  );
};
