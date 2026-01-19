import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

export const Journal: React.FC = () => {
  return (
    <section id="journal" className="py-32 bg-cream-100 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20 reveal-text-wrapper">
            <span className="reveal-text-item font-script text-4xl text-emerald-600 block mb-2">Editorial</span>
            <h2 className="reveal-text-item font-serif text-5xl md:text-6xl text-emerald-800">The Journal</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
            {BLOG_POSTS.map((post, idx) => (
                <Link 
                    to={`/journal/${post.id}`} 
                    key={post.id} 
                    className={`group cursor-pointer block ${idx === 1 ? 'lg:translate-y-16' : ''}`}
                >
                    <article>
                        <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                            <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 reveal-image"
                            />
                             <div className="absolute top-0 left-0 bg-emerald-800 text-cream-100 px-3 py-1 text-[10px] uppercase tracking-widest">
                                {post.category}
                            </div>
                        </div>
                        <div className="reveal-text-wrapper flex flex-col items-start">
                            <span className="reveal-text-item text-xs font-sans text-emerald-800/50 uppercase tracking-widest mb-3">{post.date}</span>
                            <h3 className="reveal-text-item font-serif text-2xl text-emerald-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
                                {post.title}
                            </h3>
                            <p className="reveal-text-item font-sans text-sm text-emerald-800/70 line-clamp-3">
                                {post.excerpt}
                            </p>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
      </div>
    </section>
  );
};