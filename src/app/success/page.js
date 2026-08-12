'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, ShieldCheck, Mail, ArrowRight, Printer, AlertTriangle } from 'lucide-react';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regId = searchParams.get('id');
    const payId = searchParams.get('payId');
    const dateStr = searchParams.get('date');

    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEmailNotice, setShowEmailNotice] = useState(false);

    useEffect(() => {
        if (!regId) {
            setLoading(false);
            return;
        }

        fetch(`/api/admin?search=${regId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.registrations.length > 0) {
                    setCandidate(data.registrations[0]);
                    setShowEmailNotice(true);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Success fetch error:', err);
                setLoading(false);
            });
    }, [regId]);

    const handlePrintReceipt = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="w-10 h-10 border-t-2 border-gold-champagne rounded-full animate-spin mx-auto mb-2" />
                <span className="text-xs uppercase text-zinc-400 tracking-wider">Verifying transaction log...</span>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="text-center py-20 max-w-sm mx-auto space-y-4 font-sans text-xs">
                <AlertTriangle className="w-12 h-12 text-gold-champagne mx-auto animate-pulse" />
                <h2 className="font-serif text-xl text-[#111111] uppercase font-light">Transaction Record Invalid</h2>
                <p className="text-xs text-zinc-550 leading-relaxed font-normal">
                    The payment succeeded, but we couldn&apos;t retrieve the applicant file. Please contact NINTM support coordinates.
                </p>
                <Link href="/" className="px-6 py-2 bg-gold-champagne text-white text-xs font-bold tracking-wider inline-block">
                    RETURN TO HOME
                </Link>
            </div>
        );
    }

    const formattedDate = dateStr
        ? new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in font-sans text-xs">

            {/* Email Dispatch Notice */}
            {showEmailNotice && (
                <div className="bg-gold-champagne/10 border border-gold-champagne/30 text-gold-champagne px-4 py-3 flex items-center justify-between gap-3 text-xs mb-6 font-semibold">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span>
                            Confirmation email sent to <strong>{candidate.email}</strong>.
                        </span>
                    </div>
                    <button
                        onClick={() => setShowEmailNotice(false)}
                        className="text-[#111111] hover:text-gold-champagne text-[10px] font-bold tracking-wider"
                    >
                        DISMISS
                    </button>
                </div>
            )}

            {/* Main Success message */}
            <div className="text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-gold-champagne mx-auto" />
                <span className="text-[10px] tracking-[0.3em] text-gold-champagne font-extrabold uppercase block">
                    TRANSACTION APPROVED
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-[#111111] font-light uppercase">
                    Registration Successful
                </h1>
                <p className="text-xs text-zinc-550 max-w-md mx-auto leading-relaxed font-normal">
                    Your profile application has been cached. Regional scouts from Creativatorss will start evaluating your pictures.
                </p>
            </div>

            {/* Audit Invoice Details card */}
            <div className="bg-[#FAF8F3] border border-zinc-200 p-8 space-y-6 print:border-black print:bg-white print:text-black">
                <div className="flex justify-between items-baseline border-b border-zinc-200 pb-4 print:border-black">
                    <div>
                        <span className="font-serif text-xl text-[#111111] font-bold tracking-widest print:text-black">NINTM</span>
                        <span className="text-[8px] font-sans tracking-widest text-gold-champagne font-semibold block uppercase">
                            THE COMEBACK 2026
                        </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-green-700 font-bold bg-green-50 border border-green-200 px-2 py-0.5 print:text-black print:border-black">
                        PAID SUCCESS
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-zinc-550 font-normal">
                    <div>
                        <span className="text-zinc-[400] text-[9.5px] font-bold block uppercase print:text-zinc-500">Candidate Name</span>
                        <strong className="text-[#111111] print:text-black font-serif text-sm">{candidate.fullName}</strong>
                    </div>
                    <div>
                        <span className="text-zinc-[400] text-[9.5px] font-bold block uppercase print:text-zinc-500">Contact Email</span>
                        <span className="text-[#111111] print:text-black">{candidate.email}</span>
                    </div>
                    <div>
                        <span className="text-zinc-[400] text-[9.5px] font-bold block uppercase print:text-zinc-500">Registration ID</span>
                        <strong className="text-gold-champagne print:text-black font-mono">{candidate.id}</strong>
                    </div>
                    <div>
                        <span className="text-zinc-[400] text-[9.5px] font-bold block uppercase print:text-zinc-500">Transaction ID</span>
                        <span className="text-[#111111] print:text-black font-mono">{payId || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="text-zinc-[400] text-[9.5px] font-bold block uppercase print:text-zinc-500">Total Paid Amount</span>
                        <strong className="text-[#111111] print:text-black font-mono">
                            ₹8,258.82 INR <span className="text-[9px] font-normal text-zinc-[400]">(18% GST Incl.)</span>
                        </strong>
                    </div>
                    <div>
                        <span className="text-zinc-[400] text-[9.5px] font-bold block uppercase print:text-zinc-500">Payment Date</span>
                        <span className="text-[#111111] print:text-black">{formattedDate}</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 border-dashed text-[10px] text-zinc-550 flex items-start gap-2 leading-relaxed print:text-zinc-500 print:border-black font-normal">
                    <ShieldCheck className="w-5 h-5 text-gold-champagne shrink-0 mt-0.5 print:text-black" />
                    <p>
                        Your application folder will now travel to our agency review queue. Shortlisted candidates will be communicated dates for physical look tests via their registered mobile coordinates. Keep credentials saved.
                    </p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center font-sans print:hidden">
                <Link
                    href={`/dashboard?id=${candidate.id}`}
                    className="px-8 py-3 bg-gold-champagne text-white hover:bg-black font-bold text-xs tracking-wider transition-colors duration-200 inline-flex items-center gap-2 w-full sm:w-auto text-center justify-center uppercase"
                >
                    VIEW PROFILE DASHBOARD <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                    onClick={handlePrintReceipt}
                    className="px-8 py-3 bg-white border border-zinc-300 text-zinc-650 hover:bg-zinc-50 text-xs font-bold tracking-wider transition-colors duration-200 inline-flex items-center justify-center gap-2 w-full sm:w-auto uppercase"
                >
                    <Printer className="w-4 h-4" /> DOWNLOAD RECEIPT
                </button>
                <Link
                    href="/contact"
                    className="px-8 py-3 bg-transparent text-zinc-500 hover:text-gold-champagne text-xs tracking-wide transition-colors duration-200 uppercase font-semibold"
                >
                    CONTACT SUPPORT
                </Link>
            </div>

        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white print:bg-white">
            {/* Header hidden on print */}
            <div className="print:hidden">
                <Navbar />
            </div>

            <main className="flex-grow pt-40 pb-24 px-6">
                <Suspense fallback={
                    <div className="text-center py-20">
                        <div className="w-10 h-10 border-t-2 border-gold-champagne rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs uppercase text-zinc-400 tracking-wider">Loading...</span>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </main>

            {/* Footer hidden on print */}
            <div className="print:hidden">
                <Footer />
            </div>
        </div>
    );
}
