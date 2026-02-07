'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Metadata } from 'next';
import { Download, Eye, User, Mail, Phone, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const feeFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters long')
        .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string()
        .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
    class: z.string().min(1, 'Please select a class'),
});

type FeeFormData = z.infer<typeof feeFormSchema>;

export default function FeesStructurePage() {
    const [showFeeStructure, setShowFeeStructure] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FeeFormData>({
        resolver: zodResolver(feeFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            class: '',
        }
    });

    const onSubmit = async (data: FeeFormData) => {
        // data is already validated by zod here
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowFeeStructure(true);
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
                            <p className="text-white/80 leading-relaxed">
                                Fill in your details below to view our complete fee structure
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form Section with Image */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Image and Text */}
                            <div className="space-y-6">
                                <div className="relative">
                                    <img
                                        src="/images/fee_structure_asset.svg"
                                        alt="Fee Structure"
                                        className="w-full h-auto max-w-lg mx-auto"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-springer-gray text-md leading-relaxed text-justify">
                                        At Springer Public School, we believe quality education should be accessible to all. Our fee structure is designed to be transparent, competitive, and value-driven.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="p-8 md:p-10">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-springer-charcoal mb-3">
                                        Request Fee Structure
                                    </h2>
                                    <p className="text-springer-gray">
                                        Please provide your details to access the fee structure
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Full Name *
                                        </label>
                                        <input
                                            {...register('name')}
                                            className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.name
                                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                }`}
                                            placeholder="Enter your full name"
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email Address *
                                        </label>
                                        <input
                                            {...register('email')}
                                            className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.email
                                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                }`}
                                            placeholder="your.email@example.com"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone Number *
                                        </label>
                                        <input
                                            {...register('phone')}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={10}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                e.target.value = value;
                                                register('phone').onChange(e);
                                            }}
                                            className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.phone
                                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                }`}
                                            placeholder="10 digit mobile number"
                                            disabled={isSubmitting}
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                            <GraduationCap className="w-4 h-4 inline mr-2" />
                                            Class Interested In *
                                        </label>
                                        <select
                                            {...register('class')}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.class
                                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                }`}
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
                                        {errors.class && (
                                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.class.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-6 py-4 bg-springer-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
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
