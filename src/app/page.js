'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  User,
  Send,
  Plus,
  Minus,
  Award,
  Sparkles,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  Calendar
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setContactData({ name: '', phone: '', email: '', message: '' });
  };

  const services = [
    { num: '01', title: 'Model Auditions & Talent Hunt' },
    { num: '02', title: 'Professional Model Grooming' },
    { num: '03', title: 'Fashion Show & Runway Training' },
    { num: '04', title: 'Portfolio & Photoshoot Management' },
    { num: '05', title: 'Brand & Fashion Collaborations' },
    { num: '06', title: 'Celebrity & Industry Networking' },
    { num: '07', title: 'Model Management' },
    { num: '08', title: 'Commercial Modeling Opportunities' },
    { num: '09', title: 'Pageant & Competition Preparation' },
    { num: '10', title: 'Career & Industry Guidance' }
  ];

  const faqs = [
    { q: "How can I apply?", a: "Go to the Become a Model page, complete the multi-step registration form with your physical details, attach your Government ID proof and photoshoots, and complete the digital application fee." },
    { q: "What are the eligibility requirements?", a: "Review our eligibility checklist (age 18-33, height 5'3\" for females, 5'7\" for males) and keep a Government ID proof and three photographs ready." },
    { q: "Who can participate?", a: "Aspiring male and female models who meet the physical height criteria, age parameters, and are Indian Nationals or NRI status holders." },
    { q: "Can beginners participate?", a: "Yes. NINTM welcomes freshers and aspiring models. The platform discoveries raw potential and guides them to meet global standards." },
    { q: "What happens after registration?", a: "Your candidate dossier will be cached in our database. The director office will dispatch your invitation and audition venue coordinates via SMS/email." },
    { q: "What happens after the audition?", a: "Selected candidates progress through grooming bootcamps, physical look tests, catalog shoots, and styling rounds towards the Grand Finale in Dec 2026." },
    { q: "What kind of training is provided?", a: "Comprehensive grooming covering runway ramp walks, posing guides under directors, confidence drills, communications, diet and style advisory." },
    { q: "Will I get professional exposure?", a: "Yes. Finalists are placed directly in front of lead fashion designers, advertising directors, print media photographers, and casting agents." },
    { q: "What can the winner expect?", a: "The grand winner will receive a professional work contract worth ₹15 Lakhs INR, legally guaranteed on Stamp Paper with Creativatorss." },
    { q: "Where can I get audition updates?", a: "Follow the official NINTM by Creativatorss social media channels and check your profile dashboard for real-time news." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-luxury-black font-sans selection:bg-gold-champagne selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] lg:h-screen w-full flex items-center justify-between overflow-hidden bg-white pt-24 lg:pt-16 pb-12">
        <div className="absolute inset-0 bg-[#FAF8F3]/40 z-0" />

        {/* Subtle oversized background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
          <span className="font-serif text-[28vw] font-bold tracking-widest text-[#B8903F]">
            NINTM
          </span>
        </div>

        {/* Decorative thin gold lines and circular arcs */}
        <div className="absolute top-24 left-1/4 w-96 h-96 border border-[#B8903F]/10 rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-16 right-1/4 w-[500px] h-[500px] border border-[#B8903F]/5 rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-gold-champagne/15 pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-12 w-2 h-2 rounded-full bg-[#C9A45C]/35 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full h-full grid grid-cols-1 lg:grid-cols-10 gap-8 relative z-10 items-center">

          {/* LEFT: Female Model Frame (desktop) */}
          <div className="hidden lg:block lg:col-span-3 h-[72vh] relative">
            {/* Circular gold line behind the female model */}
            <div className="absolute -top-8 -left-8 w-[320px] h-[320px] rounded-full border border-gold-champagne/15 pointer-events-none z-0" />
            <div className="relative w-full h-full overflow-hidden z-10">
              <Image
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800"
                alt="NINTM Female High-End Model"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 25vw"
                quality={80}
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* CENTER: Editorial Typography content */}
          <div className="lg:col-span-4 text-center flex flex-col items-center justify-center space-y-6 py-6 md:py-12 z-20">

            {/* Mobile Model Banner (Only visible on mobile) */}
            <div className="block lg:hidden w-full aspect-[3/4] relative max-w-[280px] mx-auto mb-6 border border-zinc-200 p-1.5 bg-white shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800"
                alt="Model Auditions Banner"
                fill
                sizes="(max-width: 768px) 280px, 300px"
                quality={80}
                className="object-cover object-top"
                priority
              />
            </div>

            <span className="text-[10px] md:text-xs text-gold-champagne tracking-[0.45em] font-bold uppercase block font-sans">
              NORTH INDIA&apos;S NEXT TOP MODELS
            </span>

            {/* Main Header */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl md:text-[42px] lg:text-[48px] font-light tracking-[0.08em] text-[#111111] uppercase leading-tight">
                THE STAGE IS READY.
              </h1>
              <h1 className="font-serif text-3xl md:text-[42px] lg:text-[48px] font-light tracking-[0.08em] text-[#111111] uppercase leading-tight">
                THE SPOTLIGHT IS WAITING.
              </h1>
            </div>

            {/* Indian-inspired / Namaste-style tiny diamond separator */}
            <div className="flex items-center gap-3 w-48 justify-center">
              <span className="h-[0.5px] bg-[#B8903F]/40 flex-grow" />
              <span className="w-1.5 h-1.5 bg-[#B8903F] rotate-45 shrink-0" />
              <span className="h-[0.5px] bg-[#B8903F]/40 flex-grow" />
            </div>

            <p className="max-w-xs text-base text-zinc-[650] font-sans tracking-wide leading-relaxed font-normal">
              Discovering, grooming and empowering the next generation of fashion and modeling talent across North India.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
              <Link
                href="/register"
                className="px-6 py-3 bg-gold-champagne hover:bg-black text-white font-sans font-bold text-[10px] tracking-[0.25em] transition-colors duration-300 w-full sm:w-auto uppercase"
              >
                REGISTER NOW
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-white border border-gold-champagne text-gold-champagne hover:bg-[#FAF8F3] font-sans font-bold text-[10px] tracking-[0.25em] transition-colors duration-300 w-full sm:w-auto uppercase"
              >
                DISCOVER NINTM
              </Link>
            </div>

            <div className="space-y-4 pt-3 flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-bold block">
                Where Talent Meets Opportunity.
              </span>

              {/* Subtle Scroll Indicator */}
              <a href="#stats" className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-gold-champagne transition-colors mt-4">
                <span className="text-[8px] tracking-[0.3em] uppercase font-bold">EXPLORE MORE ↓</span>
              </a>
            </div>

          </div>

          {/* RIGHT: Male Model Frame (desktop) */}
          <div className="hidden lg:block lg:col-span-3 h-[72vh] relative">
            {/* Circular gold line behind the male model */}
            <div className="absolute -bottom-8 -right-8 w-[320px] h-[320px] rounded-full border border-gold-champagne/15 pointer-events-none z-0" />
            <div className="relative w-full h-full overflow-hidden z-10">
              <Image
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800"
                alt="NINTM Male High-End Model"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 25vw"
                quality={80}
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="bg-[#FAF8F3] py-14 border-y border-[#EAEAEA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-200">

          {/* Stat 1: 2012 */}
          <div className="flex flex-col items-center space-y-2.5 text-center md:pb-0 pb-6">
            <div className="text-gold-champagne">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 15.5c-1.5-2.5-1.2-6 .8-8.5" />
                <path d="M4.5 13.5c-.8-1.5-.7-3.5.5-5" />
                <path d="M5.5 10.5c-.5-1-.2-2.3.8-3.2" />
                <path d="M19.5 15.5c1.5-2.5 1.2-6-.8-8.5" />
                <path d="M19.5 13.5c.8-1.5.7-3.5-.5-5" />
                <path d="M18.5 10.5c.5-1 .2-2.3-.8-3.2" />
                <path d="M12 3a9 9 0 00-6.36 15.36M12 3a9 9 0 016.36 15.36" />
                <polygon points="12 8.5 13.5 11.5 16.5 11.5 14 13.5 15 16.5 12 14.5 9 16.5 10 13.5 7.5 11.5 10.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-[#111111] tracking-wide">
              2012
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#111111] font-bold font-sans mt-0.5">
              SINCE 2012
            </div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5 font-normal">
              12+ Years of Legacy
            </div>
          </div>

          {/* Stat 2: M & F */}
          <div className="flex flex-col items-center space-y-2.5 text-center pt-6 md:pt-0 pb-6 md:pb-0">
            <div className="text-gold-champagne">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="9" cy="8" r="3.5" />
                <path d="M3 19.5c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5" />
                <circle cx="16" cy="9.5" r="2.8" />
                <path d="M12 19.5c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-[#111111] tracking-wide">
              M & F
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#111111] font-bold font-sans mt-0.5">
              MALE & FEMALE
            </div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5 font-normal">
              Open Participation
            </div>
          </div>

          {/* Stat 3: 15L+ */}
          <div className="flex flex-col items-center space-y-2.5 text-center pt-6 md:pt-0 pb-6 md:pb-0">
            <div className="text-gold-champagne">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 9H4.5a2 2 0 01-2-2V6a2 2 0 012-2h15A2 2 0 0121.5 6v1a2 2 0 01-2 2H18" />
                <path d="M6 4v5c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5V4" />
                <path d="M12 14.5v5m-4 0h8m-6 3h4" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-gold-champagne tracking-wide">
              ₹15 L+
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#111111] font-bold font-sans mt-0.5">
              WINNER WORK CONTRACT
            </div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5 font-normal">
              Worth Fifteen Lakhs
            </div>
          </div>

          {/* Stat 4: DEC '26 */}
          <div className="flex flex-col items-center space-y-2.5 text-center pt-6 md:pt-0">
            <div className="text-gold-champagne">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M16 2v4M8 2v4" />
                <polygon points="12 11.5 13 13.5 15.2 13.5 13.5 15 14 17.2 12 15.7 10 17.2 10.5 15 8.8 13.5 11 13.5" fill="currentColor" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-[#111111] tracking-wide">
              DEC &apos;26
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#111111] font-bold font-sans mt-0.5">
              DECEMBER 2026
            </div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5 font-normal">
              Grand Finale
            </div>
          </div>

        </div>
      </section>

      {/* The Comeback Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Black and White Fashion Models image */}
          <div className="aspect-[4/3] relative border border-zinc-250 p-2 bg-[#FAF8F3]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=75&w=800"
                alt="NINTM Comeback Campaign Showcase"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                quality={75}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* RIGHT: Story and details */}
          <div className="space-y-6">
            <span className="text-[10px] text-gold-champagne tracking-[0.35em] font-extrabold uppercase font-sans">
              NINTM
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
              THE COMEBACK
            </h2>
            <div className="w-16 h-[1px] bg-gold-champagne" />

            <div className="text-zinc-500 text-xs md:text-sm font-sans space-y-4 leading-relaxed font-normal">
              <p>
                North India&apos;s Next Top Models (NINTM) has been one of North India&apos;s most successful model hunt platforms for male and female talent since 2012.
              </p>
              <p>
                After a significant break following the COVID-19 pandemic, NINTM – The Comeback marks the return of this iconic model hunt in a bigger and more rewarding format.
              </p>
              <p>
                NINTM is more than just a competition. It is a career-building platform designed to discover, groom and promote the next generation of fashion talent.
              </p>
            </div>

            {/* Winner Opportunity Card */}
            <div className="mt-8 border border-gold-champagne/30 bg-[#FAF8F3]/60 p-6 relative max-w-md">
              <span className="absolute top-2 left-6 text-gold-champagne font-serif text-4xl opacity-50">&ldquo;</span>
              <div className="pl-6 space-y-2 pt-2">
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">
                  OFFICIAL WINNER CONTRACT DESIGNATION
                </span>
                <p className="text-xs text-zinc-400">
                  The winner will receive a professional work contract worth
                </p>
                <div className="font-serif text-3xl font-extrabold tracking-wide text-gold-champagne py-1">
                  ₹15 LAKHS
                </div>
                <p className="text-[9px] text-[#111111] font-bold tracking-wider uppercase font-sans">
                  INR ON STAMP PAPER WITH CREATIVATORSS
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why NINTM section */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center space-y-12">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
              WHY NINTM?
            </h2>
            <p className="text-[10px] md:text-xs text-gold-champagne tracking-[0.25em] font-extrabold uppercase font-sans">
              MORE THAN A COMPETITION. A PLATFORM FOR YOUR CAREER.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
            {[
              {
                num: '01',
                title: 'DISCOVER YOUR POTENTIAL',
                desc: 'A platform to showcase your unique personality, confidence, style and individuality.'
              },
              {
                num: '02',
                title: 'PROFESSIONAL DEVELOPMENT',
                desc: 'Gain exposure to grooming, runway, posing, personality development and industry standards.'
              },
              {
                num: '03',
                title: 'REAL INDUSTRY EXPOSURE',
                desc: 'Experience professional shoots, fashion shows, campaigns, events and networking opportunities.'
              },
              {
                num: '04',
                title: 'CAREER OPPORTUNITIES',
                desc: 'Open doors to modeling, fashion, advertising, media and entertainment projects.'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-zinc-200/80 p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:border-gold-champagne/40 hover:shadow-lg group"
              >
                <span className="font-serif text-2xl font-bold text-gold-champagne/80 block mb-4">
                  {card.num}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#111111] tracking-wide mb-3 uppercase">
                  {card.title}
                </h4>
                <p className="text-zinc-650 text-xs font-sans leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6 md:px-12 w-full text-center space-y-12 scroll-mt-20">
        <div className="space-y-3">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
            SERVICES
          </h2>
          <p className="text-[10px] md:text-xs text-gold-champagne tracking-[0.25em] font-extrabold uppercase font-sans">
            BUILDING TALENT. CREATING OPPORTUNITIES.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pt-6">
          {services.map((srv, idx) => (
            <div key={idx} className="border border-zinc-200 bg-[#FAF8F3]/50 p-6 text-left hover:border-gold-champagne/30 transition-all">
              <span className="font-mono text-zinc-400 text-xs block mb-3 font-semibold">{srv.num}</span>
              <h4 className="font-serif text-xs font-bold text-[#111111] uppercase tracking-wide leading-snug">
                {srv.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Creativatorss Section */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-baseline">

          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-extrabold text-gold-champagne uppercase block">
              MANAGED BY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] uppercase">
              CREATIVATORSS
            </h2>
            <div className="w-12 h-[1px] bg-gold-champagne" />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <p className="text-zinc-650 text-xs md:text-sm font-sans leading-relaxed">
              33 Talent Management & Digitech Pvt. Ltd. is a dynamic Event Management, Talent Management, Fashion, Media and Brand Consulting company dedicated to creating impactful experiences and meaningful opportunities. Creativatorss brings a complete talent and production backbone to NINTM.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-200 pt-6">
              {['EVENT MANAGEMENT', 'TALENT MANAGEMENT', 'FASHION & MEDIA'].map((dept) => (
                <div key={dept} className="border border-gold-champagne/20 bg-white p-4">
                  <span className="text-[9.5px] uppercase tracking-widest text-[#111111] font-bold font-sans">
                    {dept}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center text-zinc-500 font-sans text-xs pt-2">
              <MapPin className="w-4 h-4 text-gold-champagne" />
              <span>DLF Phase 5, Sector 43, Gurugram, Haryana – 122002</span>
            </div>
          </div>

        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 w-full text-center space-y-16">
        <div className="space-y-3">
          <span className="text-[10px] tracking-[0.3em] text-gold-champagne font-extrabold uppercase font-sans block">
            OUR HISTORICAL PATH
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
            OUR LEGACY TIMELINE
          </h2>
          <div className="w-16 h-[1px] bg-gold-champagne mx-auto" />
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l border-zinc-200 text-left pl-8 md:pl-12 space-y-12 max-w-2xl mx-auto font-sans">

          {/* Item 1 */}
          <div className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-white border-2 border-gold-champagne rounded-full group-hover:bg-gold-champagne transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-gold-champagne block leading-none">2012</span>
              <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Brand Established</h4>
              <p className="text-zinc-[650] text-[16px] leading-relaxed font-normal">
                Launch of the inaugural season of North India&apos;s Next Top Model search, pioneering organized regional casting auditions across major North Indian cities.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-white border-2 border-gold-champagne rounded-full group-hover:bg-gold-champagne transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-gold-champagne block leading-none">2012 – 2020</span>
              <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">The Legacy Runway Journey</h4>
              <p className="text-zinc-[650] text-[16px] leading-relaxed font-normal">
                Successfully held consecutive annual runway seasons, discovering rising talent like Sara Gurpal, Sabby Suri, and Abhinav Dhir, training over 1000+ fashion aspirants.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-white border-2 border-gold-champagne rounded-full group-hover:bg-gold-champagne transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-gold-champagne block leading-none">2020 – 2025</span>
              <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Strategic Sabbatical & Covid Pause</h4>
              <p className="text-zinc-[650] text-[16px] leading-relaxed font-normal">
                Auditions and live physical pageants paused globally. Our director office focused on digital portfolio masterclasses and revamped the competition model.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-white border-2 border-gold-champagne rounded-full group-hover:bg-gold-champagne transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-gold-champagne block leading-none">2026</span>
              <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">NINTM – The Comeback</h4>
              <p className="text-zinc-[650] text-[16px] leading-relaxed font-normal">
                Refreshed, bolder, and more rewarding restart: introducing the ₹15 Lakhs work contract and a fully automated registry portal managed by Creativatorss.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-gold-champagne border-2 border-gold-champagne rounded-full" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-normal text-gold-champagne block leading-none">Dec 2026</span>
              <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Grand Finale</h4>
              <p className="text-zinc-[650] text-[16px] leading-relaxed font-normal">
                The ultimate show. Elite finalists from North Indian states compete under the spotlight of global casting agencies, modeling scouts and renowned designers in Gurugram.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Become a Model CTA */}
      <section className="relative py-28 w-full overflow-hidden text-center bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200"
            alt="Become a Model Background"
            fill
            className="object-cover opacity-20 object-center"
          />
          {/* subtle white/transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
          <span className="text-gold-champagne text-[11px] tracking-[0.25em] font-extrabold uppercase block font-sans">
            YOUR OPPORTUNITY IS NOW
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white uppercase tracking-wide leading-tight">
            YOUR JOURNEY STARTS HERE.
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Do you have the confidence, personality and talent to become the next face of North India&apos;s fashion industry?
          </p>

          <div className="flex justify-center gap-3 pt-3">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-gold-champagne text-white hover:bg-white hover:text-black font-semibold text-xs tracking-wider transition-all duration-300 uppercase"
            >
              REGISTER NOW
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 bg-transparent border border-white/20 text-white hover:border-gold-champagne hover:text-gold-champagne font-semibold text-xs tracking-wider transition-all duration-300 uppercase"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility Checklist Grid Section */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center space-y-12">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#111111] uppercase tracking-wide">
              WHO CAN APPLY?
            </h2>
            <div className="w-12 h-[1px] bg-gold-champagne mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-6 font-sans text-xs">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Age</span>
                <span className="text-[#111111] font-semibold">18–33 Years</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Gender</span>
                <span className="text-[#111111] font-semibold">Female & Male</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Female Height</span>
                <span className="text-[#111111] font-semibold">Minimum 5&apos;3&quot; / 160 cm</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Male Height</span>
                <span className="text-[#111111] font-semibold">Minimum 5&apos;7&quot; / 170 cm</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Nationality</span>
                <span className="text-[#111111] font-semibold">Indian Nationals & NRI Indians</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Experience</span>
                <span className="text-[#111111] font-semibold">Freshers & Experienced Models</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Marital Status</span>
                <span className="text-[#111111] font-semibold">Married & Unmarried</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Education</span>
                <span className="text-[#111111] font-semibold">No Minimum Qualification Required</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Body Type</span>
                <span className="text-[#111111] font-semibold">No Specific Body Measurements Required</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 uppercase font-bold">Selection Base</span>
                <span className="text-gold-champagne font-bold">Personality, Confidence, Attitude & Potential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6 w-full text-center space-y-12 scroll-mt-20">
        <div className="space-y-3">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne mx-auto" />
        </div>

        <div className="space-y-4 text-left pt-6">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border border-zinc-200 bg-white transition-all">
                <header
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center p-5 cursor-pointer select-none"
                >
                  <span className="font-serif text-sm font-bold text-[#111111]">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-gold-champagne shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-gold-champagne shrink-0" />
                  )}
                </header>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-zinc-400 font-sans leading-relaxed text-xs border-t border-zinc-100 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#FAF8F3] border-t border-[#EAEAEA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start font-sans text-xs">

          {/* LEFT: Info coordinates */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] text-gold-champagne tracking-[0.3em] font-extrabold uppercase">
                LET&apos;S CONNECT
              </span>
              <h2 className="font-serif text-3xl font-light uppercase text-[#111111]">
                NINTM Official
              </h2>
              <div className="w-12 h-[1px] bg-gold-champagne" />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-4 border border-zinc-200 bg-white max-w-sm">
                <Mail className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#111111] uppercase tracking-wider">Official Email</h4>
                  <a href="mailto:nintmofficial@gmail.com" className="text-zinc-650 hover:text-gold-champagne transition-colors">
                    nintmofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 border border-zinc-200 bg-white max-w-sm">
                <Phone className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#111111] uppercase tracking-wider">Scouting Hotline</h4>
                  <a href="tel:+918626000002" className="text-zinc-650 hover:text-gold-champagne transition-colors block">
                    8626-000-002
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 border border-zinc-200 bg-white max-w-sm">
                <MapPin className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#111111] uppercase tracking-wider">Corporate Hub Address</h4>
                  <p className="text-zinc-500 leading-relaxed font-sans">
                    DLF Phase 5, Sector 43<br />
                    Gurugram, Haryana – 122002
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="border border-zinc-200 bg-white p-8 shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <span className="p-2 bg-[#FAF8F3] border border-gold-champagne/45 text-gold-champagne w-10 h-10 flex items-center justify-center mx-auto">✓</span>
                <h3 className="font-serif text-xl text-[#111111] font-bold uppercase">Enquiry Saved</h3>
                <p className="text-zinc-450 leading-relaxed text-xs">
                  Thank you for connecting with NINTM. We will reach back to your registered coordinates.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 border border-zinc-200 text-zinc-500 text-xs uppercase"
                >
                  New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <h3 className="font-serif text-xl text-[#111111] font-bold uppercase mb-4">
                  CONTACT FORM
                </h3>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full bg-[#FAF8F3]/50 border border-zinc-200 py-2.5 px-4 text-[#111111] outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F3]/50 border border-zinc-200 py-2.5 px-4 text-[#111111] outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full bg-[#FAF8F3]/50 border border-zinc-200 py-2.5 px-4 text-[#111111] outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">Message</label>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    rows="4"
                    className="w-full bg-[#FAF8F3]/50 border border-zinc-200 p-4 text-[#111111] outline-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C9A45C] hover:bg-black text-white font-bold tracking-widest text-[10px] uppercase flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  SUBMIT message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded map */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-16">
          <div className="relative border border-zinc-200 aspect-video md:h-80 w-full overflow-hidden bg-[#FAF8F3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8252068694084!2d77.0910123768233!3d28.484803775747514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193ad0ba5101%3A0xe54d975ebd8fcfdf!2sDLF%20Phase%205%2C%20Sector%2043%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NINTM DLF sector 43 Map"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
