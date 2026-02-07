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
        default: `${schoolInfo.name} - CISCE Affiliated School in Gorakhpur`,
        template: `%s | ${schoolInfo.name}`,
    },
    description: `${schoolInfo.name} is affiliated to the Council for the Indian School Certificate Examinations (10+2), New Delhi. We offer quality education with modern facilities, expert faculty, and holistic development programs. admissions open for 2025-26.`,
    keywords: [
        'ICSE school',
        'CISCE affiliated',
        'ISC school',
        'Gorakhpur schools',
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
        title: `${schoolInfo.name} - CISCE Affiliated School in Gorakhpur`,
        description: `${schoolInfo.name} is affiliated to the Council for the Indian School Certificate Examinations (10+2), New Delhi. We offer quality education with modern facilities and holistic development programs.`,
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
        title: `${schoolInfo.name} - CISCE Affiliated School`,
        description: 'Quality education affiliated to the Council for the Indian School Certificate Examinations (10+2), New Delhi.',
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
    icons: {
        icon: [
            { url: '/favicon/favicon.ico', sizes: 'any' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { rel: 'android-chrome-192x192', url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { rel: 'android-chrome-512x512', url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    },
    manifest: '/favicon/site.webmanifest',
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
