'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Users,
    Search,
    Filter,
    Download,
    Check,
    X,
    AlertCircle,
    Sparkles,
    ClipboardList,
    FileText,
    FileCheck,
    Lock,
    ChevronDown,
    Mail,
    Smartphone
} from 'lucide-react';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [authError, setAuthError] = useState('');

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Selected candidate for details pane
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [adminNotesText, setAdminNotesText] = useState('');
    const [communicationStatus, setCommunicationStatus] = useState('');

    const northStates = [
        'Delhi (NCR)', 'Punjab', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Uttarakhand', 'Uttar Pradesh', 'Rajasthan', 'Chandigarh (UT)'
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        if (passphrase === 'nintmadmin2026' || passphrase === 'creativatorss') {
            setIsAuthenticated(true);
            fetchRegistrations();
        } else {
            setAuthError('Invalid administrator credentials.');
        }
    };

    const fetchRegistrations = () => {
        setLoading(true);
        let query = `/api/admin?search=${searchTerm}&state=${stateFilter}&status=${statusFilter}`;
        fetch(query)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRegistrations(data.registrations);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching registrations:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchRegistrations();
        }
    }, [searchTerm, stateFilter, statusFilter, isAuthenticated]);

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    action: 'updateStatus',
                    applicationStatus: status
                }),
            });
            const data = await res.json();
            if (data.success) {
                fetchRegistrations();
                if (selectedCandidate && selectedCandidate.id === id) {
                    setSelectedCandidate({ ...selectedCandidate, applicationStatus: status });
                }
            } else {
                alert('Failed to modify status.');
            }
        } catch (e) {
            console.error(e);
            alert('Error updating status.');
        }
    };

    const handleSaveNotes = async (id) => {
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    adminNotes: adminNotesText
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert('Director feedback saved successfully!');
                fetchRegistrations();
                if (selectedCandidate && selectedCandidate.id === id) {
                    setSelectedCandidate({ ...selectedCandidate, adminNotes: adminNotesText });
                }
            } else {
                alert('Failed to save assessment feedback.');
            }
        } catch (e) {
            console.error(e);
            alert('Error saving notes.');
        }
    };

    const handleSimulateCommunication = (candidate) => {
        setCommunicationStatus('dispatching');
        setTimeout(() => {
            setCommunicationStatus('success');
            alert(`SIMULATION NOTICE:\nAudition look test tickets and brief code sent to ${candidate.fullName} via SMS (+91 ${candidate.phone}) and email (${candidate.email})!`);
            setCommunicationStatus('');
        }, 1500);
    };

    const handleExportCSV = () => {
        if (registrations.length === 0) return;

        const headers = [
            'Registration ID', 'Full Name', 'Email', 'Phone', 'Gender', 'DOB', 'Marital Status',
            'Height (CM)', 'Vital Stats', 'Experience', 'City', 'State', 'Payment Status', 'Review Status', 'Created At'
        ];

        const rows = registrations.map(r => [
            r.id, r.fullName, r.email, r.phone, r.gender, r.dob, r.maritalStatus,
            r.height, r.vitalStats || 'N/A', r.experience, r.city, r.state, r.paymentStatus, r.applicationStatus, r.createdAt
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `nintm_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
                {!isAuthenticated ? (
                    <div className="max-w-md mx-auto bg-white border border-zinc-200 p-8 md:p-10 text-center space-y-6 animate-fade-in my-8 shadow-sm">
                        <Lock className="w-10 h-10 text-gold-champagne mx-auto" />
                        <div className="space-y-2">
                            <h2 className="font-serif text-2xl text-[#111111] font-light uppercase">NINTM Admin Portal</h2>
                            <p className="text-[10px] text-zinc-550 leading-relaxed font-sans font-normal">
                                Access is restricted to authorized representatives of Creativatorss. Enter the administration passcode to decrypt files database.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4 pt-2">
                            <div className="space-y-2 text-left">
                                <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">
                                    ADMINISTRATOR PASSPHRASE
                                </label>
                                <input
                                    type="password"
                                    value={passphrase}
                                    onChange={(e) => setPassphrase(e.target.value)}
                                    placeholder="Enter panel passcode"
                                    className="w-full bg-[#FAF8F3]/50 border border-zinc-200 focus:border-gold-champagne py-3 px-4 text-center tracking-widest text-[#111111] outline-none text-xs"
                                    required
                                />
                            </div>
                            {authError && (
                                <p className="text-red-650 text-[10px] font-bold">{authError}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gold-champagne hover:bg-black text-white font-bold text-xs tracking-wider transition-colors uppercase"
                            >
                                DECRYPT ARCHIVES
                            </button>
                        </form>
                        <div className="pt-4 text-[9px] text-zinc-500 font-sans leading-relaxed border-t border-zinc-200 font-normal">
                            Passphrase: <code className="text-gold-champagne font-mono font-bold">creativatorss</code> or <code className="text-gold-champagne font-mono font-bold">nintmadmin2026</code>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in font-sans text-xs">
                        {/* Header info */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-200 pb-6">
                            <div>
                                <span className="text-[10px] text-gold-champagne tracking-[0.2em] font-extrabold uppercase font-sans">
                                    CREATIVATORSS BACKOFFICE
                                </span>
                                <h1 className="font-serif text-3xl font-light uppercase text-[#111111] mt-1">
                                    Director Management Panel
                                </h1>
                                <span className="text-zinc-[400] text-[10px] block mt-1 font-normal font-sans">
                                    Auditions dashboard for NINTM – The Comeback 2026. Verified registry database logs.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleExportCSV}
                                    disabled={registrations.length === 0}
                                    className="px-5 py-2.5 bg-white border border-zinc-300 hover:border-black text-zinc-650 hover:text-black transition-colors text-[11px] tracking-wider inline-flex items-center gap-2 font-bold"
                                >
                                    <Download className="w-3.5 h-3.5" /> EXPORT SPREADSHEET (CSV)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAuthenticated(false)}
                                    className="px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-[10px] font-bold uppercase transition-colors"
                                >
                                    LOGOUT
                                </button>
                            </div>
                        </div>

                        {/* Filter ribbons */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#FAF8F3] border border-zinc-200 w-full items-end">
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">Search Candidate</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-zinc-400"><Search className="w-4 h-4" /></span>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search by full name, ID, phone..."
                                        className="w-full bg-white border border-zinc-200 focus:border-gold-champagne pl-10 pr-4 py-2 outline-none text-[#111111] text-xs"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">Audition State</label>
                                <select
                                    value={stateFilter}
                                    onChange={(e) => setStateFilter(e.target.value)}
                                    className="w-full bg-white border border-zinc-200 py-2 px-3 text-[#111111] outline-none"
                                >
                                    <option value="">All States</option>
                                    {northStates.map(st => (
                                        <option key={st} value={st}>{st}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">Casting Review Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full bg-white border border-zinc-200 py-2 px-3 text-[#111111] outline-none"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Payment Successful">Payment Completed</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Selected">Selected Candidates</option>
                                </select>
                            </div>
                        </div>

                        {/* Split layout: Candidates List + Details Drawer */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-[#111111]">

                            {/* Left Column: Candidates Table */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="font-bold text-zinc-400 block text-[10px] uppercase">
                                        Audition Profiles Logged: {registrations.length}
                                    </span>
                                    {loading && <span className="text-[10px] text-gold-champagne animate-pulse font-semibold">Updating folder streams...</span>}
                                </div>

                                {registrations.length === 0 ? (
                                    <div className="border border-zinc-200 py-16 text-center text-zinc-[400] space-y-2 bg-[#FAF8F3]">
                                        <AlertCircle className="w-10 h-10 text-gold-champagne mx-auto" />
                                        <h3 className="font-serif text-[#111111] font-bold uppercase">No records matching</h3>
                                        <p className="text-zinc-[650] text-[10px]">No candidate records matched the active search filters.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto border border-zinc-200 bg-white">
                                        <table className="w-full text-left font-sans text-xs border-collapse">
                                            <thead>
                                                <tr className="bg-[#FAF8F3] border-b border-zinc-200 text-zinc-500 uppercase font-bold text-[9px] tracking-wider">
                                                    <th className="py-4 px-4">Registry ID</th>
                                                    <th className="py-4 px-4">FullName</th>
                                                    <th className="py-4 px-4">City / State</th>
                                                    <th className="py-4 px-4">Metrics</th>
                                                    <th className="py-4 px-4">Application Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-200">
                                                {registrations.map((cand) => {
                                                    const isSelected = selectedCandidate && selectedCandidate.id === cand.id;
                                                    return (
                                                        <tr
                                                            key={cand.id}
                                                            onClick={() => {
                                                                setSelectedCandidate(cand);
                                                                setAdminNotesText(cand.adminNotes || '');
                                                            }}
                                                            className={`cursor-pointer hover:bg-[#FAF8F3]/50 transition-colors uppercase ${isSelected ? 'bg-[#FAF8F3] border-l-2 border-gold-champagne' : 'text-zinc-650'
                                                                }`}
                                                        >
                                                            <td className="py-4 px-4 font-mono font-bold text-gold-champagne">{cand.id}</td>
                                                            <td className="py-4 px-4">
                                                                <div className="font-bold text-[#111111] normal-case">{cand.fullName}</div>
                                                                <div className="text-[9.5px] text-zinc-400 font-mono lower-case font-normal">{cand.email}</div>
                                                            </td>
                                                            <td className="py-4 px-4 font-normal">
                                                                <div>{cand.city}</div>
                                                                <div className="text-[9.5px] text-zinc-400">{cand.state}</div>
                                                            </td>
                                                            <td className="py-4 px-4 text-zinc-[650] font-semibold font-mono">
                                                                {cand.height}CM / {cand.experience.charAt(0)}
                                                            </td>
                                                            <td className="py-4 px-4 font-bold text-[10px] tracking-wide">
                                                                <span className={
                                                                    cand.applicationStatus === 'Selected' ? 'text-green-700' :
                                                                        cand.applicationStatus === 'Shortlisted' ? 'text-cyan-700' :
                                                                            'text-gold-champagne'
                                                                }>
                                                                    {cand.applicationStatus}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Candidate Parameters Details card */}
                            <div className="lg:col-span-1 space-y-6">
                                {!selectedCandidate ? (
                                    <div className="border border-zinc-200 bg-[#FAF8F3] p-8 text-center text-zinc-400 font-normal italic shadow-none">
                                        Select a candidate row to load the dossier assessment details.
                                    </div>
                                ) : (
                                    <div className="border border-zinc-200 bg-[#FAF8F3] p-6 space-y-6 shadow-sm">
                                        {/* Header info */}
                                        <div className="flex justify-between items-start border-b border-zinc-200 pb-4">
                                            <div>
                                                <span className="text-[9px] text-zinc-400 font-mono block font-semibold">{selectedCandidate.id}</span>
                                                <h3 className="font-serif text-lg text-[#111111] font-bold uppercase mt-0.5">{selectedCandidate.fullName}</h3>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCandidate(null)}
                                                className="text-zinc-[400] hover:text-[#111111] p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Quick review change actions */}
                                        <div className="space-y-2">
                                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">SET CASTING STAGE</span>
                                            <div className="grid grid-cols-3 gap-1">
                                                {[
                                                    { id: 'Under Review', label: 'Review' },
                                                    { id: 'Shortlisted', label: 'Shortlist' },
                                                    { id: 'Selected', label: 'Select' }
                                                ].map((btn) => (
                                                    <button
                                                        key={btn.id}
                                                        onClick={() => handleStatusUpdate(selectedCandidate.id, btn.id)}
                                                        className={`py-2 text-[9.5px] font-sans font-bold tracking-wider rounded-none transition-all ${selectedCandidate.applicationStatus === btn.id
                                                                ? 'bg-gold-champagne text-white'
                                                                : 'bg-white border border-zinc-200 text-zinc-500 hover:text-black hover:bg-zinc-50'
                                                            }`}
                                                    >
                                                        {btn.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Simulated alerts trigger */}
                                        <div className="border border-zinc-200 p-4 bg-white space-y-3 shadow-none">
                                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">AUDITIONS DISPATCH</span>
                                            <button
                                                onClick={() => handleSimulateCommunication(selectedCandidate)}
                                                disabled={communicationStatus === 'dispatching'}
                                                className="w-full py-2 bg-white text-gold-champagne hover:bg-gold-champagne hover:text-white border border-gold-champagne font-bold text-[9px] tracking-widest transition-colors flex items-center justify-center gap-1.5 uppercase"
                                            >
                                                {communicationStatus === 'dispatching' ? 'DISPATCHING...' : 'DISPATCH LOCATION TICKET'}
                                            </button>
                                            <p className="text-[8.5px] text-zinc-[400] leading-normal font-sans font-normal">
                                                Simulates SMS & Email ticket broadcasts for physical castings with custom invitation credentials.
                                            </p>
                                        </div>

                                        {/* Form for Feedback notes */}
                                        <div className="space-y-2">
                                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">DIRECTOR OFFICE FEEDBACK NOTES</span>
                                            <textarea
                                                value={adminNotesText}
                                                onChange={(e) => setAdminNotesText(e.target.value)}
                                                placeholder="Add review feedback, height confirmations, or next steps details (User sees this on dashboard)..."
                                                rows="4"
                                                className="w-full bg-white border border-zinc-200 p-3 text-[#111111] text-xs outline-none focus:border-zinc-350"
                                            />
                                            <button
                                                onClick={() => handleSaveNotes(selectedCandidate.id)}
                                                className="w-full py-2 bg-gold-champagne text-white font-bold uppercase text-[9px] tracking-wider transition-colors hover:bg-black"
                                            >
                                                SAVE DIRECTOR FEEDBACK
                                            </button>
                                        </div>

                                        {/* Detail listing parameters */}
                                        <div className="space-y-4 border-t border-zinc-200 pt-6 text-zinc-500 leading-relaxed font-sans font-normal">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-zinc-[400] block text-[9.5px] font-bold">AGE</span>
                                                    <span className="text-[#111111] font-mono font-semibold">{selectedCandidate.dob}</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-[400] block text-[9.5px] font-bold">GENDER</span>
                                                    <span className="text-[#111111] font-semibold">{selectedCandidate.gender}</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-[400] block text-[9.5px] font-bold">MARITAL STATUS</span>
                                                    <span className="text-[#111111] font-semibold">{selectedCandidate.maritalStatus}</span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-[400] block text-[9.5px] font-bold">PAYMENT REF</span>
                                                    <span className="text-gold-champagne font-bold font-mono truncate block" title={selectedCandidate.paymentDetails?.paymentId}>
                                                        {selectedCandidate.paymentDetails?.paymentId || 'Failed/Pending'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border-t border-zinc-200 pt-4">
                                                <span className="text-zinc-[400] block text-[9.5px] font-bold">POSTAL REGISTER ADDRESS</span>
                                                <div className="text-[#111111] text-[10.5px] font-semibold leading-normal">
                                                    {selectedCandidate.streetAddress}<br />
                                                    {selectedCandidate.streetAddress2 && <>{selectedCandidate.streetAddress2}<br /></>}
                                                    PIN: {selectedCandidate.postalCode}, {selectedCandidate.city}, {selectedCandidate.state}
                                                </div>
                                            </div>

                                            {/* Social logs */}
                                            <div className="border-t border-zinc-200 pt-4 space-y-2">
                                                <span className="text-zinc-[400] block text-[9.5px] font-bold">SOCIAL & PORTFOLIO LOGS</span>
                                                <div className="space-y-1 font-mono text-[9px] font-semibold">
                                                    {selectedCandidate.instagram && (
                                                        <a href={selectedCandidate.instagram} target="_blank" className="text-cyan-700 block hover:underline truncate">
                                                            IG: {selectedCandidate.instagram}
                                                        </a>
                                                    )}
                                                    {selectedCandidate.facebook && (
                                                        <a href={selectedCandidate.facebook} target="_blank" className="text-blue-700 block hover:underline truncate">
                                                            FB: {selectedCandidate.facebook}
                                                        </a>
                                                    )}
                                                    {selectedCandidate.portfolioWebsite && (
                                                        <a href={selectedCandidate.portfolioWebsite} target="_blank" className="text-gold-champagne block hover:underline truncate">
                                                            WEB: {selectedCandidate.portfolioWebsite}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
