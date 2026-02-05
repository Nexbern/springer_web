import type { Metadata } from 'next';
import AdminProviders from '@/components/admin/AdminProviders';

export const metadata: Metadata = {
    title: 'Admin Panel - Springer Public School',
    description: 'Admin panel for managing school website content',
};

export default function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminProviders>
            {children}
        </AdminProviders>
    );
}
