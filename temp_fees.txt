import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Download, Printer, CheckCircle, AlertCircle } from 'lucide-react';
import { feesStructure } from '@/data/siteData';

interface FormData {
    name: string;
    mobile: string;
    address: string;
    comment: string;
}

interface FormErrors {
    name?: string;
    mobile?: string;
    address?: string;
}

export function FeesStructure() {
    const [showFeesStructure, setShowFeesStructure] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        mobile: '',
        address: '',
        comment: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setShowFeesStructure(true);
            // Scroll to fees structure
            setTimeout(() => {
                document.getElementById('fees-table')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <main className="min-h-screen bg-springer-white pt-36 pb-20">
            <div className="section-padding max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-springer-red/10 rounded-full mb-4">
                        <DollarSign className="w-4 h-4 text-springer-red" />
                        <span className="text-sm font-semibold text-springer-red">Fee Information</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-springer-charcoal mb-4">
                        Fees Structure
                    </h1>
                    <p className="text-springer-gray max-w-2xl mx-auto">
                        {!showFeesStructure
                            ? 'Please fill in your details to view the complete fees structure'
                            : 'Complete fees structure for Academic Year 2025-26'}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showFeesStructure ? (
                        /* Form Section */
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-card p-8 md:p-12"
                        >
                            <h2 className="text-2xl font-bold text-springer-charcoal mb-6">
                                Request Fees Information
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-springer-charcoal mb-2"
                                    >
                                        Full Name <span className="text-springer-red">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.name
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-springer-red focus:border-springer-red'
                                            }`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.name}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Number Field */}
                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-semibold text-springer-charcoal mb-2"
                                    >
                                        Mobile Number <span className="text-springer-red">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.mobile
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-springer-red focus:border-springer-red'
                                            }`}
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength={10}
                                    />
                                    {errors.mobile && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.mobile}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-semibold text-springer-charcoal mb-2"
                                    >
                                        Address <span className="text-springer-red">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.address
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-springer-red focus:border-springer-red'
                                            }`}
                                        placeholder="Enter your address"
                                    />
                                    {errors.address && (
                                        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Comment Field */}
                                <div>
                                    <label
                                        htmlFor="comment"
                                        className="block text-sm font-semibold text-springer-charcoal mb-2"
                                    >
                                        Comment (Optional)
                                    </label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-springer-red focus:border-springer-red transition-colors resize-none"
                                        placeholder="Any questions or comments..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-springer-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    View Fees Structure
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        /* Fees Structure Table */
                        <motion.div
                            key="fees"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            id="fees-table"
                        >
                            {/* Success Message */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-green-900">Request Submitted Successfully!</p>
                                    <p className="text-sm text-green-700">
                                        Thank you, {formData.name}. Here's the complete fees structure.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mb-6 print:hidden">
                                <button
                                    onClick={handlePrint}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-springer-charcoal text-white font-semibold rounded-xl hover:bg-black transition-all duration-300"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-springer-red text-springer-red font-semibold rounded-xl hover:bg-springer-red hover:text-white transition-all duration-300"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                            </div>

                            {/* Fees Table */}
                            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-springer-red text-white">
                                                <th className="px-6 py-4 text-left font-semibold">Class</th>
                                                <th className="px-6 py-4 text-left font-semibold">Admission Fee</th>
                                                <th className="px-6 py-4 text-left font-semibold">Annual Fee</th>
                                                <th className="px-6 py-4 text-left font-semibold">Tuition Fee</th>
                                                <th className="px-6 py-4 text-left font-semibold">Total (Annual)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feesStructure.map((fee, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                                        }`}
                                                >
                                                    <td className="px-6 py-4 font-semibold text-springer-charcoal">
                                                        {fee.class}
                                                    </td>
                                                    <td className="px-6 py-4 text-springer-gray">{fee.admissionFee}</td>
                                                    <td className="px-6 py-4 text-springer-gray">{fee.annualFee}</td>
                                                    <td className="px-6 py-4 text-springer-gray">{fee.tuitionFee}</td>
                                                    <td className="px-6 py-4 font-bold text-springer-red">{fee.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Notes */}
                                <div className="p-6 bg-gray-50 border-t border-gray-200">
                                    <h3 className="font-bold text-springer-charcoal mb-3">Important Notes:</h3>
                                    <ul className="space-y-2 text-sm text-springer-gray">
                                        <li className="flex items-start gap-2">
                                            <span className="text-springer-red mt-1">•</span>
                                            <span>
                                                Admission fee is one-time and non-refundable
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-springer-red mt-1">•</span>
                                            <span>
                                                Annual fee includes charges for library, sports, and activities
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-springer-red mt-1">•</span>
                                            <span>
                                                Tuition fee is payable monthly or quarterly as per convenience
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-springer-red mt-1">•</span>
                                            <span>
                                                Transportation charges are separate and optional
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-springer-red mt-1">•</span>
                                            <span>
                                                Sibling discount of 10% available on tuition fees
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
        </main>
    );
}
