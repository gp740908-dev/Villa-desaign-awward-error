
import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { ArrowUpRight, Plus, Minus, Send, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- FAQ DATA ---
const FAQS = [
    {
        question: "Do you offer airport transfers?",
        answer: "Yes, our concierge arranges private luxury transfers from Ngurah Rai International Airport directly to your villa. We offer a fleet ranging from premium SUVs to classic cars, complete with cold towels and refreshments."
    },
    {
        question: "Is breakfast included in the stay?",
        answer: "Absolutely. A curated à la carte breakfast is prepared daily by your private chef, featuring organic local produce, house-baked pastries, and signature Balinese coffee."
    },
    {
        question: "Can you accommodate special dietary requirements?",
        answer: "Our culinary team is well-versed in all dietary needs including vegan, gluten-free, and keto. Simply inform us prior to arrival, and we will tailor the pantry and menus to your preferences."
    },
    {
        question: "What is the check-in and check-out time?",
        answer: "Check-in begins at 2:00 PM and check-out is at 11:00 AM. However, we offer complimentary early check-in or late check-out subject to availability."
    }
];

// --- COMPONENTS ---

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (isOpen) {
            gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: "power3.out" });
        } else {
            gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: "power3.in" });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-emerald-900/10 last:border-0">
            <button 
                onClick={onClick} 
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="font-serif text-xl md:text-2xl text-emerald-900 group-hover:text-emerald-700 transition-colors pr-8">
                    {question}
                </span>
                <span className="text-emerald-900/40 group-hover:text-emerald-900 transition-colors">
                    {isOpen ? <Minus size={18} strokeWidth={1} /> : <Plus size={18} strokeWidth={1} />}
                </span>
            </button>
            <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
                <p className="font-sans text-emerald-900/70 pb-8 leading-relaxed max-w-2xl">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FormInput: React.FC<{ 
    label: string, 
    type?: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, 
    id: string 
}> = ({ 
    label, 
    type = "text", 
    value, 
    onChange, 
    id 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;

    return (
        <div className="relative group pt-6">
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="block w-full px-0 py-3 text-emerald-900 bg-transparent border-b border-emerald-900/20 focus:border-emerald-900 outline-none transition-all duration-500 font-serif text-xl md:text-2xl placeholder-transparent z-10 relative"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className={`absolute left-0 transition-all duration-500 ease-out pointer-events-none text-emerald-900/40 uppercase tracking-widest text-xs font-bold
                    ${(isFocused || hasValue) ? '-top-0 text-emerald-900 text-[10px]' : 'top-10 text-xs'}
                `}
            >
                {label}
            </label>
            {/* Animated Underline */}
            <div className={`absolute bottom-0 left-0 h-[2px] bg-emerald-900 transition-all duration-500 ease-out ${isFocused ? 'w-full' : 'w-0'}`}></div>
        </div>
    );
};

export const ContactPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Booking Inquiry',
        message: ''
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Split Screen Entry
            gsap.from(".contact-left-content > *", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            // 2. Form Fields Stagger In
            gsap.from(".contact-form-item", {
                x: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.4
            });

            // 3. Info Cards Reveal
            gsap.from(".contact-info-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".contact-info-section",
                    start: "top 85%"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- SUPABASE MOCK LOGIC ---
        // In a real app, you would import 'supabase' client here.
        // const { error } = await supabase.from('contact_messages').insert([formData]);
        
        // Simulating network delay
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: 'Booking Inquiry', message: '' });
            
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div ref={containerRef} className="bg-cream-100 min-h-screen pt-24">
            
            {/* --- SPLIT SCREEN SECTION --- */}
            <div className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 min-h-[80vh] items-center">
                    
                    {/* Left: The Invitation */}
                    <div className="contact-left-content order-2 lg:order-1 text-center lg:text-left">
                        <span className="block text-emerald-900/40 font-bold uppercase tracking-[0.2em] text-xs mb-8">
                            Executive Concierge
                        </span>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-emerald-900 leading-[0.9] mb-8">
                            Let's Begin <br/>
                            <span className="italic font-script font-light text-emerald-500">Your Journey</span>
                        </h1>
                        <p className="font-sans text-xl text-emerald-900/60 leading-relaxed max-w-md mx-auto lg:mx-0 mb-16">
                            Whether you are planning a retreat, seeking a partnership, or simply wish to say hello, our team is at your disposal.
                        </p>
                        
                        <div className="hidden lg:block">
                            <span className="font-script text-6xl text-emerald-900/20">StayinUBUD</span>
                        </div>
                    </div>

                    {/* Right: The Interface */}
                    <div className="order-1 lg:order-2 bg-cream-50 p-8 md:p-12 rounded-sm shadow-[0_20px_50px_-10px_rgba(5,100,8,0.05)] border border-emerald-900/5 relative">
                        {/* Status Overlay */}
                        {submitStatus === 'success' && (
                            <div className="absolute inset-0 z-20 bg-cream-50 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                                <div className="w-16 h-16 rounded-full bg-emerald-900 text-cream-100 flex items-center justify-center mb-6">
                                    <Send size={24} />
                                </div>
                                <h3 className="font-serif text-3xl text-emerald-900 mb-2">Message Received</h3>
                                <p className="font-sans text-emerald-900/60">Our concierge will be in touch shortly.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="contact-form-item">
                                <FormInput 
                                    id="name" 
                                    label="Your Full Name" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                />
                            </div>
                            <div className="contact-form-item">
                                <FormInput 
                                    id="email" 
                                    label="Email Address" 
                                    type="email"
                                    value={formData.email} 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>
                            <div className="contact-form-item pt-6">
                                <label className="block text-[10px] uppercase tracking-widest text-emerald-900/40 mb-2">Subject</label>
                                <div className="relative">
                                    <select 
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className="block w-full bg-transparent border-b border-emerald-900/20 py-3 font-serif text-xl text-emerald-900 focus:outline-none focus:border-emerald-900 appearance-none cursor-pointer"
                                    >
                                        <option>Booking Inquiry</option>
                                        <option>Press & Collaboration</option>
                                        <option>General Concierge</option>
                                    </select>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-900/40">
                                        <Plus size={14} />
                                    </div>
                                </div>
                            </div>
                            <div className="contact-form-item">
                                <div className="relative group pt-6">
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="block w-full px-0 py-3 text-emerald-900 bg-transparent border-b border-emerald-900/20 focus:border-emerald-900 outline-none transition-all duration-500 font-serif text-xl resize-none placeholder-transparent"
                                        placeholder="Message"
                                    ></textarea>
                                    <label
                                        htmlFor="message"
                                        className={`absolute left-0 transition-all duration-500 ease-out pointer-events-none text-emerald-900/40 uppercase tracking-widest text-xs font-bold
                                            ${(formData.message.length > 0) ? '-top-0 text-emerald-900 text-[10px]' : 'top-10 text-xs'}
                                        `}
                                    >
                                        How can we assist you?
                                    </label>
                                </div>
                            </div>

                            <div className="contact-form-item pt-8">
                                <MagneticButton className="w-full">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-emerald-900 text-cream-100 py-5 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                        {!isSubmitting && <ArrowUpRight size={16} />}
                                    </button>
                                </MagneticButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {/* --- DIRECT CONTACT INFO --- */}
            <div className="bg-white border-y border-emerald-900/5 py-24 contact-info-section">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        
                        {/* Card 1 */}
                        <div className="contact-info-card group cursor-pointer">
                            <div className="w-12 h-12 bg-emerald-900/5 rounded-full flex items-center justify-center text-emerald-900 mb-6 mx-auto md:mx-0 group-hover:bg-emerald-900 group-hover:text-cream-100 transition-colors duration-500">
                                <Phone size={20} />
                            </div>
                            <h3 className="font-serif text-2xl text-emerald-900 mb-2">WhatsApp Concierge</h3>
                            <p className="font-sans text-emerald-900/60 mb-4">Available 24/7 for instant assistance.</p>
                            <a href="https://wa.me/6282269128232" className="text-xs uppercase tracking-widest font-bold text-emerald-900 border-b border-emerald-900/20 pb-1 hover:border-emerald-900 transition-all">
                                +62 822 6912 8232
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="contact-info-card group cursor-pointer">
                            <div className="w-12 h-12 bg-emerald-900/5 rounded-full flex items-center justify-center text-emerald-900 mb-6 mx-auto md:mx-0 group-hover:bg-emerald-900 group-hover:text-cream-100 transition-colors duration-500">
                                <Mail size={20} />
                            </div>
                            <h3 className="font-serif text-2xl text-emerald-900 mb-2">Email Us</h3>
                            <p className="font-sans text-emerald-900/60 mb-4">For press & detailed inquiries.</p>
                            <a href="mailto:hello@stayinubud.com" className="text-xs uppercase tracking-widest font-bold text-emerald-900 border-b border-emerald-900/20 pb-1 hover:border-emerald-900 transition-all">
                                hello@stayinubud.com
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="contact-info-card group cursor-pointer">
                            <div className="w-12 h-12 bg-emerald-900/5 rounded-full flex items-center justify-center text-emerald-900 mb-6 mx-auto md:mx-0 group-hover:bg-emerald-900 group-hover:text-cream-100 transition-colors duration-500">
                                <MapPin size={20} />
                            </div>
                            <h3 className="font-serif text-2xl text-emerald-900 mb-2">Office</h3>
                            <p className="font-sans text-emerald-900/60 mb-4">Jalan Raya Sayan, Ubud,<br/>Gianyar, Bali 80571</p>
                            <a href="#" className="text-xs uppercase tracking-widest font-bold text-emerald-900 border-b border-emerald-900/20 pb-1 hover:border-emerald-900 transition-all">
                                View on Map
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <div className="container mx-auto px-6 py-32 max-w-4xl">
                 <div className="text-center mb-16">
                     <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 font-bold block mb-4">Information</span>
                     <h2 className="font-serif text-4xl md:text-5xl text-emerald-900">Frequently Asked Questions</h2>
                 </div>
                 
                 <div className="space-y-2">
                     {FAQS.map((faq, idx) => (
                         <FAQItem 
                            key={idx}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFaqIndex === idx}
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                         />
                     ))}
                 </div>
            </div>

        </div>
    );
};
