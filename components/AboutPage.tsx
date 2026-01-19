
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM_MEMBERS } from '../constants';
import { SplitText } from './SplitText';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. HERO REVEAL
      const heroTl = gsap.timeline();
      heroTl.from(".about-hero-img-mask", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.5,
        ease: "power4.inOut"
      })
      .from(".about-hero-img", {
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
      }, "-=1.5")
      .from(".about-hero-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      }, "-=1");

      // 2. PHILOSOPHY PARALLAX
      gsap.to(".philosophy-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. TEAM REVEAL
      gsap.from(".team-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 80%"
        }
      });

      // 4. MASONRY DETAILS
      gsap.utils.toArray<HTMLElement>(".detail-img-item").forEach((item, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-cream-100 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 h-full items-center">
          
          {/* Left: Image */}
          <div className="about-hero-img-mask relative overflow-hidden h-[70vh] w-full rounded-sm order-2 lg:order-1">
             <img 
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop" 
                alt="Balinese Jungle" 
                className="about-hero-img w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply"></div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2 flex flex-col justify-center relative">
             <div className="about-hero-text mb-8">
                 <span className="block text-emerald-900/40 font-bold uppercase tracking-[0.2em] text-xs mb-4">The Vision</span>
                 <h1 className="font-serif text-6xl md:text-8xl text-emerald-900 leading-[0.9] -ml-1">
                    More than<br/>a stay, a<br/><span className="italic font-script text-emerald-500">state of mind</span>
                 </h1>
             </div>
             <p className="about-hero-text font-sans text-xl text-emerald-900/70 max-w-md leading-relaxed mb-12">
                 We curate spaces where the noise of the world fades, replaced by the ancient rhythm of the jungle and the whisper of the divine.
             </p>
             <div className="about-hero-text">
                <ArrowDown className="text-emerald-900 animate-bounce" size={32} strokeWidth={1} />
             </div>
          </div>

        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="philosophy-section py-32 md:py-48 relative overflow-hidden">
         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
             
             {/* Text Block (Left/Center) */}
             <div className="lg:col-span-5 lg:col-start-2 relative z-10">
                 <h2 className="font-serif text-5xl md:text-6xl text-emerald-900 mb-8 leading-tight">
                    The Art of <br/> <span className="font-script italic text-emerald-600">Slow Living</span>
                 </h2>
                 <div className="w-16 h-1 bg-emerald-900/20 mb-8"></div>
                 <p className="font-sans text-lg text-emerald-900/70 mb-6 leading-relaxed">
                    In a world obsessed with speed, we champion the pause. StayinUBUD was born from a desire to reclaim time. We believe that true luxury isn't about golden faucets; it's about the luxury of undistracted attention.
                 </p>
                 <p className="font-sans text-lg text-emerald-900/70 leading-relaxed">
                    Each property in our collection is chosen not just for its architecture, but for its energy. We look for homes that breathe, spaces that invite nature inside, and locations that offer a profound sense of place.
                 </p>
             </div>

             {/* Parallax Image (Right) */}
             <div className="lg:col-span-5 lg:col-start-8 relative h-[600px] w-full">
                 <div className="absolute inset-0 overflow-hidden rounded-sm">
                     <img 
                        src="https://images.unsplash.com/photo-1544965850-6f8a620a85ca?q=80&w=1969&auto=format&fit=crop" 
                        alt="Tea Ceremony" 
                        className="philosophy-img w-full h-[140%] object-cover -mt-[20%]"
                     />
                 </div>
                 {/* Floating Caption */}
                 <div className="absolute -bottom-10 -left-10 bg-cream-100 p-8 max-w-xs shadow-xl border border-emerald-900/5 hidden md:block">
                     <p className="font-serif text-emerald-900 text-xl italic">
                        "We do not visit Ubud to escape life, but for life not to escape us."
                     </p>
                 </div>
             </div>
         </div>
      </section>

      {/* --- THE CURATORS (TEAM) --- */}
      <section className="team-section py-32 bg-cream-50 px-6">
          <div className="container mx-auto">
              <div className="text-center mb-24">
                  <span className="block text-emerald-900/40 uppercase tracking-[0.2em] text-xs font-bold mb-4">The Curators</span>
                  <h2 className="font-serif text-5xl md:text-7xl text-emerald-900">Meet the <span className="italic font-script">Architects</span><br/>of your Experience</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {TEAM_MEMBERS.map((member) => (
                      <div key={member.id} className="team-card group cursor-pointer">
                          <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 bg-emerald-900/5">
                              {/* B&W to Color Effect */}
                              <img 
                                src={member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                              />
                          </div>
                          <div className="text-center">
                              <h3 className="font-serif text-3xl text-emerald-900 mb-1">{member.name}</h3>
                              <p className="font-script text-2xl text-emerald-600 mb-4">{member.role}</p>
                              <p className="font-sans text-sm text-emerald-900/60 max-w-xs mx-auto leading-relaxed">
                                  {member.bio}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- CULTURAL COMMITMENT --- */}
      <section className="py-32 bg-[#022c04] text-cream-100 px-6 relative overflow-hidden">
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
              <span className="block text-emerald-400 uppercase tracking-[0.2em] text-xs font-bold mb-8">Cultural Commitment</span>
              <h2 className="font-serif text-5xl md:text-7xl mb-10 leading-tight">
                  Respecting the <br/><span className="italic font-script font-light">Land of Gods</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-left font-sans text-lg text-cream-100/70 leading-relaxed">
                  <p>
                      Bali is not just a destination; it is a living, breathing spiritual ecosystem. We operate with a deep reverence for <em>Tri Hita Karana</em>—the harmony between people, nature, and the divine.
                  </p>
                  <p>
                      Every villa in our collection employs local staff from the surrounding banjars, supports sustainable building practices, and contributes to the preservation of local temples and rituals.
                  </p>
              </div>
              <div className="mt-16">
                   <div className="inline-block border border-cream-100/20 px-8 py-4 rounded-full font-serif text-xl">
                       Sustainability & Community First
                   </div>
              </div>
          </div>
      </section>

      {/* --- THE EXPERIENCE (MASONRY DETAILS) --- */}
      <section className="py-32 px-6">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="detail-img-item space-y-8">
                  <div className="aspect-[3/4] overflow-hidden rounded-sm">
                      <img src="https://images.unsplash.com/photo-1605218427368-9a3c945b349f?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail" />
                  </div>
                  <div className="p-4">
                      <h4 className="font-serif text-2xl text-emerald-900 mb-2">Tactile Luxury</h4>
                      <p className="font-sans text-emerald-900/60 text-sm">Hand-woven linens and reclaimed teak.</p>
                  </div>
              </div>

              <div className="detail-img-item space-y-8 lg:mt-24">
                   <div className="aspect-[1/1] overflow-hidden rounded-sm">
                      <img src="https://images.unsplash.com/photo-1596525737122-38374d82343c?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail" />
                  </div>
                  <div className="aspect-[4/5] overflow-hidden rounded-sm">
                      <img src="https://images.unsplash.com/photo-1518002171953-a080ee802e12?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail" />
                  </div>
              </div>

              <div className="detail-img-item space-y-8">
                  <div className="p-4 text-right">
                      <h4 className="font-serif text-2xl text-emerald-900 mb-2">Sensory Immersion</h4>
                      <p className="font-sans text-emerald-900/60 text-sm">The scent of incense and the sound of rain.</p>
                  </div>
                  <div className="aspect-[3/4] overflow-hidden rounded-sm">
                      <img src="https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail" />
                  </div>
              </div>

          </div>
      </section>

    </div>
  );
};
