
import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOG_POSTS } from '../constants';
import { MagneticButton } from './MagneticButton';
import { ArrowUpRight } from 'lucide-react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Culture', 'Dining', 'Wellness', 'Stays', 'Adventure'];

export const JournalIndex: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter Logic
    const filteredPosts = activeCategory === 'All' 
        ? BLOG_POSTS 
        : BLOG_POSTS.filter(post => post.category === activeCategory);

    // Get Featured Post (First one or explicitly marked)
    const featuredPost = BLOG_POSTS.find(p => p.isFeatured) || BLOG_POSTS[0];
    const gridPosts = filteredPosts.filter(p => p.id !== featuredPost.id);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(".journal-hero-text", {
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.1,
                delay: 0.2
            });
            
            gsap.from(".journal-hero-img", {
                scale: 1.1,
                opacity: 0,
                duration: 2,
                ease: "power2.out"
            });

            // Grid Items Fade Up
            gsap.from(".journal-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".journal-grid",
                    start: "top 80%"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <div ref={containerRef} className="bg-cream-100 min-h-screen pt-32 pb-24 px-6">
            
            {/* --- HERO SECTION --- */}
            {activeCategory === 'All' && (
                <section className="mb-32">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <span className="journal-hero-text block text-emerald-900/40 uppercase tracking-[0.2em] text-xs font-bold mb-6">
                                Featured Story
                            </span>
                            <h1 className="journal-hero-text font-serif text-5xl md:text-7xl text-emerald-900 mb-8 leading-[1.05]">
                                {featuredPost.title}
                            </h1>
                            <p className="journal-hero-text font-sans text-lg text-emerald-900/70 mb-10 leading-relaxed max-w-md">
                                {featuredPost.excerpt}
                            </p>
                            <div className="journal-hero-text">
                                <MagneticButton>
                                    <Link to={`/journal/${featuredPost.id}`} className="inline-flex items-center space-x-3 group">
                                        <span className="w-16 h-16 rounded-full border border-emerald-900/20 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-cream-100 transition-all duration-500">
                                            <ArrowUpRight size={24} strokeWidth={1} />
                                        </span>
                                        <span className="uppercase tracking-widest text-xs font-bold text-emerald-900">Read Story</span>
                                    </Link>
                                </MagneticButton>
                            </div>
                        </div>
                        <div className="lg:col-span-7 order-1 lg:order-2 h-[60vh] lg:h-[80vh] overflow-hidden rounded-sm relative">
                            <Link to={`/journal/${featuredPost.id}`}>
                                <div className="absolute inset-0 bg-emerald-900/10 hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img 
                                    src={featuredPost.imageUrl} 
                                    alt={featuredPost.title} 
                                    className="journal-hero-img w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* --- FILTER & GRID --- */}
            <section className="container mx-auto">
                
                {/* Minimalist Filter */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-20 border-y border-emerald-900/5 py-8">
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 relative group ${
                                activeCategory === cat ? 'text-emerald-900' : 'text-emerald-900/40 hover:text-emerald-900'
                            }`}
                        >
                            {cat}
                            <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-900 transition-opacity duration-300 ${activeCategory === cat ? 'opacity-100' : 'opacity-0'}`}></span>
                        </button>
                    ))}
                </div>

                {/* Asymmetrical Grid */}
                <div className="journal-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    {gridPosts.map((post, idx) => {
                        // Layout Logic: Alternating widths for masonry feel
                        // Pattern: 8 cols, 4 cols, 6 cols, 6 cols...
                        const isWide = idx % 4 === 0 || idx % 4 === 3; 
                        const colSpan = isWide ? 'lg:col-span-8' : 'lg:col-span-4';
                        // Keep aspect ratio interesting
                        const aspectRatio = isWide ? 'aspect-[16/9]' : 'aspect-[3/4]';

                        return (
                            <div key={post.id} className={`${colSpan} journal-card group cursor-pointer mb-12`}>
                                <Link to={`/journal/${post.id}`} className="block">
                                    <div className={`relative overflow-hidden rounded-sm mb-6 ${aspectRatio}`}>
                                        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/10 transition-colors duration-500 z-10"></div>
                                        <img 
                                            src={post.imageUrl} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-cream-100/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-emerald-900">
                                            {post.category}
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-start max-w-xl">
                                        <div className="flex items-center space-x-3 text-emerald-900/40 text-[10px] uppercase tracking-widest mb-3">
                                            <span>{post.date}</span>
                                            <span className="w-3 h-[1px] bg-emerald-900/20"></span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h2 className="font-serif text-3xl text-emerald-900 mb-4 leading-tight group-hover:underline decoration-emerald-900/20 underline-offset-4 decoration-1 transition-all">
                                            {post.title}
                                        </h2>
                                        <p className="font-sans text-emerald-900/60 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {gridPosts.length === 0 && (
                    <div className="text-center py-20 font-serif text-2xl text-emerald-900/40">
                        Stories coming soon.
                    </div>
                )}

            </section>
        </div>
    );
};
