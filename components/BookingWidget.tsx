import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ChevronRight, ChevronLeft, Minus, Plus, X, ArrowRight, Check, Star } from 'lucide-react';
import { Villa } from '../types';
import { MagneticButton } from './MagneticButton';

interface BookingWidgetProps {
  villa: Villa;
}

// --- CONSTANTS ---
const SERVICE_FEE_PERCENT = 0.10;
const TAX_PERCENT = 0.11;
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// --- UTILS ---
const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

// --- COMPONENTS ---

// 1. Dual Month Calendar
const DualCalendar = ({ 
    checkIn, 
    checkOut, 
    onDateSelect, 
    viewDate, 
    onPrevMonth, 
    onNextMonth 
}: any) => {
    const renderMonth = (offset: number) => {
        const targetDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
        }

        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            const time = date.getTime();
            
            let isSelected = false;
            let isRange = false;
            const isPast = date < new Date(new Date().setHours(0,0,0,0));

            if (checkIn && time === checkIn.getTime()) isSelected = true;
            if (checkOut && time === checkOut.getTime()) isSelected = true;
            if (checkIn && checkOut && time > checkIn.getTime() && time < checkOut.getTime()) isRange = true;

            days.push(
                <button
                    key={d}
                    disabled={isPast}
                    onClick={() => onDateSelect(date)}
                    className={`h-10 w-10 text-sm font-sans flex items-center justify-center relative transition-all duration-300
                        ${isPast ? 'text-emerald-900/20 cursor-not-allowed' : 'text-emerald-900 hover:text-emerald-700'}
                        ${isSelected ? 'bg-emerald-900 text-cream-100 rounded-full shadow-lg z-10' : ''}
                        ${isRange ? 'bg-emerald-900/10' : ''}
                        ${isRange && d === 1 ? 'rounded-l-full' : ''}
                        ${isRange && d === daysInMonth ? 'rounded-r-full' : ''}
                    `}
                >
                    {d}
                </button>
            );
        }

        return (
            <div className="w-full">
                <div className="text-center font-serif text-emerald-900 mb-6">{MONTH_NAMES[month]} {year}</div>
                <div className="grid grid-cols-7 gap-y-2 justify-items-center mb-2">
                    {['S','M','T','W','T','F','S'].map((d,i) => <span key={i} className="text-[10px] font-bold text-emerald-900/40">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 rounded-sm border border-emerald-900/10">
            <div className="flex items-start justify-between">
                <button onClick={onPrevMonth} className="p-2 hover:bg-emerald-50 rounded-full transition-colors"><ChevronLeft size={20} className="text-emerald-900"/></button>
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center">
                    <div className="hidden md:block">{renderMonth(0)}</div>
                    <div className="block md:hidden">{renderMonth(0)}</div> {/* Mobile: Show 1 */}
                    <div className="hidden md:block">{renderMonth(1)}</div>
                </div>
                <button onClick={onNextMonth} className="p-2 hover:bg-emerald-50 rounded-full transition-colors"><ChevronRight size={20} className="text-emerald-900"/></button>
            </div>
        </div>
    );
};

// --- MAIN WIDGET ---

export const BookingWidget: React.FC<BookingWidgetProps> = ({ villa }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [viewDate, setViewDate] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Booking Data
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', requests: '' });

  // Refs for animations
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  
  // Rolling Price
  const [displayTotal, setDisplayTotal] = useState(0);

  // --- CALCULATIONS ---
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }, [checkIn, checkOut]);

  const subtotal = villa.pricePerNight * nights;
  const serviceFee = subtotal * SERVICE_FEE_PERCENT;
  const taxes = (subtotal + serviceFee) * TAX_PERCENT;
  const total = nights > 0 ? subtotal + serviceFee + taxes : 0;

  // Rolling Number Effect
  useEffect(() => {
      const obj = { val: displayTotal };
      gsap.to(obj, {
          val: total,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => setDisplayTotal(obj.val)
      });
  }, [total]);

  // Confirmation Animation
  useEffect(() => {
    if (showConfirmation && confirmationRef.current) {
        gsap.fromTo(confirmationRef.current, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );
    }
  }, [showConfirmation]);

  // --- HANDLERS ---
  const openModal = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      // Animation handled in useEffect
  };

  const closeModal = () => {
      const tl = gsap.timeline({ onComplete: () => {
          setIsOpen(false);
          document.body.style.overflow = '';
          setStep(1); // Reset
          setShowConfirmation(false);
      }});
      tl.to(contentRef.current, { y: 50, opacity: 0, duration: 0.4, ease: "power2.in" })
        .to(modalRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  useEffect(() => {
      if (isOpen && modalRef.current && contentRef.current) {
          const tl = gsap.timeline();
          tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
            .fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");
      }
  }, [isOpen]);

  const handleDateSelect = (date: Date) => {
    if ((checkIn && checkOut) || (checkIn && date < checkIn)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (!checkIn) {
      setCheckIn(date);
    } else {
      setCheckOut(date);
    }
  };

  const goToStep = (newStep: 1 | 2 | 3) => {
      if (newStep > step) {
          // Next
          gsap.to(stepsContainerRef.current, { x: -50, opacity: 0, duration: 0.3, onComplete: () => {
              setStep(newStep);
              gsap.fromTo(stepsContainerRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
          }});
      } else {
          // Prev
          gsap.to(stepsContainerRef.current, { x: 50, opacity: 0, duration: 0.3, onComplete: () => {
              setStep(newStep);
              gsap.fromTo(stepsContainerRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
          }});
      }
  };

  const handleWhatsAppRedirect = () => {
      const phoneNumber = "6282269128232";
      
      const message = 
`*Reservation Request - StayinUBUD*
--------------------------------
*Villa:* ${villa.name}
*Location:* ${villa.location}

*Details:*
📅 Check-in: ${checkIn?.toLocaleDateString('en-GB')}
📅 Check-out: ${checkOut?.toLocaleDateString('en-GB')}
🌙 Nights: ${nights}
👥 Guests: ${guests.adults} Adults, ${guests.children} Children

*Guest Info:*
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}

*Payment Estimate:*
💰 Total: ${formatCurrency(total)}

*Special Requests:*
${formData.requests || "None"}
--------------------------------
I would like to check availability for these dates.`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      
      setShowConfirmation(false);
      closeModal();
  };

  // --- RENDERERS ---

  // Sidebar Widget (Collapsed State)
  const renderSidebar = () => (
    <div className="bg-cream-50 p-8 rounded-sm border border-emerald-900/10 shadow-lg">
        <div className="flex justify-between items-start mb-6 border-b border-emerald-900/10 pb-6">
            <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-900/40 block mb-2">Price Per Night</span>
                <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-3xl text-emerald-900">
                        {formatCurrency(villa.pricePerNight)}
                    </span>
                    <span className="text-xs text-emerald-900/50">IDR</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                 <div className="flex items-center space-x-1 mb-1">
                    <Star size={14} className="fill-emerald-900 text-emerald-900"/>
                    <span className="font-bold text-emerald-900 text-sm">5.0</span>
                 </div>
                 <span className="text-[10px] text-emerald-900/40 underline">12 Reviews</span>
            </div>
        </div>

        <div className="space-y-4">
             <div onClick={openModal} className="grid grid-cols-2 gap-px bg-emerald-900/10 border border-emerald-900/10 rounded-sm overflow-hidden cursor-pointer">
                  <div className="bg-white p-3 hover:bg-emerald-50 transition-colors">
                      <span className="block text-[10px] uppercase tracking-widest text-emerald-900/40 mb-1">Check-in</span>
                      <span className="font-serif text-sm text-emerald-900">{checkIn ? checkIn.toLocaleDateString() : 'Add date'}</span>
                  </div>
                  <div className="bg-white p-3 hover:bg-emerald-50 transition-colors">
                      <span className="block text-[10px] uppercase tracking-widest text-emerald-900/40 mb-1">Check-out</span>
                      <span className="font-serif text-sm text-emerald-900">{checkOut ? checkOut.toLocaleDateString() : 'Add date'}</span>
                  </div>
             </div>
             
             <MagneticButton className="w-full">
                <button 
                    onClick={openModal}
                    className="w-full bg-emerald-900 text-cream-100 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center space-x-2"
                >
                    <span>Check Availability</span>
                </button>
             </MagneticButton>
        </div>
        
        <div className="mt-6 text-center">
            <span className="text-[10px] text-emerald-900/40">Luxury Concierge Service Included</span>
        </div>
    </div>
  );

  // Modal Flow
  const renderFlow = () => (
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full lg:h-auto min-h-full lg:min-h-[600px]">
          
          {/* LEFT COL: STEPS */}
          <div className="lg:col-span-7 p-6 md:p-12 bg-cream-50 flex flex-col justify-between overflow-y-auto">
              <div>
                  <div className="flex items-center space-x-4 mb-8">
                       {step > 1 && (
                           <button onClick={() => goToStep((step - 1) as 1|2)} className="text-emerald-900/40 hover:text-emerald-900 transition-colors">
                               <ChevronLeft />
                           </button>
                       )}
                       <span className="text-[10px] uppercase tracking-widest text-emerald-900/40">Step {step} of 3</span>
                  </div>

                  <div ref={stepsContainerRef} className="min-h-[400px] relative">
                      {step === 1 && (
                          <div className="space-y-8">
                              <h2 className="font-serif text-3xl md:text-4xl text-emerald-900">Select Your Dates</h2>
                              <DualCalendar 
                                  checkIn={checkIn}
                                  checkOut={checkOut}
                                  viewDate={viewDate}
                                  onDateSelect={handleDateSelect}
                                  onPrevMonth={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
                                  onNextMonth={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
                              />
                              <div className="flex items-center justify-between bg-white p-4 rounded-sm border border-emerald-900/10 max-w-sm">
                                   <span className="font-serif text-emerald-900">Adults</span>
                                   <div className="flex items-center space-x-4">
                                      <button onClick={() => setGuests(p => ({...p, adults: Math.max(1, p.adults - 1)}))} className="w-8 h-8 rounded-full border border-emerald-900/20 flex items-center justify-center hover:bg-emerald-900 hover:text-cream-100 transition-colors"><Minus size={14}/></button>
                                      <span className="font-sans w-4 text-center">{guests.adults}</span>
                                      <button onClick={() => setGuests(p => ({...p, adults: Math.min(villa.guests, p.adults + 1)}))} className="w-8 h-8 rounded-full border border-emerald-900/20 flex items-center justify-center hover:bg-emerald-900 hover:text-cream-100 transition-colors"><Plus size={14}/></button>
                                   </div>
                              </div>

                              {/* MOBILE PRICE SUMMARY */}
                              {checkIn && checkOut && nights > 0 && (
                                <div className="lg:hidden mt-6 p-4 bg-emerald-50 rounded-sm border border-emerald-900/10 animate-fade-in">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-emerald-900/60 font-sans">{formatCurrency(villa.pricePerNight)} x {nights} nights</span>
                                        <span className="font-serif text-emerald-900">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-emerald-900/60 font-sans">Service & Taxes (21%)</span>
                                        <span className="font-serif text-emerald-900">{formatCurrency(serviceFee + taxes)}</span>
                                    </div>
                                    <div className="h-px bg-emerald-900/10 my-3"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-900">Total</span>
                                        <span className="font-serif text-2xl text-emerald-900 leading-none">{formatCurrency(total)}</span>
                                    </div>
                                </div>
                              )}

                              <div className="pt-4">
                                  <MagneticButton>
                                    <button 
                                        onClick={() => goToStep(2)}
                                        disabled={!checkIn || !checkOut}
                                        className="bg-emerald-900 text-cream-100 px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Continue to Details
                                    </button>
                                  </MagneticButton>
                              </div>
                          </div>
                      )}

                      {step === 2 && (
                          <div className="space-y-8">
                              <h2 className="font-serif text-3xl md:text-4xl text-emerald-900">Personal Details</h2>
                              <div className="space-y-6 max-w-lg">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="relative group">
                                            <input 
                                                type="text" 
                                                className="block w-full px-0 py-3 text-emerald-900 bg-transparent border-b border-emerald-900/20 focus:outline-none focus:border-emerald-900 transition-colors font-sans text-lg placeholder-transparent"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            />
                                            <label className="absolute left-0 -top-3 text-[10px] uppercase tracking-widest text-emerald-900/40">First Name</label>
                                        </div>
                                        <div className="relative group">
                                            <input 
                                                type="text" 
                                                className="block w-full px-0 py-3 text-emerald-900 bg-transparent border-b border-emerald-900/20 focus:outline-none focus:border-emerald-900 transition-colors font-sans text-lg placeholder-transparent"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            />
                                            <label className="absolute left-0 -top-3 text-[10px] uppercase tracking-widest text-emerald-900/40">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <input 
                                            type="email" 
                                            className="block w-full px-0 py-3 text-emerald-900 bg-transparent border-b border-emerald-900/20 focus:outline-none focus:border-emerald-900 transition-colors font-sans text-lg placeholder-transparent"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                        <label className="absolute left-0 -top-3 text-[10px] uppercase tracking-widest text-emerald-900/40">Email Address</label>
                                    </div>
                                    <div className="relative group pt-4">
                                        <label className="block text-[10px] uppercase tracking-widest text-emerald-900/40 mb-2">Special Requests</label>
                                        <textarea 
                                            rows={3}
                                            className="block w-full px-4 py-3 text-emerald-900 bg-white border border-emerald-900/10 focus:outline-none focus:border-emerald-900/40 transition-colors font-sans resize-none rounded-sm"
                                            placeholder="Any dietary requirements or special occasions?"
                                            style={{ fontFamily: 'Satoshi, sans-serif' }} 
                                            value={formData.requests}
                                            onChange={(e) => setFormData({...formData, requests: e.target.value})}
                                        />
                                        <p className="text-right text-[10px] text-emerald-900/40 mt-1 font-script text-lg">We'll do our best to accommodate you.</p>
                                    </div>
                              </div>
                              <div className="pt-4">
                                  <MagneticButton>
                                    <button 
                                        onClick={() => goToStep(3)}
                                        disabled={!formData.firstName || !formData.email}
                                        className="bg-emerald-900 text-cream-100 px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Review Booking
                                    </button>
                                  </MagneticButton>
                              </div>
                          </div>
                      )}

                      {step === 3 && (
                          <div className="space-y-8 relative h-full">
                              <h2 className="font-serif text-3xl md:text-4xl text-emerald-900">Confirm Reservation</h2>
                              <div className="bg-white p-8 border border-emerald-900/5 max-w-lg">
                                  <p className="font-sans text-emerald-900/70 mb-6">
                                    Please review your details below. By clicking "Request Reservation", you agree to our terms of service. You will be redirected to WhatsApp to finalize details with our concierge.
                                  </p>
                                  <div className="space-y-4 mb-8">
                                      <div className="flex justify-between border-b border-emerald-900/5 pb-2">
                                          <span className="text-sm text-emerald-900/50">Guest</span>
                                          <span className="font-serif text-emerald-900">{formData.firstName} {formData.lastName}</span>
                                      </div>
                                      <div className="flex justify-between border-b border-emerald-900/5 pb-2">
                                          <span className="text-sm text-emerald-900/50">Contact</span>
                                          <span className="font-serif text-emerald-900">{formData.email}</span>
                                      </div>
                                      <div className="flex justify-between border-b border-emerald-900/5 pb-2">
                                          <span className="text-sm text-emerald-900/50">Dates</span>
                                          <span className="font-serif text-emerald-900">{checkIn?.toLocaleDateString()} - {checkOut?.toLocaleDateString()}</span>
                                      </div>
                                       <div className="flex justify-between border-b border-emerald-900/5 pb-2 pt-2">
                                          <span className="text-sm text-emerald-900/50">Total Amount</span>
                                          <span className="font-serif text-xl text-emerald-900">{formatCurrency(total)}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="pt-4">
                                  <MagneticButton>
                                    <button 
                                        onClick={() => setShowConfirmation(true)}
                                        className="w-full md:w-auto bg-emerald-900 text-cream-100 px-12 py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 transition-all shadow-xl flex items-center justify-center space-x-3"
                                    >
                                        <span>Request Reservation</span>
                                        <Check size={16} />
                                    </button>
                                  </MagneticButton>
                              </div>

                              {/* CONFIRMATION OVERLAY */}
                              {showConfirmation && (
                                <div className="absolute inset-0 bg-cream-50/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 rounded-sm border border-emerald-900/10" ref={confirmationRef}>
                                    <div className="max-w-xs w-full">
                                        <h3 className="font-serif text-2xl text-emerald-900 mb-3">Finalize Request?</h3>
                                        <p className="font-sans text-sm text-emerald-900/60 mb-8">
                                            You are about to open WhatsApp to connect with our concierge.
                                        </p>
                                        
                                        <div className="space-y-3">
                                            <button 
                                                onClick={handleWhatsAppRedirect}
                                                className="w-full bg-emerald-900 text-cream-100 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-emerald-800 transition-colors shadow-lg"
                                            >
                                                Open WhatsApp
                                            </button>
                                            <button 
                                                onClick={() => setShowConfirmation(false)}
                                                className="w-full py-3 text-emerald-900/50 hover:text-emerald-900 uppercase tracking-widest text-[10px] font-bold transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>
          </div>

          {/* RIGHT COL: RECEIPT SUMMARY */}
          <div className="hidden lg:block lg:col-span-5 bg-emerald-900 text-cream-100 p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 pointer-events-none"></div>
                <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center space-x-2 text-white/50 mb-12">
                         <div className="h-px w-8 bg-white/30"></div>
                         <span className="text-[10px] uppercase tracking-widest">Booking Summary</span>
                    </div>

                    <h3 className="font-serif text-4xl mb-2">{villa.name}</h3>
                    <p className="text-emerald-300 font-script text-2xl mb-12">{villa.location}</p>

                    {checkIn && checkOut ? (
                        <div className="space-y-6 flex-grow">
                             <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                                 <span className="font-sans text-white/70">{formatCurrency(villa.pricePerNight)} × {nights} Nights</span>
                                 <span className="font-serif">{formatCurrency(subtotal)}</span>
                             </div>
                             <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                                 <span className="font-sans text-white/70">Service Fee (10%)</span>
                                 <span className="font-serif">{formatCurrency(serviceFee)}</span>
                             </div>
                             <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                                 <span className="font-sans text-white/70">Taxes (11%)</span>
                                 <span className="font-serif">{formatCurrency(taxes)}</span>
                             </div>

                             <div className="pt-8">
                                 <span className="block text-[10px] uppercase tracking-widest text-emerald-400 mb-2">Grand Total</span>
                                 <div className="font-serif text-5xl md:text-6xl text-white leading-none">
                                     {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(displayTotal)}
                                 </div>
                             </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center opacity-30">
                            <p className="font-serif text-2xl text-center">Select dates to view summary</p>
                        </div>
                    )}

                    <div className="mt-12 opacity-50 text-[10px] uppercase tracking-widest">
                        StayinUBUD Executive Collection
                    </div>
                </div>
          </div>
      </div>
  );

  return (
    <>
        {/* Desktop Sidebar Trigger */}
        <div className="hidden lg:block sticky top-32 z-30">
            {renderSidebar()}
        </div>

        {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-cream-100 border-t border-emerald-900/10 p-4 shadow-2xl">
            <div className="flex items-center justify-between">
                <div>
                     <span className="text-[10px] uppercase tracking-widest text-emerald-900/50 block">Starting From</span>
                     <span className="font-serif text-xl text-emerald-900">{formatCurrency(villa.pricePerNight)}</span>
                </div>
                <MagneticButton>
                    <button onClick={openModal} className="bg-emerald-900 text-cream-100 px-6 py-3 rounded-full uppercase tracking-widest text-xs font-bold">
                        Check Availability
                    </button>
                </MagneticButton>
            </div>
        </div>

        {/* FULL SCREEN MODAL */}
        {isOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-6">
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm"
                    onClick={closeModal}
                ></div>
                
                {/* Modal Content */}
                <div 
                    ref={modalRef} 
                    className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-cream-50 rounded-none md:rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    <button 
                        onClick={closeModal}
                        className="absolute top-6 right-6 z-50 p-2 bg-cream-100/10 hover:bg-emerald-900 hover:text-white rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <div ref={contentRef} className="w-full h-full overflow-y-auto md:overflow-visible">
                        {renderFlow()}
                    </div>
                </div>
            </div>
        )}
    </>
  );
};