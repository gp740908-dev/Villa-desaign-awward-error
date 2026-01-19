
import React, { useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Twitter, Link as LinkIcon, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS, VILLAS } from '../constants';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const JournalPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = BLOG_POSTS.find(p => p.id === id);
    const containerRef = useRef<HTMLDivElement>(null);

    // Find Related Villa for "Shop the Stay"
    const relatedVilla = post?.relatedVillaId ? VILLAS.find(v => v.id === post.relatedVillaId) : null;

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        window.scrollTo(0,0);

        const ctx = gsap.context(() => {
            // 1. Progress Bar
            gsap.to(".read-progress", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0
                }
            });

            // 2. Parallax Images inside article
            gsap.utils.toArray<HTMLElement>(".article-image").forEach(img => {
                gsap.to(img, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // 3. Shop The Stay Card Reveal
            if (relatedVilla) {
                gsap.from(".shop-stay-card", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ".shop-stay-card",
                        start: "top 85%"
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, [id]);

    if (!post) return <div className="h-screen flex items-center justify-center">Post not found</div>;

    return (
        <div ref={containerRef} className="bg-cream-50 min-h-screen relative">
            
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-emerald-900/10 z-[60]">
                <div className="read-progress h-full bg-emerald-800 w-full origin-left transform scale-x-0"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 px-6 container mx-auto text-center max-w-4xl">
                <Link to="/journal" className="inline-flex items-center space-x-2 text-emerald-900/40 hover:text-emerald-900 transition-colors mb-8 uppercase tracking-widest text-[10px] font-bold">
                    <ArrowLeft size={14} /> <span>Back to Journal</span>
                </Link>
                
                <div className="mb-6 flex justify-center items-center space-x-4 text-xs font-serif italic text-emerald-900/60">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-900/30"></span>
                    <span>{post.date}</span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-emerald-900 leading-[0.9] mb-12">
                    {post.title}
                </h1>

                <div className="flex items-center justify-center space-x-4 border-t border-b border-emerald-900/10 py-6 w-full md:w-auto inline-block">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-900">Words by {post.author}</span>
                    <span className="text-emerald-900/20">|</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-900/60">{post.readTime}</span>
                </div>
            </header>

            {/* --- MAIN IMAGE --- */}
            <div className="container mx-auto px-6 mb-24">
                <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* --- CONTENT LAYOUT --- */}
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
                
                {/* Sidebar (Sticky) */}
                <aside className="hidden lg:block lg:col-span-2 relative">
                    <div className="sticky top-32 flex flex-col space-y-8">
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest text-emerald-900/40 mb-4">Share</span>
                            <div className="flex flex-col space-y-4">
                                <button className="w-10 h-10 rounded-full border border-emerald-900/10 flex items-center justify-center text-emerald-900 hover:bg-emerald-900 hover:text-cream-100 transition-colors">
                                    <Facebook size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-emerald-900/10 flex items-center justify-center text-emerald-900 hover:bg-emerald-900 hover:text-cream-100 transition-colors">
                                    <Twitter size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-emerald-900/10 flex items-center justify-center text-emerald-900 hover:bg-emerald-900 hover:text-cream-100 transition-colors">
                                    <LinkIcon size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Article Body */}
                <article className="lg:col-span-8 lg:pr-12">
                    <div className="font-serif text-xl md:text-2xl text-emerald-900/80 leading-relaxed space-y-8">
                        {post.content.map((block, idx) => {
                            
                            // Paragraph
                            if (block.type === 'paragraph') {
                                const isFirst = idx === 0;
                                return (
                                    <p key={idx} className={`${isFirst ? 'first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-serif first-letter:text-emerald-900 first-letter:leading-[0.8]' : ''}`}>
                                        {block.value}
                                    </p>
                                );
                            }

                            // Header
                            if (block.type === 'header') {
                                return (
                                    <h3 key={idx} className="font-serif text-3xl md:text-4xl text-emerald-900 mt-12 mb-6">
                                        {block.value}
                                    </h3>
                                );
                            }

                            // Quote
                            if (block.type === 'quote') {
                                return (
                                    <blockquote key={idx} className="my-16 text-center">
                                        <p className="font-script text-4xl md:text-5xl text-emerald-600 leading-tight">
                                            "{block.value}"
                                        </p>
                                    </blockquote>
                                );
                            }

                            // Image
                            if (block.type === 'image') {
                                return (
                                    <figure key={idx} className="my-16 -mx-6 md:-mx-12">
                                        <div className="relative overflow-hidden aspect-[16/9] rounded-sm">
                                            <img src={block.value} alt={block.caption} className="article-image w-full h-[120%] object-cover -mt-[10%]" />
                                        </div>
                                        {block.caption && (
                                            <figcaption className="text-center mt-4 text-xs font-sans uppercase tracking-widest text-emerald-900/50">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                            return null;
                        })}

                        {/* --- SHOP THE STAY EMBED --- */}
                        {relatedVilla && (
                            <div className="shop-stay-card my-20 p-8 bg-white border border-emerald-900/10 rounded-sm shadow-xl flex flex-col md:flex-row items-center gap-8">
                                <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-sm relative group cursor-pointer">
                                    <Link to={`/villas/${relatedVilla.id}`}>
                                        <img src={relatedVilla.imageUrl} alt={relatedVilla.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </Link>
                                </div>
                                <div className="w-full md:w-1/2 text-center md:text-left">
                                    <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 block mb-2">Experience The Story</span>
                                    <h4 className="font-serif text-3xl text-emerald-900 mb-2">{relatedVilla.name}</h4>
                                    <p className="font-sans text-sm text-emerald-900/60 mb-6 line-clamp-2">{relatedVilla.description}</p>
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                         <MagneticButton>
                                            <Link to={`/villas/${relatedVilla.id}`} className="inline-flex items-center space-x-2 bg-emerald-900 text-cream-100 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-emerald-800 transition-colors">
                                                <span>Book This Villa</span>
                                                <ArrowUpRight size={14} />
                                            </Link>
                                        </MagneticButton>
                                        <span className="font-serif text-lg text-emerald-900">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(relatedVilla.pricePerNight)} <span className="text-xs text-emerald-900/50 font-sans">/ night</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Empty Col for grid balance */}
                <div className="hidden lg:block lg:col-span-2"></div>
            </div>
            
            {/* Next Story Teaser (Optional Footer) */}
            <div className="bg-emerald-900 py-24 text-center">
                 <span className="text-cream-100/40 uppercase tracking-widest text-xs font-bold mb-4 block">Up Next</span>
                 <Link to="/journal" className="font-serif text-4xl md:text-6xl text-cream-100 hover:text-emerald-400 transition-colors">
                    Back to Journal
                 </Link>
            </div>
        </div>
    );
};
