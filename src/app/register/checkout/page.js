'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CreditCard, Shield, Landmark, QrCode, Smartphone, AlertTriangle } from 'lucide-react';

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regId = searchParams.get('id');
    const gateway = searchParams.get('gateway') || 'Razorpay';

    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [payMethod, setPayMethod] = useState('card'); // card, upi, netbanking
    const [processing, setProcessing] = useState(false);

    // Card input details
    const [cardDetails, setCardDetails] = useState({
        num: '4111 2222 3333 4444',
        name: '',
        expiry: '12/29',
        cvv: '123'
    });

    useEffect(() => {
        if (!regId) {
            setLoading(false);
            return;
        }

        // Fetch applicant details by ID from admin API
        fetch(`/api/admin?search=${regId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.registrations.length > 0) {
                    setApplicant(data.registrations[0]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching checkout candidate:', err);
                setLoading(false);
            });
    }, [regId]);

    const handleSimulatePayment = async (status) => {
        setProcessing(true);
        const mockPayId = `pay_${gateway.toLowerCase().slice(0, 3)}_${Math.random().toString(36).substring(2, 10)}`;
        const txDetails = {
            paymentId: mockPayId,
            gateway: gateway,
            amount: 8258.82,
            date: new Date().toISOString(),
            method: payMethod,
        };

        try {
            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registrationId: regId,
                    paymentStatus: status, // Successful or Failed
                    paymentDetails: status === 'Successful' ? txDetails : null,
                }),
            });

            const responseData = await res.json();

            if (res.ok && responseData.success) {
                if (status === 'Successful') {
                    router.push(`/success?id=${regId}&payId=${mockPayId}&date=${txDetails.date}`);
                } else {
                    router.push(`/failure?id=${regId}`);
                }
            } else {
                alert(responseData.error || 'Payment gateway verification error.');
                setProcessing(false);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred during gateway communication.');
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center text-zinc-550 font-sans">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-t-2 border-gold-champagne border-r-2 rounded-full animate-spin mx-auto" />
                    <p className="text-xs uppercase tracking-widest font-bold">Bridging Payment Gateway...</p>
                </div>
            </div>
        );
    }

    if (!regId || !applicant) {
        return (
            <div className="min-h-screen bg-white flex flex-col justify-between">
                <main className="max-w-md mx-auto px-6 py-40 text-center space-y-6">
                    <AlertTriangle className="w-12 h-12 text-gold-champagne mx-auto" />
                    <h2 className="font-serif text-2xl text-[#111111] uppercase font-light">Checkout Reference Invalid</h2>
                    <p className="text-xs text-zinc-550 font-sans leading-relaxed">
                        No active application was found with the provided identifier. Please restart the Become a Model process.
                    </p>
                    <Link href="/register" className="px-6 py-2.5 bg-gold-champagne text-white text-xs font-sans font-bold tracking-wider inline-block hover:bg-black transition-colors">
                        BACK TO REGISTRATION
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 pt-40 pb-24 font-sans text-xs">

            {/* Left Side: Summary info */}
            <div className="lg:col-span-2 space-y-6 text-zinc-500 font-sans">
                <div className="border border-zinc-200 bg-[#FAF8F3] p-6 space-y-4">
                    <span className="text-[9px] tracking-[0.2em] text-gold-champagne font-extrabold uppercase block border-b border-zinc-200 pb-2">
                        APPLICANT SUMMARY
                    </span>
                    <div className="space-y-3">
                        <div>
                            <span className="text-zinc-[400] text-[9px] font-bold block mb-1">CANDIDATE NAME</span>
                            <span className="text-[#111111] font-bold text-sm block">{applicant.fullName}</span>
                        </div>
                        <div>
                            <span className="text-zinc-[400] text-[9px] font-bold block mb-1">REGISTRATION ID</span>
                            <span className="text-gold-champagne font-bold font-mono block">{applicant.id}</span>
                        </div>
                        <div>
                            <span className="text-zinc-[400] text-[9px] font-bold block mb-1">AUDITION REGION</span>
                            <span className="text-[#111111] block">{applicant.city}, {applicant.state}</span>
                        </div>
                        <div className="pt-2 border-t border-zinc-200">
                            <span className="text-zinc-[400] text-[9px] font-bold block mb-1">TOTAL AMOUNT PAYABLE</span>
                            <span className="text-[#111111] text-lg font-bold font-mono block">₹8,258.82 INR</span>
                            <span className="text-[9px] text-zinc-400 block font-normal">Includes ₹6,999 base + 18% GST (₹1,259.82)</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-[#FAF8F3] border border-zinc-200 text-zinc-500 leading-relaxed text-[10px]">
                    <span className="font-bold text-gold-champagne block mb-1 uppercase">MOCK ENVIRONMENTAL NOTICE:</span>
                    This payment step is a simulated sandbox interface integrated representing the official <strong>{gateway}</strong> merchant terminal configuration. No real financial debit occurs.
                </div>
            </div>

            {/* Right Side: Gateway Simulation dialog */}
            <div className="lg:col-span-3 border border-zinc-200 bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm relative">

                {processing && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex items-center justify-center text-center">
                        <div className="space-y-4">
                            <div className="w-10 h-10 border-t-2 border-gold-champagne rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] uppercase text-zinc-400 tracking-widest font-sans font-bold">Simulating Secure Handshake...</p>
                        </div>
                    </div>
                )}

                <div>
                    {/* Header of Payment Box */}
                    <div className="flex justify-between items-center border-b border-zinc-205 pb-4 mb-6">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-gold-champagne" />
                            <span className="text-xs uppercase tracking-wider text-[#111111] font-sans font-bold">
                                {gateway} Secure Checkout
                            </span>
                        </div>
                        <span className="text-[9px] text-zinc-550 font-sans tracking-wide bg-[#FAF8F3] border border-zinc-200 px-2 py-0.5 font-bold">
                            Sandbox Mode
                        </span>
                    </div>

                    {/* Payment Method tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {[
                            { id: 'card', name: 'Credit Card', icon: <CreditCard className="w-3.5 h-3.5" /> },
                            { id: 'upi', name: 'UPI / QR', icon: <QrCode className="w-3.5 h-3.5" /> },
                            { id: 'netbanking', name: 'Netbanking', icon: <Landmark className="w-3.5 h-3.5" /> },
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setPayMethod(m.id)}
                                className={`py-2 px-1 flex flex-col items-center gap-1.5 border rounded-none transition-all ${payMethod === m.id
                                        ? 'border-gold-champagne bg-[#FAF8F3] text-gold-champagne text-bold'
                                        : 'border-zinc-200 text-zinc-400 hover:text-zinc-650'
                                    }`}
                            >
                                {m.icon}
                                <span className="text-[9px] font-sans font-bold tracking-wider">{m.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Method Forms */}
                    {payMethod === 'card' && (
                        <div className="space-y-4 font-sans text-xs">
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">CARD NUMBER</label>
                                <input
                                    type="text"
                                    value={cardDetails.num}
                                    onChange={(e) => setCardDetails({ ...cardDetails, num: e.target.value })}
                                    className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne py-2.5 px-3 text-[#111111] font-mono outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">EXPIRY (MM/YY)</label>
                                    <input
                                        type="text"
                                        value={cardDetails.expiry}
                                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne py-2.5 px-3 text-[#111111] font-mono outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">CVV</label>
                                    <input
                                        type="password"
                                        value={cardDetails.cvv}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne py-2.5 px-3 text-[#111111] font-mono outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">CARDHOLDER NAME</label>
                                <input
                                    type="text"
                                    placeholder={applicant.fullName}
                                    className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne py-2.5 px-3 text-[#111111] outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {payMethod === 'upi' && (
                        <div className="space-y-4 text-center py-4 font-sans text-xs">
                            <Smartphone className="w-10 h-10 text-gold-champagne mx-auto mb-2" />
                            <p className="text-zinc-[650]">Scan QR Code or pay on your UPI Application</p>
                            <div className="border border-dashed border-zinc-300 p-4 w-32 h-32 mx-auto flex items-center justify-center bg-[#FAF8F3] font-serif text-[10px] text-zinc-550 select-none">
                                [MOCK QR CODE]
                            </div>
                            <p className="text-zinc-400 text-[10px]">Merchant: NINTM Talent Hunt</p>
                        </div>
                    )}

                    {payMethod === 'netbanking' && (
                        <div className="space-y-4 font-sans text-xs">
                            <label className="text-[9px] uppercase tracking-wider text-zinc-500 block">POPULAR BANKS</label>
                            <select className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne py-2.5 px-3 text-[#111111] outline-none">
                                <option>State Bank of India (SBI)</option>
                                <option>HDFC Bank Ltd</option>
                                <option>ICICI Bank</option>
                                <option>Axis Bank</option>
                                <option>Punjab National Bank</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Action Simulation buttons */}
                <div className="mt-12 space-y-3 pt-6 border-t border-zinc-200">
                    <button
                        onClick={() => handleSimulatePayment('Successful')}
                        className="w-full py-3 bg-gold-champagne text-white hover:bg-black font-sans font-bold text-xs tracking-wider transition-colors duration-200 uppercase"
                    >
                        SIMULATE SUCCESSFUL PAYMENT (₹8,258.82)
                    </button>
                    <button
                        onClick={() => handleSimulatePayment('Failed')}
                        className="w-full py-2.5 bg-transparent border border-red-200 text-red-650 hover:bg-red-50 font-sans text-xs tracking-wider transition-colors duration-200 uppercase font-semibold"
                    >
                        SIMULATE TRANSACTION FAILURE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow">
                <Suspense fallback={
                    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center text-zinc-550 font-sans">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-t-2 border-gold-champagne border-r-2 rounded-full animate-spin mx-auto" />
                            <p className="text-xs uppercase tracking-widest font-bold">Bridging Payment Gateway...</p>
                        </div>
                    </div>
                }>
                    <CheckoutContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
