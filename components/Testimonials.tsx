import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const featuredTestimonial = TESTIMONIALS.length > 0 ? TESTIMONIALS[0] : null;

  if (!featuredTestimonial) return null;

  return (
    <section className="py-32 bg-cream-100 px-6 border-b border-emerald-800/10">
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="w-12 h-12 text-emerald-800/10 mx-auto mb-12" />
        
        {/* Just showing the first one for the minimalist design, could carousel */}
        <div className="mb-12">
            <h3 className="font-serif text-3xl md:text-5xl text-emerald-900 leading-tight italic">
                "{featuredTestimonial.quote}"
            </h3>
        </div>
        
        <div className="flex flex-col items-center">
            <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-1">{featuredTestimonial.author}</span>
            <span className="text-emerald-800/50 text-xs font-sans">{featuredTestimonial.location}</span>
        </div>
      </div>
    </section>
  );
};