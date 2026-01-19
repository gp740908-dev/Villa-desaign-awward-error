
import React, { useEffect, useState, useRef } from 'react';
import { Menu, X, Search } from 'lucide-react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

// --- Rolling Text Link Component ---
const NavLink: React.FC<{ to: string; label: string; isScrolled: boolean; mobile?: boolean }> = ({ to, label, isScrolled, mobile }) => {
    // If it starts with #, it's an anchor on the home page.
    const isAnchor = to.startsWith('#');
    const location = useLocation();
    const isHome = location.pathname === '/';
    
    // Logic: 
    // 1. If it's a route (e.g. /villas), use Link directly.
    // 2. If it's an anchor (#about):
    //    a. If on Home, use <a> for simple scrolling (Lenis/native).
    //    b. If NOT on Home, use Link to go to "/#about" (HashRouter handles this as /#/#about automatically).
    
    // Check if we need to redirect to home first
    const needsRedirect = isAnchor && !isHome;

    const commonClasses = `relative block overflow-hidden group cursor-pointer ${
            mobile ? 'text-4xl md:text-6xl font-serif text-cream-100 py-2' : 'text-xs font-bold tracking-[0.2em] uppercase py-2 px-1'
            } ${!mobile && (isScrolled ? 'text-emerald-900' : 'text-cream-50') || ''}`;

    const innerContent = (
        <>
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" data-text={label}>
            {label}
            </span>
            <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-emerald-400">
            {label}
            </span>
        </>
    );

    if (needsRedirect) {
        // Redirect to Home with hash
        return (
            <MagneticButton>
                <Link to={`/${to}`} className={commonClasses}>
                    {innerContent}
                </Link>
            </MagneticButton>
        );
    }
    
    if (isAnchor) {
        // On Home, simple anchor
        return (
            <MagneticButton>
                <a href={to} className={commonClasses}>
                    {innerContent}
                </a>
            </MagneticButton>
        );
    }

    // Standard Route
    return (
        <MagneticButton>
            <Link to={to} className={commonClasses}>
                {innerContent}
            </Link>
        </MagneticButton>
    );
};

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Force "scrolled" style if not on homepage so text is visible on cream background pages (like VillasCatalog)
  const isHome = location.pathname === '/';
  const headerStyleState = isHome ? isScrolled : true; 

  // Determine Logo Color: White if mobile menu is open OR if transparent header on homepage top. Green otherwise.
  const logoColorClass = isMobileMenuOpen 
    ? 'text-cream-50' 
    : (headerStyleState ? 'text-emerald-900' : 'text-cream-50');

  // Handle Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(menuRef.current, { y: '0%', duration: 0.8, ease: 'power4.inOut' })
      .fromTo(
        menuItemsRef.current?.children || [],
        { y: 100, opacity: 0, rotate: 5 },
        { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, { y: '-100%', duration: 0.8, ease: 'power4.inOut' });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen 
            ? 'bg-transparent py-4 border-transparent' // Force transparent when menu is open
            : (headerStyleState 
                ? 'bg-cream-100/80 backdrop-blur-md py-4 border-b border-emerald-900/5' 
                : 'bg-transparent py-8 border-b border-transparent')
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          
          {/* --- Desktop Left Nav --- */}
          <nav className="hidden md:flex items-center space-x-12">
            <NavLink to="/villas" label="Our Villas" isScrolled={headerStyleState} />
            <NavLink to="/journal" label="The Journal" isScrolled={headerStyleState} />
            <NavLink to="/guide" label="The Bali Guide" isScrolled={headerStyleState} />
          </nav>

          {/* --- Logo --- */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center group cursor-pointer z-20">
            <Link to="/" className={`font-serif transition-colors duration-500 relative z-20 ${logoColorClass}`}>
               {/* Logo text with scaling effect on scroll */}
              <span className={`block font-bold tracking-tighter transition-all duration-700 ${headerStyleState ? 'text-2xl' : 'text-4xl'}`}>
                StayinUBUD
              </span>
            </Link>
          </div>

          {/* --- Desktop Right Nav --- */}
          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/about" label="About" isScrolled={headerStyleState} />
            
            <MagneticButton>
                <div className={`cursor-pointer transition-colors duration-300 ${headerStyleState ? 'text-emerald-900 hover:text-emerald-600' : 'text-cream-50 hover:text-emerald-300'}`}>
                    <Search className="w-5 h-5" strokeWidth={1.5} />
                </div>
            </MagneticButton>

            <MagneticButton>
              <Link 
                to="/villas" 
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 border ${
                  headerStyleState 
                    ? 'border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-cream-100' 
                    : 'border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-emerald-900'
                }`}
              >
                Book Your Stay
              </Link>
            </MagneticButton>
          </div>

          {/* --- Mobile Toggle --- */}
          <div className="md:hidden ml-auto relative z-50">
            <MagneticButton>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className={`flex items-center justify-center w-10 h-10 transition-colors duration-300 ${
                        isMobileMenuOpen ? 'text-cream-100' : (headerStyleState ? 'text-emerald-900' : 'text-cream-50')
                    }`}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* --- Full Screen Mobile Menu Overlay --- */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-emerald-900 z-40 transform -translate-y-full flex flex-col justify-center items-center"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 pointer-events-none"></div>
        
        <div ref={menuItemsRef} className="flex flex-col items-center space-y-2 text-center relative z-10">
            <div onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/" label="Home" isScrolled={false} mobile /></div>
            <div onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/villas" label="Our Villas" isScrolled={false} mobile /></div>
            <div onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/journal" label="The Journal" isScrolled={false} mobile /></div>
            <div onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/guide" label="Bali Guide" isScrolled={false} mobile /></div>
            <div onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/about" label="About Us" isScrolled={false} mobile /></div>
            <div onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/contact" label="Contact" isScrolled={false} mobile /></div>
            
            <div className="mt-12 opacity-50 text-cream-100 font-sans text-sm tracking-widest uppercase">
                StayinUBUD Collection
            </div>
        </div>
      </div>
    </>
  );
};
