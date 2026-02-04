import type { Metadata } from 'next';
import { schoolInfo, feesStructure } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Check, Download, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Fees Structure',
    description: `View the complete fees structure for all classes at ${schoolInfo.name} for academic year 2025-26.`,
};

export default function FeesStructurePage() {
    return (
        <main className="pt-24">
            {/* Hero Banner */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
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
                        <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
                            Fees Structure
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Transparent & <span className="text-springer-red">Affordable</span>
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Our fee structure is designed to be transparent and affordable while maintaining
                            the highest standards of education.
                        </p>
                    </div>
                </div>
            </section>

            {/* Fees Table */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Academic Year 2025-26"
                        title="Complete Fee Structure"
                        description="Detailed breakdown of fees for all classes. Additional charges may apply for transport, uniform, and extracurricular activities."
                    />

                    <div className="max-w-6xl mx-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-card">
                                <thead>
                                    <tr className="bg-springer-red text-white">
                                        <th className="px-6 py-4 text-left font-semibold">Class</th>
                                        <th className="px-6 py-4 text-right font-semibold">Admission Fee</th>
                                        <th className="px-6 py-4 text-right font-semibold">Annual Fee</th>
                                        <th className="px-6 py-4 text-right font-semibold">Tuition Fee</th>
                                        <th className="px-6 py-4 text-right font-semibold">Total (Annual)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feesStructure.map((row, index) => (
                                        <tr
                                            key={row.class}
                                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                                }`}
                                        >
                                            <td className="px-6 py-4 font-semibold text-springer-charcoal">{row.class}</td>
                                            <td className="px-6 py-4 text-right text-springer-gray">{row.admissionFee}</td>
                                            <td className="px-6 py-4 text-right text-springer-gray">{row.annualFee}</td>
                                            <td className="px-6 py-4 text-right text-springer-gray">{row.tuitionFee}</td>
                                            <td className="px-6 py-4 text-right font-bold text-springer-red">{row.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 p-6 bg-springer-gray-light rounded-xl">
                            <h3 className="font-semibold text-springer-charcoal mb-3">Important Notes:</h3>
                            <ul className="space-y-2 text-sm text-springer-gray">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-springer-green mt-0.5 flex-shrink-0" />
                                    <span>Admission fee is one-time and non-refundable</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-springer-green mt-0.5 flex-shrink-0" />
                                    <span>Annual fee includes examination, library, sports, and development charges</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-springer-green mt-0.5 flex-shrink-0" />
                                    <span>Tuition fee can be paid monthly, quarterly, or annually</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-springer-green mt-0.5 flex-shrink-0" />
                                    <span>10% sibling discount available on tuition fees</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-springer-green mt-0.5 flex-shrink-0" />
                                    <span>Transport and uniform charges are additional and vary by location/size</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Fees */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Additional Charges"
                        title="Optional Services"
                        description="Additional services available for enhanced learning and convenience."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Transport",
                                description: "Safe and comfortable bus service",
                                price: "₹2,000 - ₹4,000/month",
                                features: ["GPS tracking", "Trained staff", "Multiple routes"],
                            },
                            {
                                title: "Uniform",
                                description: "Complete school uniform set",
                                price: "₹5,000 - ₹8,000/year",
                                features: ["Summer uniform", "Winter uniform", "Sports uniform"],
                            },
                            {
                                title: "Extra Classes",
                                description: "Additional coaching and activities",
                                price: "₹1,500 - ₹3,000/month",
                                features: ["Subject coaching", "Music/Dance", "Sports training"],
                            },
                        ].map((service, index) => (
                            <AnimatedCard key={service.title} delay={index * 100}>
                                <div className="card-modern p-6 h-full">
                                    <h3 className="text-xl font-bold text-springer-charcoal mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-springer-gray text-sm mb-4">{service.description}</p>
                                    <div className="text-2xl font-bold text-springer-red mb-4">
                                        {service.price}
                                    </div>
                                    <ul className="space-y-2">
                                        {service.features.map((feature) => (
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
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-springer-charcoal mb-6">
                            Have Questions About Fees?
                        </h2>
                        <p className="text-springer-gray text-lg mb-8">
                            Our admissions team is here to help you understand our fee structure and payment options.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-springer-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300"
                            >
                                <Phone className="w-5 h-5" />
                                Contact Us
                            </a>
                            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-springer-red font-semibold rounded-xl border-2 border-springer-red hover:bg-springer-red hover:text-white transition-all duration-300">
                                <Download className="w-5 h-5" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
