'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Check, Calendar, FileText, Users, ClipboardCheck, CreditCard, ArrowRight, Send } from 'lucide-react';
import { admissionSteps } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

const stepIcons = [FileText, ClipboardCheck, Users, Calendar, CreditCard];

export default function AdmissionsPage() {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        grade: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccessDialog(true);
    };

    const admissionsOpen = true;

    return (
        <main className="pt-24">
            {/* Hero Banner with Image and Black Overlay */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/campus_exterior.jpg"
                        alt="Admissions"
                        className="w-full h-full object-cover"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
                            Admissions {admissionsOpen ? 'Open' : 'Closed'}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Begin Your <span className="text-springer-red">Journey</span> With Us
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Join Springer Public School and give your child the gift of quality education
                            and holistic development. Admissions are now open for the academic year 2025-26.
                        </p>
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Admission Process"
                        title="Simple 5-Step Process"
                        description="Our streamlined admission process ensures a smooth and hassle-free experience for parents and students."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {admissionSteps.map((step, index) => {
                            const Icon = stepIcons[index];
                            return (
                                <AnimatedCard key={step.step} delay={index * 100}>
                                    <div className="relative text-center group">
                                        {/* Connector Line */}
                                        {index < admissionSteps.length - 1 && (
                                            <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                                        )}

                                        {/* Step Number */}
                                        <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-springer-red to-red-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                            <Icon className="w-7 h-7 text-white" />
                                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-springer-green text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {step.step}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-springer-charcoal mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-springer-gray text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </AnimatedCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Admission Form */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-5">
                                {/* Info Side */}
                                <div className="lg:col-span-2 bg-springer-red p-8 lg:p-10 text-white">
                                    <h3 className="text-2xl font-bold mb-6">Admission Enquiry</h3>
                                    <p className="text-white/80 mb-8">
                                        Fill out the form and our admissions team will get back to you within 24 hours.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-3">
                                            <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-white/90">Personalized campus tour</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-white/90">Expert counseling session</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-white/90">Detailed fee structure</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-white/90">Program information</span>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-white/20">
                                        <p className="text-sm text-white/70 mb-2">For queries, contact:</p>
                                        <p className="font-semibold">+91 11 2345 6789</p>
                                        <p className="text-sm text-white/70">admissions@springerpublicschool.edu.in</p>
                                    </div>
                                </div>

                                {/* Form Side */}
                                <div className="lg:col-span-3 p-8 lg:p-10">
                                    {admissionsOpen ? (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="studentName">Student's Name *</Label>
                                                    <Input
                                                        id="studentName"
                                                        placeholder="Enter student's name"
                                                        value={formData.studentName}
                                                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="parentName">Parent's Name *</Label>
                                                    <Input
                                                        id="parentName"
                                                        placeholder="Enter parent's name"
                                                        value={formData.parentName}
                                                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter email address"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number *</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="Enter phone number"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="grade">Grade Applying For *</Label>
                                                <Select
                                                    value={formData.grade}
                                                    onValueChange={(value) => setFormData({ ...formData, grade: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select grade" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="nursery">Nursery</SelectItem>
                                                        <SelectItem value="kg">KG</SelectItem>
                                                        <SelectItem value="1">Class 1</SelectItem>
                                                        <SelectItem value="2">Class 2</SelectItem>
                                                        <SelectItem value="3">Class 3</SelectItem>
                                                        <SelectItem value="4">Class 4</SelectItem>
                                                        <SelectItem value="5">Class 5</SelectItem>
                                                        <SelectItem value="6">Class 6</SelectItem>
                                                        <SelectItem value="7">Class 7</SelectItem>
                                                        <SelectItem value="8">Class 8</SelectItem>
                                                        <SelectItem value="9">Class 9</SelectItem>
                                                        <SelectItem value="10">Class 10</SelectItem>
                                                        <SelectItem value="11">Class 11</SelectItem>
                                                        <SelectItem value="12">Class 12</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">Additional Message</Label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Any specific queries or information..."
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-springer-red hover:bg-red-700 text-white py-6"
                                            >
                                                Submit Enquiry
                                                <Send className="w-4 h-4 ml-2" />
                                            </Button>
                                        </form>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Calendar className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-springer-charcoal mb-2">
                                                Admissions Currently Closed
                                            </h3>
                                            <p className="text-springer-gray mb-6">
                                                Admissions for the current academic year are closed. Please check back later
                                                or contact us for information about the next admission cycle.
                                            </p>
                                            <a
                                                href="/contact"
                                                className="inline-flex items-center gap-2 text-springer-red font-medium hover:underline"
                                            >
                                                Contact Us
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fee Structure */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Fee Structure"
                        title="Transparent & Affordable"
                        description="Our fee structure is designed to be transparent and affordable while maintaining the highest standards of education."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Pre-Primary",
                                grades: "Nursery - KG",
                                fee: "₹45,000",
                                period: "per annum",
                                features: ["Tuition Fee", "Activity Fee", "Learning Materials"],
                            },
                            {
                                title: "Primary",
                                grades: "Class 1-5",
                                fee: "₹55,000",
                                period: "per annum",
                                features: ["Tuition Fee", "Lab Fee", "Library Access", "Sports"],
                            },
                            {
                                title: "Secondary",
                                grades: "Class 6-12",
                                fee: "₹65,000",
                                period: "per annum",
                                features: ["Tuition Fee", "Science Labs", "Computer Lab", "Library", "Sports"],
                            },
                        ].map((plan, index) => (
                            <AnimatedCard key={plan.title} delay={index * 100}>
                                <div className="card-modern p-8 text-center h-full">
                                    <h3 className="text-xl font-bold text-springer-charcoal mb-1">
                                        {plan.title}
                                    </h3>
                                    <p className="text-springer-gray text-sm mb-4">{plan.grades}</p>
                                    <div className="text-4xl font-bold text-springer-red mb-1">
                                        {plan.fee}
                                    </div>
                                    <p className="text-springer-gray text-sm mb-6">{plan.period}</p>
                                    <ul className="space-y-3 text-left">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-sm text-springer-gray">
                                                <Check className="w-4 h-4 text-springer-green flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>

                    <p className="text-center text-springer-gray text-sm mt-8">
                        * Additional charges may apply for transport, uniform, and extracurricular activities.
                        Contact us for detailed fee structure.
                    </p>
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
                            Enquiry Submitted Successfully!
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Thank you for your interest in Springer Public School. Our admissions team will
                            contact you within 24 hours.
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
