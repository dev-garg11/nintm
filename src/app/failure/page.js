'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertCircle, RotateCcw, MessageSquare, PhoneCall } from 'lucide-react';

function FailureContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regId = searchParams.get('id');

    return (
        <div className="max-w-md mx-auto text-center space-y-8 animate-fade-in font-sans text-xs">
            <AlertCircle className="w-16 h-16 text-red-650 mx-auto" />

            <div className="space-y-3">
                <span className="text-[10px] tracking-[0.25em] text-red-650 font-extrabold uppercase block font-semibold">
                    TRANSACTION DECLINED
                </span>
                <h1 className="font-serif text-3xl text-[#111111] font-light uppercase">
                    Payment Not Completed
                </h1>
                <p className="text-xs text-zinc-550 leading-relaxed font-normal">
                    The payment gateway reported a terminal handshake abort. Your submitted registration dataset remains securely stored in our application database.
                </p>
            </div>

            {regId && (
                <div className="bg-[#FAF8F3] border border-zinc-200 p-4 text-xs font-mono text-center">
                    <span className="text-zinc-[400] block text-[9.5px] uppercase font-sans mb-1 font-bold">YOUR REFERENCE ID</span>
                    <span className="text-gold-champagne font-bold">{regId}</span>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 font-sans">
                <Link
                    href={`/register/checkout?id=${regId}&gateway=Razorpay`}
                    className="w-full py-3 bg-gold-champagne text-white hover:bg-black font-bold text-xs tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 uppercase"
                >
                    <RotateCcw className="w-4 h-4" /> RETRY PAYMENT
                </Link>

                <Link
                    href={`/dashboard?id=${regId}`}
                    className="w-full py-2.5 bg-white border border-zinc-200 text-zinc-500 hover:text-black font-bold text-xs tracking-wider transition-colors uppercase text-center"
                >
                    VIEW SAVED PROFILE / DASHBOARD
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200 text-left text-xs">
                <div className="p-4 border border-zinc-200 bg-[#FAF8F3]/50 space-y-2">
                    <PhoneCall className="w-4 h-4 text-gold-champagne" />
                    <h4 className="font-bold text-[#111111] uppercase text-[9.5px]">Call Support</h4>
                    <p className="text-[10px] text-zinc-500 font-normal">
                        Reach director office at <strong>8626-000-002</strong>.
                    </p>
                </div>
                <div className="p-4 border border-zinc-200 bg-[#FAF8F3]/50 space-y-2">
                    <MessageSquare className="w-4 h-4 text-gold-champagne" />
                    <h4 className="font-bold text-[#111111] uppercase text-[9.5px]">Email Queries</h4>
                    <p className="text-[10px] text-zinc-500 font-normal">
                        Write details to <strong>nintmofficial@gmail.com</strong>.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default function FailurePage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6 flex items-center">
                <Suspense fallback={
                    <div className="text-center py-20 mx-auto">
                        <div className="w-10 h-10 border-t-2 border-gold-champagne rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs uppercase text-zinc-400 tracking-wider">Loading...</span>
                    </div>
                }>
                    <FailureContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
