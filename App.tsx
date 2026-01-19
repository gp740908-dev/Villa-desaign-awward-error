
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { FeaturedVillas } from './components/FeaturedVillas';
import { LocationsMap } from './components/LocationsMap'; // Static import
import { VillasCatalog } from './components/VillasCatalog';
import { VillaDetails } from './components/VillaDetails';
import { JournalIndex } from './components/JournalIndex';
import { JournalPost } from './components/JournalPost';
import { BaliGuidePage } from './components/BaliGuidePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage'; 
import { BaliGuide } from './components/BaliGuide'; 
import { Journal } from './components/Journal'; 
import { Experiences } from './components/Experiences';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => (
    <>
        <Hero />
        <Intro />
        <FeaturedVillas />
        <LocationsMap />
        <BaliGuide />
        <Journal /> 
        <Experiences />
        <Testimonials />
    </>
);

const App: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const location = useLocation();

  // Initialize Lenis for smooth scrolling
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Reset scroll on route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global Animation Setup - Re-run when location changes
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        
      // 1. Image Reveal Effect
      const images = gsap.utils.toArray<HTMLElement>('.reveal-image');
      images.forEach((img) => {
        gsap.fromTo(img, 
          { scale: 1.25, filter: 'blur(5px)' }, 
          {
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: "top 85%", 
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 2. Text Stagger/Blur Reveal
      const textBatches = gsap.utils.toArray<HTMLElement>('.reveal-text-wrapper');
      textBatches.forEach((batch) => {
        const items = batch.querySelectorAll('.reveal-text-item');
        gsap.fromTo(items, 
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: batch,
              start: "top 80%",
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, [location.pathname]);

  // Calculate Footer Height for Curtain Effect
  useEffect(() => {
    if (!footerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(footerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-emerald-900">
      <Header />
      
      {/* 
        Main Content Wrapper 
        z-10 and relative positioning keeps it above the fixed footer (z-0).
        marginBottom creates the space for the footer to be revealed.
      */}
      <main 
        ref={mainRef}
        className="relative z-10 bg-cream-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] min-h-screen"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/villas" element={<VillasCatalog />} />
            <Route path="/villas/:id" element={<VillaDetails />} />
            <Route path="/journal" element={<JournalIndex />} />
            <Route path="/journal/:id" element={<JournalPost />} />
            <Route path="/guide" element={<BaliGuidePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer heightRef={footerRef} />
    </div>
  );
};

export default App;
