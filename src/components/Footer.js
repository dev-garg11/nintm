'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Shield, MessageSquare } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const legalLinks = [
        { name: 'TERMS & CONDITIONS', href: '/legal/terms' },
        { name: 'PRIVACY POLICY', href: '/legal/privacy' },
        { name: 'MODEL AGREEMENT', href: '/legal/model-agreement' },
        { name: 'REFUND POLICY', href: '/legal/refund' },
        { name: 'CANCELLATION POLICY', href: '/legal/cancellation' },
        { name: 'DISCLAIMER', href: '/legal/disclaimer' }
    ];

    return (
        <footer className="bg-white border-t border-[#EAEAEA] pt-16 pb-8 text-zinc-650 font-sans z-10 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand Section */}
                <div className="flex flex-col space-y-4">
                    <Link href="/" className="flex flex-col group">
                        <span className="font-serif text-3xl font-extrabold tracking-widest text-[#111111] group-hover:text-gold-champagne transition-colors duration-300">
                            NINTM
                        </span>
                        <span className="text-[9px] font-sans tracking-[0.35em] text-gold-champagne font-bold -mt-0.5">
                            THE COMEBACK 2026
                        </span>
                    </Link>
                    <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
                        North India&apos;s premier fashion model hunt platform discovering, grooming, and empowering modeling talent since 2012.
                    </p>
                    <div className="text-xs text-gold-champagne font-bold tracking-wider pt-2">
                        NINTM – The Comeback 2026
                        <div className="text-zinc-400 font-normal">Managed by Creativatorss</div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#111111] uppercase mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gold-champagne rounded-none mr-2" />
                        Navigation
                    </h4>
                    <ul className="space-y-3 text-xs font-semibold tracking-wider">
                        <li>
                            <Link href="/" className="hover:text-gold-champagne transition-colors duration-200">HOME</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-gold-champagne transition-colors duration-200">ABOUT NINTM</Link>
                        </li>
                        <li>
                            <Link href="/#services" className="hover:text-gold-champagne transition-colors duration-200">SERVICES</Link>
                        </li>
                        <li>
                            <Link href="/register" className="hover:text-gold-champagne transition-colors duration-200">BECOME A MODEL</Link>
                        </li>
                        <li>
                            <Link href="/#faq" className="hover:text-gold-champagne transition-colors duration-200">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/#contact" className="hover:text-gold-champagne transition-colors duration-200">CONTACT</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#111111] uppercase mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gold-champagne rounded-none mr-2" />
                        Contact
                    </h4>
                    <ul className="space-y-4 text-xs font-semibold text-zinc-500">
                        <li className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                            <a href="mailto:nintmofficial@gmail.com" className="hover:text-gold-champagne transition-colors duration-200 break-all leading-relaxed">
                                nintmofficial@gmail.com
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                            <a href="tel:+918626000002" className="hover:text-gold-champagne transition-colors duration-200 leading-relaxed font-mono">
                                8626-000-002
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
                            <span className="leading-relaxed text-zinc-400 font-normal">
                                DLF Phase 5, Sector 43<br />
                                Gurugram, Haryana – 122002
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Legal Agreements */}
                <div>
                    <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#111111] uppercase mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gold-champagne rounded-none mr-2" />
                        Legal Info
                    </h4>
                    <ul className="space-y-2.5 text-xs text-zinc-500 font-semibold">
                        {legalLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-gold-champagne transition-colors duration-150 flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5 text-gold-champagne shrink-0" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Note about placeholders */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAEAEA] py-6 text-[10px] text-zinc-400 flex flex-col gap-2">
                <p>
                    <strong>Legal Disclaimer Note:</strong> Registration fee details (₹6,999 + applicable GST), refund policies, model contracts, company credentials (NINTM FASHION AND MODEL HUNT PRIVATE LIMITED, Sector 43 Gurugram), and official payment configurations are static mock representations. Official business setup and legal transactions are pending final certifications.
                </p>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#EAEAEA] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 text-center sm:text-left gap-4 font-semibold">
                <div>
                    &copy; {currentYear} NINTM – The Comeback. All Rights Reserved.
                </div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                    Created with Prestige & Excellence • Managed by Creativatorss
                </div>
            </div>

            {/* FLOATING WHATSAPP BUTTON (Concierge Assistance widget) */}
            <a
                href="https://wa.me/918626000002"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Concierge WhatsApp Assistance"
                className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-white border border-gold-champagne text-gold-champagne hover:bg-gold-champagne hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(184,144,99,0.15)] hover:scale-105"
            >
                <MessageSquare className="w-5 h-5" />
            </a>
        </footer>
    );
}
