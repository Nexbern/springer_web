'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Send, Check, User, MessageSquare } from 'lucide-react';
import { schoolInfo } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

const contactFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters long')
        .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits')
        .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
    subject: z.string().min(3, 'Subject must be at least 3 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        content: schoolInfo.address,
        link: null,
    },
    {
        icon: Phone,
        title: "Call Us",
        content: schoolInfo.phone,
        link: `tel:${schoolInfo.phone}`,
    },
    {
        icon: Mail,
        title: "Email Us",
        content: schoolInfo.email,
        link: `mailto:${schoolInfo.email}`,
    },
    {
        icon: Clock,
        title: "Office Hours",
        content: "Mon - Sat: 8:00 AM - 4:00 PM",
        link: null,
    },
];

export default function ContactPage() {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            const response = await fetch('/api/contact-enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to submit contact enquiry';
                try {
                    const error = await response.json();
                    errorMessage = error.error || errorMessage;
                } catch (e) {
                    errorMessage = response.statusText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            setShowSuccessDialog(true);
            reset();
        } catch (error: any) {
            console.error('Contact form error:', error);
            alert(error.message || 'Failed to submit contact enquiry');
        }
    };

    return (
        <main className="pt-24">
            {/* Hero Banner with Image and Black Overlay */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/about-page-campus-gallery/jpeg-optimizer_NKF_9783_converted.webp"
                        alt="Contact"
                        className="w-full h-full object-cover"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1 bg-springer-red text-white text-xs font-medium rounded-full mb-4">
                            Contact Us
                        </span>
                        <h1 className="text-xl lg:text-3xl font-semibold text-white mb-6">
                            Get in <span className="text-springer-red">Touch</span>
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message and we'll
                            respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="section-padding">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-10">
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon;
                            const content = (
                                <div className="bg-white rounded-2xl shadow-card p-6 text-center h-full hover:shadow-hover transition-shadow">
                                    <div className="w-14 h-14 bg-gradient-to-br from-springer-red to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-springer-charcoal mb-2">{item.title}</h3>
                                    <p className="text-springer-gray text-sm">{item.content}</p>
                                </div>
                            );

                            return (
                                <AnimatedCard key={item.title} delay={index * 100}>
                                    {item.link ? (
                                        <a href={item.link} className="block">
                                            {content}
                                        </a>
                                    ) : (
                                        content
                                    )}
                                </AnimatedCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <AnimatedCard direction="left">
                            <div className="bg-white rounded-xl sm:rounded-3xl shadow-card p-6 lg:p-10">
                                <h2 className="text-xl lg:text-2xl font-semibold text-springer-charcoal mb-2">
                                    Send us a Message
                                </h2>
                                <p className="text-springer-gray sm:text-base text-sm mb-8">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                Your Name *
                                            </label>
                                            <input
                                                {...register('name')}
                                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.name
                                                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                    : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                    }`}
                                                placeholder="Enter your name"
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
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                                <Phone className="w-4 h-4 inline mr-2" />
                                                Phone Number
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
                                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                                Subject *
                                            </label>
                                            <input
                                                {...register('subject')}
                                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.subject
                                                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                    : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                    }`}
                                                placeholder="What is this about?"
                                                disabled={isSubmitting}
                                            />
                                            {errors.subject && (
                                                <p className="mt-1 text-xs text-red-500 font-medium">{errors.subject.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                            <Send className="w-4 h-4 inline mr-2" />
                                            Message *
                                        </label>
                                        <textarea
                                            {...register('message')}
                                            rows={5}
                                            className={`w-full px-4 py-3 border rounded-lg outline-none transition resize-none ${errors.message
                                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                                }`}
                                            placeholder="Write your message here..."
                                            disabled={isSubmitting}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-springer-red hover:bg-red-700 text-white py-6"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </AnimatedCard>

                        {/* Map */}
                        <AnimatedCard direction="right" delay={100}>
                            <div className="bg-white rounded-3xl shadow-card overflow-hidden h-full">
                                <div className="aspect-square lg:aspect-auto lg:h-full">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17752.276192457146!2d83.35213101167238!3d26.79881504234065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145b89702bb61%3A0xbf2d72cfcf45a3da!2sSpringer%20Public%20Schools!5e0!3m2!1sen!2sin!4v1770706011519!5m2!1sen!2sin" width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '400px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Springer Public School Location"
                                    />
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="FAQs"
                        title="Frequently Asked Questions"
                        description="Find answers to commonly asked questions about our school and admission process."
                    />

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                q: "What is the admission process?",
                                a: "The admission process involves filling out an online application, document verification, an entrance assessment, a parent interview, and fee payment. You can find detailed information on our Admissions page.",
                            },
                            {
                                q: "What documents are required for admission?",
                                a: "Required documents include birth certificate, previous school records (if applicable), passport-sized photographs, address proof, and ID proof of parents.",
                            },
                            {
                                q: "Does the school provide transportation?",
                                a: "Yes, we provide safe and comfortable bus services covering major areas of the city. Transport fees are separate from tuition fees.",
                            },
                            {
                                q: "What extracurricular activities are offered?",
                                a: "We offer a wide range of activities including sports, music, dance, art, robotics, coding, and various clubs. Students can choose activities based on their interests.",
                            },
                            {
                                q: "How can I track my child's progress?",
                                a: "We have a parent portal where you can access academic reports, attendance records, and communicate with teachers. Regular parent-teacher meetings are also conducted.",
                            },
                        ].map((faq, index) => (
                            <AnimatedCard key={index} delay={index * 100}>
                                <div className="bg-springer-gray-light rounded-xl p-6">
                                    <h4 className="font-semibold text-springer-charcoal mb-2">{faq.q}</h4>
                                    <p className="text-springer-gray text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Dialog */}
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            Message Sent Successfully!
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Thank you for reaching out to us. Our team will get back to you within 24 hours.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => setShowSuccessDialog(false)}
                            className="bg-springer-red hover:bg-red-700"
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    );
}
