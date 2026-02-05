import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { schoolInfo } from '@/data/siteData';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://springerpublicschool.edu.in'),
    title: {
        default: `${schoolInfo.name} - CBSE Affiliated School in India`,
        template: `%s | ${schoolInfo.name}`,
    },
    description: `${schoolInfo.name} offers quality CBSE education with modern facilities, expert faculty, and holistic development programs. Admissions open for 2025-26.`,
    keywords: [
        'CBSE school',
        'best school in India',
        'quality education',
        'STEM education',
        'school admissions',
        'Springer Public School',
    ],
    authors: [{ name: schoolInfo.name }],
    creator: schoolInfo.name,
    publisher: schoolInfo.name,
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://springerpublicschool.edu.in',
        siteName: schoolInfo.name,
        title: `${schoolInfo.name} - CBSE Affiliated School in India`,
        description: `${schoolInfo.name} offers quality CBSE education with modern facilities, expert faculty, and holistic development programs.`,
        images: [
            {
                url: '/images/hero_students_modern_classroom.jpg',
                width: 1200,
                height: 630,
                alt: `${schoolInfo.name} - Modern Education`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${schoolInfo.name} - CBSE Affiliated School`,
        description: 'Quality CBSE education with modern facilities and expert faculty.',
        images: ['/images/hero_students_modern_classroom.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
            <body className="min-h-screen bg-springer-white" suppressHydrationWarning>
                <ConditionalLayout>
                    {children}
                </ConditionalLayout>
            </body>
        </html>
    );
}
