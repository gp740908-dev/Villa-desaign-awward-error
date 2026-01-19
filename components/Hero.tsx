
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
  {
    id: 1,
    // Using a very stable, high-quality image of a Bali Pool Villa
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2600&auto=format&fit=crop", 
    script: "Sanctuary of Silence",
    title1: "ELEVATED",
    title2: "LIVING"
  },
  {
    id: 2,
    // Bamboo House / Jungle
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2600&auto=format&fit=crop", 
    script: "Heart of the Jungle",
    title1: "NATURE",
    title2: "IMMERSED"
  },
  {
    id: 3,
    // Modern Interior
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop", 
    script: "The Art of Slowing Down",
    title1: "TIMELESS",
    title2: "DESIGN"
  },
  {
    id: 4,
    // Temple / Culture
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2600&auto=format&fit=crop", 
    script: "Spirit of the Island",
    title1: "SACRED",
    title2: "GROUNDS"
  }
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let currentIndex = 0;
      const totalSlides = HERO_SLIDES.length;
      
      // Initial Setup: Ensure GSAP matches CSS state
      slideRefs.current.forEach((slide, i) => {
        if (i === 0) {
           gsap.set(slide, { zIndex: 20, opacity: 1 });
           gsap.set(textRefs.current[i], { opacity: 1, y: 0 });
        } else {
           gsap.set(slide, { zIndex: 10, opacity: 0 });
           gsap.set(textRefs.current[i], { opacity: 0, y: 50 });
        }
      });

      // Recursive Animation Function
      const animateNextSlide = () => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        
        const currentSlide = slideRefs.current[currentIndex];
        const nextSlide = slideRefs.current[nextIndex];
        const currentText = textRefs.current[currentIndex];
        const nextText = textRefs.current[nextIndex];

        if (!currentSlide || !nextSlide) return;

        const tl = gsap.timeline({
            onComplete: () => {
                currentIndex = nextIndex;
                // Schedule next run
                gsap.delayedCall(5, animateNextSlide);
            }
        });

        // 1. Prepare Next Slide (put it on top but invisible/transparent)
        tl.set(nextSlide, { zIndex: 30, opacity: 0, scale: 1.1 });
        tl.set(nextText, { zIndex: 30, opacity: 0, y: 50 });

        // 2. Animate TEXT Out (Current)
        tl.to(currentText, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        });

        // 3. Animate IMAGE Crossfade
        // Fade in Next over Current
        tl.to(nextSlide, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut"
        }, "-=0.5");

        // 4. Animate TEXT In (Next)
        tl.to(nextText, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5");

        // 5. Cleanup Z-Index after transition
        tl.add(() => {
            gsap.set(currentSlide, { zIndex: 10, opacity: 0 });
            gsap.set(currentText, { zIndex: 10 });
            gsap.set(nextSlide, { zIndex: 20 }); // Becomes the new base
            gsap.set(nextText, { zIndex: 20 });
        });
      };

      // Start the loop after the initial delay
      gsap.delayedCall(5, animateNextSlide);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-emerald-900">
      
      {HERO_SLIDES.map((slide, index) => (
        <div key={slide.id} className="absolute inset-0 w-full h-full">
            
            {/* --- IMAGE LAYER --- */}
            <div 
                ref={el => slideRefs.current[index] = el}
                // CSS Classes handle the initial state perfectly.
                // Index 0 is visible immediately. No JS required for first paint.
                className={`absolute inset-0 w-full h-full ${index === 0 ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
            >
                <img 
                    src={slide.image} 
                    alt={`${slide.title1} ${slide.title2}`} 
                    className="w-full h-full min-h-screen object-cover"
                />
                
                {/* Gradient Overlay - Simplified to avoid "Green Block" issues */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-emerald-900/80"></div>
            </div>

            {/* --- TEXT LAYER --- */}
            <div 
                ref={el => textRefs.current[index] = el}
                className={`absolute inset-0 flex items-center justify-center pointer-events-none px-4 ${index === 0 ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
            >
                <div className="text-center w-full max-w-[90%] md:max-w-none">
                    <p className="hero-script font-script text-cream-50 text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 drop-shadow-md tracking-wide">
                        {slide.script}
                    </p>
                    
                    <h1 className="font-serif text-cream-50 leading-[0.9] tracking-tight drop-shadow-xl relative z-10">
                        <div className="overflow-hidden py-2 md:py-4">
                            <span className="block text-[15vw] md:text-[11vw] font-medium leading-none">
                                <SplitText>{slide.title1}</SplitText>
                            </span>
                        </div>
                        <div className="overflow-hidden py-2 md:py-4 -mt-4 md:-mt-8">
                            <span className="block text-[15vw] md:text-[11vw] italic font-light text-cream-100/90 leading-none">
                                <SplitText>{slide.title2}</SplitText>
                            </span>
                        </div>
                    </h1>

                    <div className="mt-8 md:mt-12 opacity-80">
                         <svg className="w-6 h-6 md:w-8 md:h-8 text-cream-50 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
      ))}
    </section>
  );
};
