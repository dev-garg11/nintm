'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Check,
    Upload,
    CreditCard,
    FileText,
    ShieldAlert,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    // 0: Eligibility Info, 1: Basic, 2: Prof, 3: Address, 4: Wildcard, 5: Docs, 6: Social, 7: Confirm & Pay
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState('Razorpay');

    const [formData, setFormData] = useState({
        // Step 1: Basic details
        fullName: '',
        instagramUsername: '',
        dob: '',
        gender: 'Female',
        maritalStatus: 'Unmarried',
        email: '',
        countryCode: '+91',
        phone: '',

        // Step 2: Professional Details
        height: '',
        dressSize: 'M',
        vitalStats: '',
        experience: 'Fresher',
        profession: '',
        city: '',
        state: 'Delhi (NCR)',
        country: 'India',

        // Step 3: Address
        streetAddress: '',
        streetAddress2: '',
        postalCode: '',
        addressState: 'Delhi (NCR)',

        // Step 4: Wildcard Details
        wildcardNotes: '',

        // Step 5: Documents (mock storage)
        govIdName: '',
        closeUpName: '',
        midShotName: '',
        fullLengthName: '',

        // Step 6: Socials
        instagram: '',
        facebook: '',
        portfolioWebsite: '',
        otherSocial: '',

        // Step 7: Agreement Checkbox
        agreed: false,
    });

    const eligibilityChecklist = [
        { label: 'Age Limit', val: '18 to 33 Years old' },
        { label: 'Gender Category', val: 'Open to Female & Male participants' },
        { label: 'Height (Female)', val: 'Minimum 5\'3" / 160 cm' },
        { label: 'Height (Male)', val: 'Minimum 5\'7" / 170 cm' },
        { label: 'Marital Status', val: 'Married & Unmarried candidates can apply' },
        { label: 'Citizenship', val: 'Indian Nationals & NRI status candidates eligible' },
        { label: 'Modeling Experience', val: 'Freshers & Experienced models both welcome' },
        { label: 'Body Type', val: 'No specific measurements. Confidence & attitude matter more' },
        { label: 'Language Skills', val: 'Basic communication preferred. No mandatory requirements' },
        { label: 'Education Criteria', val: 'No minimum educational qualification required' },
        { label: 'Fitness Index', val: 'Physically fit to participate in grooming & training stages' }
    ];

    const northStates = [
        'Delhi (NCR)', 'Punjab', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Uttarakhand', 'Uttar Pradesh', 'Rajasthan', 'Chandigarh (UT)'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds the 5 MB limit.');
                return;
            }
            setFormData((prev) => ({
                ...prev,
                [fieldName]: file.name
            }));
        }
    };

    const stepsLabel = [
        { title: 'Eligibility', desc: 'Pre-check' },
        { title: 'Personal', desc: 'Contact details' },
        { title: 'Profile', desc: 'Measurements' },
        { title: 'Address', desc: 'Mailing info' },
        { title: 'Wildcard', desc: 'State choices' },
        { title: 'Credentials', desc: 'ID & Photos' },
        { title: 'Social Links', desc: 'Portfolios' },
        { title: 'Checkout', desc: 'Review & Pay' }
    ];

    const handleNextStep = () => {
        if (step === 1) {
            if (!formData.fullName || !formData.email || !formData.phone || !formData.dob) {
                alert('Please fill out all required basic details.');
                return;
            }
        }
        if (step === 2) {
            if (!formData.height || !formData.city) {
                alert('Please fill height and city credentials.');
                return;
            }
        }
        if (step === 3) {
            if (!formData.streetAddress || !formData.postalCode) {
                alert('Please complete the primary address parameters.');
                return;
            }
        }
        setStep((prev) => Math.min(prev + 1, stepsLabel.length - 1));
    };

    const handlePrevStep = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmitRegistration = async (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert('You must read and agree to all Eligibility Criteria and official policies before finalizing checkout.');
            return;
        }
        setIsSubmitting(true);

        try {
            const registerRes = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const registerData = await registerRes.json();

            if (!registerRes.ok || !registerData.success) {
                throw new Error(registerData.error || 'Failed to submit registration.');
            }

            const freshId = registerData.registration.id;
            router.push(`/register/checkout?id=${freshId}&gateway=${selectedGateway}`);
        } catch (err) {
            console.error(err);
            alert(err.message || 'An error occurred during screening submission.');
            setIsSubmitting(false);
        }
    };

    const feeBase = 6999;
    const gstRate = 0.18;
    const gstAmount = Number((feeBase * gstRate).toFixed(2));
    const finalTotalAmount = Number((feeBase + gstAmount).toFixed(2));

    return (
        <div className="flex flex-col min-h-screen bg-white text-luxury-black font-sans selection:bg-gold-champagne selection:text-white">
            <Navbar />

            {/* Hero Head */}
            <section className="relative pt-44 pb-20 bg-[#FAF8F3] border-b border-[#EAEAEA] overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200"
                        alt="Registration Hero Background"
                        fill
                        sizes="100vw"
                        quality={80}
                        className="object-cover opacity-10 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
                    <span className="text-xs uppercase tracking-[0.45em] text-gold-champagne font-extrabold font-sans mb-3 block">
                        NINTM – THE COMEBACK 2026
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#111111] mb-4 uppercase">
                        Become a Model / Registration
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-500 text-xs md:text-sm font-sans tracking-wide leading-relaxed font-normal">
                        Do you have the confidence, personality, and passion to make a mark in the modeling world? Set up your candidate profile to initiate casting reviews.
                    </p>
                </div>
            </section>

            {/* Main Form container */}
            <main className="flex-grow py-16 max-w-5xl mx-auto px-6 w-full">

                {/* Step Indicator top ribbon */}
                <div className="hidden md:grid grid-cols-8 gap-2 mb-12 text-center relative font-sans text-xs">
                    {stepsLabel.map((sl, index) => {
                        const isPassed = index < step;
                        const isCurrent = index === step;
                        return (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center group cursor-pointer ${isCurrent ? 'text-gold-champagne font-bold' : isPassed ? 'text-[#111111]' : 'text-zinc-400'
                                    }`}
                                onClick={() => {
                                    if (index < step) setStep(index);
                                }}
                            >
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs mb-2 transition-all duration-300 ${isCurrent
                                    ? 'border-gold-champagne text-gold-champagne bg-gold-champagne/5 shadow-sm'
                                    : isPassed
                                        ? 'border-[#111111] text-white bg-[#111111]'
                                        : 'border-zinc-200 text-zinc-400 bg-white'
                                    }`}>
                                    {isPassed ? <Check className="w-3.5 h-3.5" /> : index + 1}
                                </div>
                                <span className="text-[9px] uppercase tracking-wider block font-serif">
                                    {sl.title}
                                </span>
                                <span className="text-[8px] text-zinc-400 font-sans tracking-tight font-normal block">
                                    {sl.desc}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Form panel card */}
                <div className="bg-white border border-zinc-200 p-8 md:p-12 shadow-sm">

                    {/* Eligibility Section (Step 0) */}
                    {step === 0 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.25em] text-gold-champagne font-bold uppercase block">
                                    FIRST EVALUATION STAGE
                                </span>
                                <h2 className="font-serif text-2xl md:text-3xl font-light text-[#111111] uppercase mt-1">
                                    Eligibility Criteria & Checklist
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-sans">
                                {eligibilityChecklist.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 border border-zinc-200 bg-[#FAF8F3]/50">
                                        <span className="p-1 bg-gold-champagne/10 text-gold-champagne border border-gold-champagne/20 shrink-0 mt-0.5">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                        <div>
                                            <h4 className="font-serif text-[15px] font-bold text-[#111111] tracking-wide uppercase">
                                                {item.label}
                                            </h4>
                                            <p className="text-zinc-[650] text-[16px] font-sans mt-1 leading-relaxed">
                                                {item.val}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Special Note */}
                            <div className="p-6 bg-gold-champagne/5 border border-gold-champagne/20 font-sans">
                                <div className="flex gap-3">
                                    <ShieldAlert className="w-5 h-5 text-gold-champagne shrink-0" />
                                    <div>
                                        <h4 className="font-serif text-[15px] font-bold text-gold-champagne uppercase">
                                            Special Selection Note
                                        </h4>
                                        <p className="text-zinc-550 text-[16px] mt-1 leading-relaxed">
                                            NINTM celebrates diversity and welcomes aspiring models from different backgrounds, profiles, and cities across India. Selection is based purely on projection, confidence, poise, and photogenic traits.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 text-right">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    START REGISTRATION <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 1: Basic details */}
                    {step === 1 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 1 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Basic Personal Details
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your legal full name"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Instagram Handle *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-zinc-400 text-xs">@</span>
                                        <input
                                            type="text"
                                            name="instagramUsername"
                                            value={formData.instagramUsername}
                                            onChange={handleInputChange}
                                            placeholder="username"
                                            className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs pl-8 pr-4 py-3 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Gender Group
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    >
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Other">Other / Non-Binary</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Marital Status
                                    </label>
                                    <select
                                        name="maritalStatus"
                                        value={formData.maritalStatus}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    >
                                        <option value="Unmarried">Unmarried</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced / Widowed</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="name@domain.com"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-2 col-span-1 md:col-span-2">
                                    <div className="space-y-2 col-span-1">
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Code
                                        </label>
                                        <input
                                            type="text"
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            placeholder="+91"
                                            className="w-full bg-[#FAF8F3]/50 border border-zinc-200 text-center focus:border-gold-champagne text-[#111111] text-xs py-3 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-3">
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Primary Mobile Number"
                                            className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(0)}
                                    className="px-6 py-2.5 border border-zinc-250 hover:border-[#111111] text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                >
                                    ← BACK TO ELIGIBILITY
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    CONTINUE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Professional Details */}
                    {step === 2 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 2 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Professional & Body Metrics
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Height in CM (e.g. 172) *
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        placeholder="Height (CM)"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Dress Size
                                    </label>
                                    <select
                                        name="dressSize"
                                        value={formData.dressSize}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    >
                                        <option value="XS">Extra Small (XS)</option>
                                        <option value="S">Small (S)</option>
                                        <option value="M">Medium (M)</option>
                                        <option value="L">Large (L)</option>
                                        <option value="XL">Extra Large (XL)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Vital Stats (Bust-Waist-Hips, e.g. 34-26-36)
                                    </label>
                                    <input
                                        type="text"
                                        name="vitalStats"
                                        value={formData.vitalStats}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 34-26-36"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Modeling Experience
                                    </label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    >
                                        <option value="Fresher">Fresher / Aspiring</option>
                                        <option value="Experienced">Experienced Model</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Current Profession
                                    </label>
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Student, Actor, Influencer"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Audition City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Chandigarh, Gurugram"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Primary Audition State
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    >
                                        {northStates.map((st) => (
                                            <option key={st} value={st}>{st}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-100 border border-zinc-200 text-[#111111] text-xs px-4 py-3 outline-none opacity-60"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-2.5 border border-zinc-250 text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                >
                                    ← PREVIOUS
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    CONTINUE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Address logs */}
                    {step === 3 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 3 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Mailing Address Details
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        placeholder="Apartment, Suite, Street name"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Street Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress2"
                                        value={formData.streetAddress2}
                                        onChange={handleInputChange}
                                        placeholder="Floor details, landmark (optional)"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Postal / ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            placeholder="ZIP Code"
                                            className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            State / UT
                                        </label>
                                        <select
                                            name="addressState"
                                            value={formData.addressState}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                        >
                                            {northStates.map((st) => (
                                                <option key={st} value={st}>{st}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-2.5 border border-zinc-250 text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                >
                                    ← PREVIOUS
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    CONTINUE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Application Details / Wildcard */}
                    {step === 4 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 4 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Additional State & Wildcard Options
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-[#FAF8F3] border border-zinc-200 text-zinc-650 text-xs font-sans leading-relaxed">
                                    <span className="text-gold-champagne font-bold block uppercase mb-1">
                                        What is a Wildcard Entry?
                                    </span>
                                    Wildcard entries allow models who fall slightly outside the core parameters of regional selections or missed physical auditions. If you wish to apply for multiple states simultaneously or justify a wildcard screen, state your reasonings below.
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block font-sans">
                                        Additional State or Wildcard Application Note
                                    </label>
                                    <textarea
                                        name="wildcardNotes"
                                        value={formData.wildcardNotes}
                                        onChange={handleInputChange}
                                        rows="5"
                                        placeholder="If you are applying for additional states or online wildcard slots, mention dates, state preferences, or justification here..."
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none font-sans"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-2.5 border border-zinc-250 text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                >
                                    ← PREVIOUS
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    CONTINUE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: Documents */}
                    {step === 5 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 5 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Document & Portfolio Photo Uploads
                                </h3>
                            </div>

                            <div className="p-4 bg-[#FAF8F3] border border-zinc-200 text-zinc-500 text-xs font-sans">
                                <strong>Upload Guidelines:</strong> Files accepted: <strong>JPG, JPEG, PNG</strong>. Max size: <strong>5 MB per image</strong>.
                                Please ensure high-resolution photos with natural daylight, minimal makeup, and clear styling.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* ID Proof */}
                                <div className="border border-zinc-200 p-6 flex flex-col justify-between space-y-4 bg-white">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Government ID Proof *
                                        </label>
                                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
                                            Aadhaar Card, Passport, or DL for verification.
                                        </p>
                                    </div>
                                    <div className="border-2 border-dashed border-zinc-200 py-6 flex flex-col items-center justify-center relative cursor-pointer hover:border-gold-champagne transition-colors bg-[#FAF8F3]/30">
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => handleFileChange(e, 'govIdName')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                                        <span className="text-xs text-zinc-500 select-none">
                                            {formData.govIdName || 'Drag & Drop ID Proof'}
                                        </span>
                                    </div>
                                </div>

                                {/* Close up */}
                                <div className="border border-zinc-200 p-6 flex flex-col justify-between space-y-4 bg-white">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Close-Up Photograph *
                                        </label>
                                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
                                            Clear headshot focusing on facial features.
                                        </p>
                                    </div>
                                    <div className="border-2 border-dashed border-zinc-200 py-6 flex flex-col items-center justify-center relative cursor-pointer hover:border-gold-champagne transition-colors bg-[#FAF8F3]/30">
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => handleFileChange(e, 'closeUpName')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                                        <span className="text-xs text-zinc-500 select-none">
                                            {formData.closeUpName || 'Drag & Drop Photograph'}
                                        </span>
                                    </div>
                                </div>

                                {/* Mid shot */}
                                <div className="border border-zinc-200 p-6 flex flex-col justify-between space-y-4 bg-white">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Mid-Shot Photograph *
                                        </label>
                                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
                                            Shot till waist displaying basic silhouette.
                                        </p>
                                    </div>
                                    <div className="border-2 border-dashed border-zinc-200 py-6 flex flex-col items-center justify-center relative cursor-pointer hover:border-gold-champagne transition-colors bg-[#FAF8F3]/30">
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => handleFileChange(e, 'midShotName')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                                        <span className="text-xs text-zinc-500 select-none">
                                            {formData.midShotName || 'Drag & Drop Photograph'}
                                        </span>
                                    </div>
                                </div>

                                {/* Full length */}
                                <div className="border border-zinc-200 p-6 flex flex-col justify-between space-y-4 bg-white">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                            Full-Length Photograph *
                                        </label>
                                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
                                            Model standing straight showing proportions.
                                        </p>
                                    </div>
                                    <div className="border-2 border-dashed border-zinc-200 py-6 flex flex-col items-center justify-center relative cursor-pointer hover:border-gold-champagne transition-colors bg-[#FAF8F3]/30">
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={(e) => handleFileChange(e, 'fullLengthName')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                                        <span className="text-xs text-zinc-500 select-none">
                                            {formData.fullLengthName || 'Drag & Drop Photograph'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-2.5 border border-zinc-250 text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                >
                                    ← PREVIOUS
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!formData.govIdName || !formData.closeUpName || !formData.midShotName || !formData.fullLengthName) {
                                            alert('Please select and upload all required documents and photographs.');
                                            return;
                                        }
                                        setStep(6);
                                    }}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    CONTINUE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: Social links */}
                    {step === 6 && (
                        <div className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 6 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Social Media & Portfolio Channels
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Instagram Profile Link
                                    </label>
                                    <input
                                        type="url"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleInputChange}
                                        placeholder="https://instagram.com/yourhandle"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Facebook Profile Link
                                    </label>
                                    <input
                                        type="url"
                                        name="facebook"
                                        value={formData.facebook}
                                        onChange={handleInputChange}
                                        placeholder="https://facebook.com/username"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Portfolio Website (optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="portfolioWebsite"
                                        value={formData.portfolioWebsite}
                                        onChange={handleInputChange}
                                        placeholder="https://www.yourportfolio.com"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                        Other Social Media Link
                                    </label>
                                    <input
                                        type="url"
                                        name="otherSocial"
                                        value={formData.otherSocial}
                                        onChange={handleInputChange}
                                        placeholder="e.g. YouTube profile link"
                                        className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne text-[#111111] text-xs px-4 py-3 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-2.5 border border-zinc-250 text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                >
                                    ← PREVIOUS
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(7)}
                                    className="px-8 py-3 bg-gold-champagne hover:bg-black text-white transition-colors font-sans font-bold text-[10px] tracking-[0.2em] inline-flex items-center gap-2 uppercase"
                                >
                                    CONTINUE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 7: Agreement & Checkout */}
                    {step === 7 && (
                        <form onSubmit={handleSubmitRegistration} className="space-y-8 animate-fade-in font-sans text-xs">
                            <div className="border-b border-zinc-150 pb-4">
                                <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase block">
                                    STEP 7 OF 7
                                </span>
                                <h3 className="font-serif text-2xl text-[#111111] uppercase font-bold mt-1">
                                    Agreement Details & Fees Calculation
                                </h3>
                            </div>

                            {/* Review summary cards */}
                            <div className="space-y-4">
                                <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                                    Summary Review:
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-[#FAF8F3] border border-zinc-200 p-6">
                                    <div>
                                        <span className="text-zinc-[450] block font-bold">FULL NAME</span>
                                        <span className="text-[#111111] font-bold block">{formData.fullName}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-[450] block font-bold">AUDITION STATE</span>
                                        <span className="text-gold-champagne font-bold block">{formData.state}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-[450] block font-bold">HEIGHT</span>
                                        <span className="text-[#111111] block">{formData.height} CM</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-[450] block font-bold">EMAIL ID</span>
                                        <span className="text-[#111111] block truncate">{formData.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Agreement Checkboxes */}
                            <div className="border border-zinc-200 bg-white p-6 space-y-4">
                                <h4 className="font-serif text-xs font-bold text-[#111111] uppercase flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gold-champagne shrink-0" />
                                    Model Agreement Consent
                                </h4>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="agreed"
                                        name="agreed"
                                        checked={formData.agreed}
                                        onChange={handleInputChange}
                                        className="mt-1 border border-zinc-300 accent-gold-champagne bg-white"
                                        required
                                    />
                                    <label htmlFor="agreed" className="text-[11px] text-zinc-500 leading-relaxed cursor-pointer select-none font-normal">
                                        I have read and agree to the{' '}
                                        <Link href="/legal/terms" target="_blank" className="text-gold-champagne hover:underline font-semibold">
                                            Eligibility Criteria
                                        </Link>,{' '}
                                        <Link href="/legal/terms" target="_blank" className="text-gold-champagne hover:underline font-semibold">
                                            Terms & Conditions
                                        </Link>,{' '}
                                        <Link href="/legal/privacy" target="_blank" className="text-gold-champagne hover:underline font-semibold">
                                            Privacy Policy
                                        </Link>,{' '}
                                        <Link href="/legal/model-agreement" target="_blank" className="text-gold-champagne hover:underline font-semibold">
                                            Model Agreement
                                        </Link>,{' '}
                                        <Link href="/legal/refund" target="_blank" className="text-gold-champagne hover:underline font-semibold">
                                            Refund Policy
                                        </Link>, and{' '}
                                        <Link href="/legal/cancellation" target="_blank" className="text-gold-champagne hover:underline font-semibold">
                                            Cancellation Policy
                                        </Link> of North India&apos;s Next Top Model 2026.
                                    </label>
                                </div>
                            </div>

                            {/* Fees table display */}
                            <div className="border border-gold-champagne/30 bg-[#FAF8F3] p-8 max-w-sm ml-auto">
                                <span className="text-[9px] tracking-[0.25em] text-gold-champagne font-bold uppercase block mb-1">
                                    OFFICIAL SCREENING FEE
                                </span>
                                <h4 className="font-serif text-sm font-bold text-[#111111] uppercase mb-4">
                                    Application Fee Summary
                                </h4>

                                <div className="space-y-2 text-xs font-sans text-zinc-500">
                                    <div className="flex justify-between">
                                        <span>Base Processing fee:</span>
                                        <span className="text-[#111111] font-bold font-mono">₹{feeBase.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-200 pb-2">
                                        <span>GST (18% applicable):</span>
                                        <span className="text-[#111111] font-mono">₹{gstAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xs pt-2 text-[#111111] font-bold">
                                        <span>Total Amount Payable:</span>
                                        <span className="text-gold-champagne font-mono">₹{finalTotalAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <p className="text-[9px] text-zinc-400 font-sans leading-relaxed mt-4 italic">
                                    * Fees are strictly non-refundable and include entry to castings, training guides, and evaluation dossier reports.
                                </p>

                                {/* Gateway config picker */}
                                <div className="mt-6 pt-4 border-t border-zinc-200">
                                    <label className="text-[9px] tracking-wider text-zinc-500 font-bold uppercase block mb-2">
                                        Select Simulated Gateway:
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Razorpay', 'Cashfree', 'PayU'].map((gw) => (
                                            <button
                                                key={gw}
                                                type="button"
                                                onClick={() => setSelectedGateway(gw)}
                                                className={`py-2 text-[9px] font-sans font-bold tracking-wider border rounded-none transition-all ${selectedGateway === gw
                                                    ? 'border-gold-champagne bg-gold-champagne text-white'
                                                    : 'border-zinc-200 text-zinc-500 bg-white hover:border-[#111111]'
                                                    }`}
                                            >
                                                {gw}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="pt-6 border-t border-zinc-200 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-2.5 border border-zinc-250 text-zinc-500 hover:text-[#111111] transition-all font-sans text-xs tracking-wider"
                                    disabled={isSubmitting}
                                >
                                    ← PREVIOUS STEP
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3.5 bg-gold-champagne text-white hover:bg-[#111111] transition-all font-sans font-bold text-[10px] tracking-[0.25em] inline-flex items-center gap-2 uppercase"
                                >
                                    {isSubmitting ? 'PROCESSING...' : 'PROCEED TO MOCK PAYMENT'} <CreditCard className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
