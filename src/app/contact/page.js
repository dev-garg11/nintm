'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, User, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

export default function ContactFAQ() {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (!contactData.name || !contactData.email || !contactData.phone) {
            alert('Please fill out all required fields.');
            return;
        }
        setFormSubmitted(true);
        // Reset form after short delay
        setTimeout(() => {
            setContactData({ name: '', phone: '', email: '', message: '' });
        }, 100);
    };

    const faqs = [
        {
            q: "How can I apply?",
            a: "Go to the Become a Model page, complete the multi-step registration form with your physical dimensions and contact coordinates, attach the required Government ID proof and photoshoot uploads, and complete the digital application payment."
        },
        {
            q: "What are the requirements?",
            a: "Participants should carefully review our eligibility checklist (age 18-33, height 5'3\" for females, 5'7\" for males) and keep three clear photos (close-up, mid-shot, full-length) and government ID proof scanned for attachment."
        },
        {
            q: "Who can participate?",
            a: "Aspiring male and female models who meet the physical height criteria, age parameters, and are Indian Nationals or NRI status holders can participate."
        },
        {
            q: "What happens after the audition?",
            a: "Selected candidates will progress through consecutive training bootcamps, physical look tests, editorial photoshoots, brand catalog sessions, and styling rounds heading toward the Grand Finale in December 2026."
        },
        {
            q: "What kind of training is provided?",
            a: "Comprehensive grooming which covers runway ramp choreography, posing guides under directors, confidence drills, communications, diet and style consultancy, public relations, and legal modeling advice."
        },
        {
            q: "Will I get professional exposure?",
            a: "Absolutely. Finalists are placed in front of lead fashion designers, advertising directors, print media photographers, and casting agents. NINTM is and has been a premier launchpad since 2012."
        },
        {
            q: "Can beginners participate?",
            a: "Yes. NINTM welcomes freshers and aspiring models. The program is designed specifically to discover raw potential and polish it to meet global modeling agency standards."
        },
        {
            q: "What should I bring for the audition?",
            a: "Ensure you carry a digital copy of your payment invoice receipt, a copy of the ID uploaded during registration, and appropriate basic casting outfits (typically high heels, denim, and tight shirts) as directed in the candidate briefing."
        },
        {
            q: "What can the winner expect?",
            a: "The grand winner will walk away with modeling contracts totaling a value of ₹15 Lakhs INR, legally guaranteed on Stamp Paper with Creativatorss, securing immediate elite runway bookings and media exposure."
        },
        {
            q: "Where can I get audition updates?",
            a: "Continuous operational news, physical venue shifts, look test calendars, and finalist lists are updated on this portal dashboard and broadcasted across NINTM by Creativatorss social media channels."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] font-sans text-xs">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-44 pb-20 bg-[#0A0A0A] border-b border-zinc-900 overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.05)_0%,transparent_100%)]" />
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <span className="text-xs uppercase tracking-[0.45em] text-gold-champagne font-bold block mb-3 animate-fade-up">
                        SUPPORT & CASTINGS COORDINATES
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white uppercase mb-4">
                        Contact Us & FAQ
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-400 leading-normal tracking-wide text-xs">
                        Review modeling criteria questions, search regional schedules, or submit enquiry forms directly to our DLF Gurugram headquarters.
                    </p>
                </div>
            </section>

            {/* Main content area */}
            <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-16 w-full space-y-24">

                {/* Contact info + Form grid */}
                <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left panel: Info */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <span className="text-[11px] text-gold-champagne tracking-[0.3em] font-bold uppercase">
                                GET IN TOUCH
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase text-white leading-tight">
                                Let&apos;s Connect
                            </h2>
                            <div className="w-16 h-[2px] bg-gold-champagne" />
                            <p className="text-zinc-440 text-xs md:text-sm leading-relaxed max-w-md">
                                We value your feedback and inquiries. Whether you have a question, suggestion or simply want to connect with us, our team is here to assist you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start p-4 border border-zinc-900 bg-black/40 max-w-md">
                                <Mail className="w-5 h-5 text-gold-champagne shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">OFFICIAL MAIL ID</h4>
                                    <a href="mailto:nintmofficial@gmail.com" className="text-zinc-400 hover:text-gold-champagne transition-colors">
                                        nintmofficial@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start p-4 border border-zinc-900 bg-black/40 max-w-md">
                                <MapPin className="w-5 h-5 text-gold-champagne shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">HEADQUARTERS ADDRESS</h4>
                                    <p className="text-zinc-400 leading-relaxed font-sans">
                                        DLF Phase 5, Sector 43<br />
                                        Gurugram, Haryana – 122002
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start p-4 border border-zinc-900 bg-black/40 max-w-md">
                                <User className="w-5 h-5 text-gold-champagne shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">CONTACT PERSON KEY</h4>
                                    <p className="text-zinc-400">
                                        Prashant Sharma <br />
                                        <span className="text-gold-champagne text-[10px] uppercase font-bold tracking-wider font-sans block mt-0.5">Director – Creativatorss</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start p-4 border border-zinc-900 bg-black/40 max-w-md">
                                <Phone className="w-5 h-5 text-gold-champagne shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">MOBILE HOTLINE</h4>
                                    <a href="tel:+918626000002" className="text-zinc-400 hover:text-gold-champagne transition-colors block">
                                        8626-000-002
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right panel: Contact Form */}
                    <div className="border border-zinc-900 bg-[#0a0a0a] p-8 md:p-10 shadow-2xl">
                        {formSubmitted ? (
                            <div className="text-center py-16 space-y-4 animate-fade-in">
                                <CheckCircle2 className="w-12 h-12 text-gold-champagne mx-auto animate-pulse" />
                                <h3 className="font-serif text-2xl text-white font-bold uppercase">Enquiry Recorded</h3>
                                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                                    Your communication record has been sent to Prashant Sharma&apos;s administration queue. Our scouts will respond within 48 hours.
                                </p>
                                <button
                                    onClick={() => setFormSubmitted(false)}
                                    className="px-6 py-2 border border-zinc-800 text-zinc-300 hover:text-white text-xs tracking-wider"
                                >
                                    SEND ANOTHER ENQUIRY
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <h3 className="font-serif text-2xl text-white font-bold uppercase border-b border-zinc-900 pb-3 mb-6">
                                    Submit Enquiry
                                </h3>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">FULL NAME *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className="w-full bg-[#111] border border-zinc-800 focus:border-gold-champagne py-3 px-4 text-white outline-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">PHONE NUMBER *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={contactData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Mobile contact"
                                            className="w-full bg-[#111] border border-zinc-800 focus:border-gold-champagne py-3 px-4 text-white outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">EMAIL ADDRESS *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={contactData.email}
                                            onChange={handleInputChange}
                                            placeholder="name@domain.com"
                                            className="w-full bg-[#111] border border-zinc-800 focus:border-gold-champagne py-3 px-4 text-white outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">MESSAGE DETAILS</label>
                                    <textarea
                                        name="message"
                                        value={contactData.message}
                                        onChange={handleInputChange}
                                        placeholder="Type your enquiry questions or candidate updates here..."
                                        rows="4"
                                        className="w-full bg-[#111] border border-zinc-800 focus:border-gold-champagne p-4 text-white outline-none font-sans"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-gold-champagne hover:bg-white text-black font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-colors"
                                >
                                    SUBMIT ENQUIRY <Send className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                {/* Google Maps section */}
                <section className="space-y-6">
                    <div className="space-y-3">
                        <span className="text-[11px] text-gold-champagne tracking-[0.3em] font-bold uppercase">
                            VENUE REACH
                        </span>
                        <h2 className="font-serif text-3xl font-bold uppercase text-white">
                            Google Maps Location
                        </h2>
                        <div className="w-12 h-[2px] bg-gold-champagne" />
                    </div>

                    {/* Luxury styled map container with gray filter */}
                    <div className="relative border border-zinc-900 aspect-video md:h-96 w-full overflow-hidden bg-[#0A0A0A]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8252068694084!2d77.0910123768233!3d28.484803775747514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193ad0ba5101%3A0xe54d975ebd8fcfdf!2sDLF%20Phase%205%2C%20Sector%2043%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.3)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Creativatorss DLF Phase 5 Gurugram"
                        />
                    </div>
                </section>

                {/* Accordion FAQ Section */}
                <section id="faq" className="space-y-12">
                    <div className="text-center">
                        <span className="text-[11px] text-gold-champagne tracking-[0.3em] font-bold uppercase block mb-2">
                            CASTING HELP BOARD
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-12 h-[2px] bg-gold-champagne mx-auto mt-4" />
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4 pt-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div key={index} className="border border-zinc-900 bg-[#0a0a0a] transition-all">
                                    <header
                                        onClick={() => toggleFaq(index)}
                                        className="flex justify-between items-center p-5 cursor-pointer select-none text-left"
                                    >
                                        <span className="font-serif text-sm font-bold text-white hover:text-gold-champagne transition-colors">
                                            {index + 1}. {faq.q}
                                        </span>
                                        {isOpen ? <ChevronUp className="w-4 h-4 text-gold-champagne shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
                                    </header>
                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-zinc-400 font-sans leading-relaxed text-xs border-t border-zinc-950 animate-fade-in text-left">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
