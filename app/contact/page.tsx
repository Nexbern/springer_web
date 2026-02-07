'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { schoolInfo } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccessDialog(true);
    };

    return (
        <main className="pt-24">
            {/* Hero Banner with Image and Black Overlay */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/hero_banner_02.jpg"
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
                                <p className="text-springer-gray sm:text-lg text-sm mb-8">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Your Name *</Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                id="subject"
                                                placeholder="What is this about?"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Write your message here..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-springer-red hover:bg-red-700 text-white py-6"
                                    >
                                        Send Message
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
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.209021!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjIiTiA3N8KwMTInMzIuNSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                                        width="100%"
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
