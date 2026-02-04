'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-springer-red mx-auto mb-4" />
                    <p className="text-springer-gray">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
