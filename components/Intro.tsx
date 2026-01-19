import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export const Intro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // Start animation when section is 30% into view
          end: "bottom bottom",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Label Reveal
      tl.from(".intro-label", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 2. Main Text Word Reveal
      // Target the inner span of SplitText (which creates the mask effect)
      tl.from(".split-word-anim .split-word > span", {
        y: "100%",
        opacity: 0,
        duration: 1,
        stagger: 0.015,
        ease: "power4.out"
      }, "-=0.5");

      // 3. Script Text Accent Animation
      tl.from(".script-text", {
         scale: 0.9,
         y: 20,
         opacity: 0,
         rotate: 3,
         duration: 1.5,
         ease: "elastic.out(1, 0.6)"
      }, "-=0.8");

      // 4. Vertical Line Draw
      tl.from(".intro-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power3.inOut"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 md:py-40 bg-cream-100 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="intro-label text-emerald-800/60 uppercase tracking-[0.2em] text-sm font-semibold mb-8 block">
          The Story
        </span>
        
        <h2 className="font-serif text-3xl md:text-5xl text-emerald-800 leading-snug">
          {/* First part of text */}
          <span className="split-word-anim inline">
             <SplitText type="words">We curate spaces where</SplitText>
          </span>
          
          {/* Highlighted Script Text */}
          <span className="script-text font-script text-5xl md:text-6xl text-emerald-600 px-3 inline-block origin-center transform-gpu">
             time slows down
          </span>
          
          {/* Second part of text */}
          <span className="split-word-anim inline">
             <SplitText type="words">and the spirit of Bali breathes through the walls. StayinUBUD is not just accommodation; it is an immersion into the sublime.</SplitText>
          </span>
        </h2>
        
        <div className="mt-16 flex justify-center">
            <div className="intro-line h-24 w-[1px] bg-emerald-800/20"></div>
        </div>
      </div>
    </section>
  );
};