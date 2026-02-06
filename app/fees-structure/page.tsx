'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Download, Eye, User, Mail, Phone, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function FeesStructurePage() {
    const [showFeeStructure, setShowFeeStructure] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        class: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setShowFeeStructure(true);
        setSubmitting(false);
    };

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/pdf/fee_structure_springer.pdf';
        link.download = 'AY 2026-27 FEE STRUCTURE SPRINGER.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!showFeeStructure) {
        return (
            <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-white">
                {/* Hero Banner */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/images/campus_exterior.jpg"
                            alt="Fees Structure"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </div>

                    <div className="section-padding relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-1 bg-springer-red text-white text-xs font-medium rounded-full mb-4">
                                Fees Structure
                            </span>
                            <h1 className="text-xl lg:text-3xl font-semibold text-white mb-6">
                                Transparent & <span className="text-springer-red">Affordable</span>
                            </h1>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Fill in your details below to view our complete fee structure
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-16">
                    <div className="max-w-2xl mx-auto px-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-springer-charcoal mb-3">
                                    Request Fee Structure
                                </h2>
                                <p className="text-springer-gray">
                                    Please provide your details to access the fee structure
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none transition"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none transition"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        <Phone className="w-4 h-4 inline mr-2" />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none transition"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        <GraduationCap className="w-4 h-4 inline mr-2" />
                                        Class Interested In *
                                    </label>
                                    <select
                                        required
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none transition"
                                    >
                                        <option value="">Select a class</option>
                                        <option value="Nursery">Nursery</option>
                                        <option value="LKG">LKG</option>
                                        <option value="UKG">UKG</option>
                                        <option value="Class 1">Class 1</option>
                                        <option value="Class 2">Class 2</option>
                                        <option value="Class 3">Class 3</option>
                                        <option value="Class 4">Class 4</option>
                                        <option value="Class 5">Class 5</option>
                                        <option value="Class 6">Class 6</option>
                                        <option value="Class 7">Class 7</option>
                                        <option value="Class 8">Class 8</option>
                                        <option value="Class 9">Class 9</option>
                                        <option value="Class 10">Class 10</option>
                                        <option value="Class 11">Class 11</option>
                                        <option value="Class 12">Class 12</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full px-6 py-4 bg-springer-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-5 h-5" />
                                            View Fee Structure
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="pt-24 min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-white border-b border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-springer-charcoal mb-2">
                                Fee Structure 2025-26
                            </h1>
                            <p className="text-springer-gray">
                                Springer Public School - Complete Fee Details
                            </p>
                        </div>
                        <button
                            onClick={handleDownloadPDF}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-springer-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Download className="w-5 h-5" />
                            Download PDF
                        </button>
                    </div>
                </div>
            </section>

            {/* Fee Structure Image */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white rounded-2xl overflow-hidden">
                        <Image
                            src="/images/fee_structure_springer_school.webp"
                            alt="Fee Structure"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-springer-charcoal mb-4">
                        Need a Copy?
                    </h2>
                    <p className="text-springer-gray mb-6">
                        Download the fee structure PDF for your records
                    </p>
                    <button
                        onClick={handleDownloadPDF}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-springer-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <Download className="w-5 h-5" />
                        Download Fee Structure PDF
                    </button>
                </div>
            </section>
        </main>
    );
}
