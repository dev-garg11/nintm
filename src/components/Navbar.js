'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT NINTM', href: '/about' },
        { name: 'SERVICES', href: '/#services' },
        { name: 'BECOME A MODEL', href: '/register' },
        { name: 'FAQ', href: '/#faq' },
        { name: 'CONTACT', href: '/#contact' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] ${isScrolled ? 'py-2 shadow-sm' : 'py-4'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo Area */}
                    <Link href="/" className="flex flex-col group">
                        <span className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest text-[#111111] group-hover:text-gold-champagne transition-colors duration-300">
                            NINTM
                        </span>
                        <span className="text-[7px] md:text-[8px] font-sans tracking-[0.35em] text-gold-champagne font-bold -mt-0.5">
                            THE COMEBACK 2026
                        </span>
                    </Link>

                    {/* Centered Navigation */}
                    <nav className="hidden lg:flex items-center space-x-7">
                        {navLinks.map((link) => {
                            const matchesSection = link.href.startsWith('/#') && pathname === '/';
                            const isActive = pathname === link.href || (matchesSection && pathname === '/');
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[10px] tracking-[0.2em] font-sans font-semibold transition-colors duration-300 relative py-1 hover:text-gold-champagne ${isActive ? 'text-[#111111]' : 'text-zinc-500'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-champagne" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action CTA */}
                    <div className="hidden lg:flex items-center space-x-5">
                        <Link
                            href="/register"
                            className="px-6 py-2.5 bg-gold-champagne text-white hover:bg-black font-sans font-bold text-[10px] tracking-[0.2em] transition-all duration-300 rounded-none uppercase"
                        >
                            REGISTER NOW
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#111111] hover:text-gold-champagne transition-colors p-1 cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center space-x-3 lg:hidden">
                        <Link
                            href="/register"
                            className="px-3.5 py-1.5 bg-gold-champagne hover:bg-black text-white font-sans font-bold text-[9px] tracking-wider transition-colors duration-300 rounded-none"
                        >
                            REGISTER
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#111111] hover:text-gold-champagne transition-colors p-1"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#111111] hover:text-gold-champagne transition-colors p-2"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex flex-col items-center space-y-6 text-center">
                    <Link href="/" className="mb-6 flex flex-col items-center" onClick={() => setIsOpen(false)}>
                        <span className="font-serif text-3xl font-extrabold tracking-widest text-[#111111]">NINTM</span>
                        <span className="text-[9px] font-sans tracking-[0.4em] text-gold-champagne font-bold mt-1">
                            THE COMEBACK 2026
                        </span>
                    </Link>

                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm tracking-[0.25em] font-sans font-semibold transition-colors duration-300 ${isActive ? 'text-gold-champagne' : 'text-zinc-600 hover:text-[#111111]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="mt-6 px-8 py-3 bg-gold-champagne text-white hover:bg-black font-sans font-bold text-xs tracking-[0.2em] transition-all duration-300 rounded-none w-56 text-center"
                    >
                        REGISTER NOW
                    </Link>

                    <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-[10px] text-zinc-400 hover:text-[#111111] tracking-widest font-sans transition-colors duration-300 mt-2 font-bold uppercase"
                    >
                        ADMIN PANEL
                    </Link>
                </nav>
            </div>
        </>
    );
}
