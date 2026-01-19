import React, { useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VILLAS } from '../constants';
import { MagneticButton } from './MagneticButton';
import { BookingWidget } from './BookingWidget';
import { ArrowLeft, Star, Users, BedDouble, Bath, Square, Check, MapPin, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VillaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const villa = VILLAS.find((v) => v.id === id);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Animations
  useLayoutEffect(() => {
    if (!villa || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Parallax & Title Reveal
      const tl = gsap.timeline();
      
      tl.from(".hero-title-char", {
        y: 100,
        opacity: 0,
        rotateZ: 3,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      })
      .from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

      // OPTIMIZED PARALLAX
      gsap.to(".hero-bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.05
        },
        force3D: true,
        rotation: 0.01
      });

      // 2. Info Bar Sticky Animation
      // Only pin on desktop to avoid issues with empty container on mobile
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
            ScrollTrigger.create({
                trigger: ".info-bar",
                start: "top top+=80", 
                endTrigger: "footer",
                end: "top bottom",
                pin: true,
                pinSpacing: false,
                toggleClass: "is-sticky"
            });
        }
      });

      // 3. Text Reveal for Description
      gsap.from(".desc-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".desc-section",
            start: "top 80%"
        }
      });

      // 4. Gallery Reveal
      const galleryImages = gsap.utils.toArray<HTMLElement>('.gallery-img-wrapper');
      if (galleryImages.length > 0) {
        galleryImages.forEach((img) => {
            gsap.fromTo(img,
              { clipPath: "inset(0% 0% 100% 0%)" },
              { 
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 1.2,
                  ease: "power4.inOut",
                  scrollTrigger: {
                      trigger: img,
                      start: "top 85%"
                  }
              }
            );
        });
      }

      // 5. Map Reveal
      gsap.from(".map-section-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".map-section",
            start: "top 80%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [id, villa]);

  if (!villa) {
    return (
        <div className="h-screen flex items-center justify-center bg-cream-100 text-emerald-900">
            <div className="text-center">
                <h2 className="font-serif text-4xl mb-4">Sanctuary Not Found</h2>
                <Link to="/villas" className="underline">Return to Collection</Link>
            </div>
        </div>
    );
  }

  // Safety check for gallery
  const mainImage = villa.gallery && villa.gallery.length > 0 ? villa.gallery[0] : villa.imageUrl;
  const secondaryImages = villa.gallery && villa.gallery.length > 2 ? villa.gallery.slice(1, 3) : [];

  // Generate Google Maps Embed URL
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${villa.coordinates.lat},${villa.coordinates.lng}&hl=en&z=14&output=embed`;
  
  // Directions Link
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${villa.coordinates.lat},${villa.coordinates.lng}`;

  return (
    <div ref={containerRef} className="bg-cream-100 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-section relative h-[90vh] w-full overflow-hidden flex items-end pb-24 px-6">
        <div className="absolute inset-0 z-0 transform-gpu">
             <div className="absolute inset-0 bg-emerald-900/30 z-10"></div>
             <img 
                src={villa.imageUrl} 
                alt={villa.name} 
                className="hero-bg-img w-full h-[120%] object-cover -mt-[10%] will-change-transform"
             />
        </div>

        <div className="relative z-20 container mx-auto text-cream-100">
            <Link to="/villas" className="inline-flex items-center space-x-2 text-cream-100/70 hover:text-cream-100 transition-colors mb-8">
                <ArrowLeft size={16} />
                <span className="text-xs uppercase tracking-widest font-bold">Back to Collection</span>
            </Link>
            
            <div className="flex flex-col md:flex-row items-end md:justify-between">
                <div>
                    <span className="hero-meta block font-script text-3xl md:text-5xl mb-2 text-emerald-300">
                        {villa.location}
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] -ml-1 md:-ml-2">
                        {villa.name.split('').map((char, i) => (
                            <span key={i} className="hero-title-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>
                
                <div className="hero-meta hidden md:block text-right mb-2">
                    <div className="flex items-center space-x-1 mb-2 justify-end">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#F8F4EB" stroke="none"/>)}
                    </div>
                    <span className="text-sm uppercase tracking-widest opacity-80">Luxury Collection</span>
                </div>
            </div>
        </div>
      </section>

      <div className="relative flex flex-col lg:flex-row container mx-auto px-6 py-16 gap-16">
          
          {/* --- LEFT CONTENT --- */}
          <div className="lg:w-2/3">
              
              {/* Key Specs Mobile Only */}
              <div className="grid grid-cols-2 gap-4 lg:hidden mb-12 pb-12 border-b border-emerald-900/10">
                  <div className="flex items-center space-x-3 text-emerald-800">
                        <Users size={18} /> <span>{villa.guests} Guests</span>
                  </div>
                  <div className="flex items-center space-x-3 text-emerald-800">
                        <BedDouble size={18} /> <span>{villa.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-3 text-emerald-800">
                        <Bath size={18} /> <span>{villa.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center space-x-3 text-emerald-800">
                        <Square size={18} /> <span>{villa.area} m²</span>
                  </div>
              </div>

              {/* Description */}
              <div className="desc-section mb-20">
                  <h3 className="desc-text font-serif text-3xl text-emerald-900 mb-8">The Experience</h3>
                  <div className="desc-text font-sans text-lg text-emerald-900/70 leading-relaxed whitespace-pre-line">
                      {villa.longDescription}
                  </div>
              </div>

              {/* Amenities */}
              <div className="mb-20">
                  <h3 className="font-serif text-3xl text-emerald-900 mb-8">Curated Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {villa.amenities.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-4 py-3 border-b border-emerald-900/10">
                              <span className="w-6 h-6 rounded-full border border-emerald-900/30 flex items-center justify-center">
                                  <Check size={12} className="text-emerald-800" />
                              </span>
                              <span className="font-sans text-emerald-900/80">{item}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* --- MAP SECTION --- */}
              <div className="map-section mb-24 relative map-section-reveal">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="font-serif text-3xl text-emerald-900">The Locality</h3>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-900/50">
                          {villa.coordinates.lat.toFixed(4)}, {villa.coordinates.lng.toFixed(4)}
                      </span>
                  </div>
                  
                  <div className="relative w-full h-[500px] rounded-sm overflow-hidden shadow-2xl border border-emerald-900/5 bg-emerald-900/5">
                      <iframe 
                        title="Villa Location"
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src={googleMapsEmbedUrl}
                        className="w-full h-full grayscale-[0.3] contrast-[1.1] opacity-90 hover:grayscale-0 transition-all duration-700"
                      ></iframe>
                      
                      {/* Interactive Overlay Card */}
                      <div className="absolute top-6 left-6 max-w-xs bg-cream-100/90 backdrop-blur-md p-6 rounded-sm shadow-lg border border-cream-100/50 z-10 pointer-events-none md:pointer-events-auto">
                          <div className="flex items-start space-x-3 mb-4">
                              <MapPin className="text-emerald-800 mt-1" size={20} />
                              <div>
                                  <p className="font-serif text-lg text-emerald-900 leading-none mb-1">{villa.name}</p>
                                  <p className="text-xs text-emerald-900/60 font-sans uppercase tracking-widest">{villa.location}, Ubud</p>
                              </div>
                          </div>
                          <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm text-emerald-900/80 border-b border-emerald-900/10 pb-2">
                                    <span>To Ubud Palace</span>
                                    <span className="font-bold">15 min</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-emerald-900/80 border-b border-emerald-900/10 pb-2">
                                    <span>To Monkey Forest</span>
                                    <span className="font-bold">20 min</span>
                                </div>
                          </div>
                          <div className="mt-6 pointer-events-auto">
                              <MagneticButton className="w-full">
                                <a 
                                    href={googleMapsDirectionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center space-x-2 bg-emerald-900 text-cream-100 py-3 rounded-sm uppercase tracking-widest text-[10px] font-bold hover:bg-emerald-800 transition-colors"
                                >
                                    <span>Get Directions</span>
                                    <Navigation size={12} />
                                </a>
                              </MagneticButton>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Gallery Grid (Mosaic) */}
              <div className="mb-24">
                  <h3 className="font-serif text-3xl text-emerald-900 mb-8">Visual Journey</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Main Large Image */}
                      {mainImage && (
                          <div className="gallery-img-wrapper md:col-span-2 aspect-[16/9] relative overflow-hidden rounded-sm">
                              <img src={mainImage} alt="Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                          </div>
                      )}
                      
                      {/* Two Smaller Images */}
                      {secondaryImages.map((img, idx) => (
                          <div key={idx} className="gallery-img-wrapper aspect-[4/5] relative overflow-hidden rounded-sm">
                              <img src={img} alt="Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* --- RIGHT SIDEBAR (Sticky Booking Widget) --- */}
          {/* Removed hidden lg:block to allow BookingWidget to render on mobile for the fixed bottom bar */}
          <div className="lg:w-1/3 relative">
              <div className="info-bar sticky top-32">
                 <BookingWidget villa={villa} />
                 
                 {/* Desktop Specs below widget - Hidden on mobile */}
                 <div className="hidden lg:grid grid-cols-2 gap-y-6 gap-x-4 mt-8 px-2">
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 mb-1">Guests</span>
                          <div className="flex items-center space-x-2 text-emerald-900">
                              <Users size={16} /> <span className="font-medium">{villa.guests}</span>
                          </div>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 mb-1">Bedrooms</span>
                          <div className="flex items-center space-x-2 text-emerald-900">
                              <BedDouble size={16} /> <span className="font-medium">{villa.bedrooms}</span>
                          </div>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 mb-1">Bathrooms</span>
                          <div className="flex items-center space-x-2 text-emerald-900">
                              <Bath size={16} /> <span className="font-medium">{villa.bathrooms}</span>
                          </div>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 mb-1">Area</span>
                          <div className="flex items-center space-x-2 text-emerald-900">
                              <Square size={16} /> <span className="font-medium">{villa.area} m²</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

      {/* --- BOTTOM CTA --- */}
      <section className="py-24 bg-emerald-900 text-cream-100 text-center px-6">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">Not quite what you're looking for?</h2>
          <MagneticButton>
              <Link to="/villas" className="inline-block border border-cream-100/30 px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-cream-100 hover:text-emerald-900 transition-all">
                  View All Residences
              </Link>
          </MagneticButton>
      </section>

    </div>
  );
};