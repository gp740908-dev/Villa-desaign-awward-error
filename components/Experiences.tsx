import React from 'react';
import { EXPERIENCES } from '../constants';
import { MagneticButton } from './MagneticButton';

export const Experiences: React.FC = () => {
  return (
    <section className="py-24 bg-cream-200 px-6">
      <div className="container mx-auto">
        <div className="max-w-xl mb-16">
             <h2 className="font-serif text-4xl md:text-5xl text-emerald-800 mb-6">
                Curated Experiences
            </h2>
            <p className="font-sans text-emerald-800/70">
                We believe travel is about the moments that linger. Our concierge team arranges exclusive experiences tailored to your desires.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="bg-cream-100 p-8 border border-emerald-800/5 hover:border-emerald-800/20 transition-colors duration-300 flex flex-col items-start">
                    <div className="w-12 h-12 bg-emerald-800/5 rounded-full flex items-center justify-center mb-6 text-emerald-800">
                        {/* Simple Icon placeholder logic based on type */}
                        {exp.icon === 'yoga' && (
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        {exp.icon === 'dining' && (
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7" /></svg>
                        )}
                        {exp.icon === 'culture' && (
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                        )}
                    </div>
                    <h3 className="font-serif text-xl text-emerald-800 mb-3">{exp.title}</h3>
                    <p className="text-sm text-emerald-800/60 leading-relaxed mb-8 flex-grow">{exp.description}</p>
                    
                    <MagneticButton>
                        <a href="#" className="inline-block px-6 py-2 rounded-full border border-emerald-800/20 text-emerald-800 text-[10px] uppercase tracking-widest hover:bg-emerald-800 hover:text-cream-100 transition-all duration-300">
                            Learn More
                        </a>
                    </MagneticButton>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};