'use client';

import { useEffect, useState } from 'react';
import { Bell, Megaphone, Users, TrendingUp } from 'lucide-react';

interface Stats {
    notices: number;
    banners: number;
    faculties: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats>({
        notices: 0,
        banners: 0,
        faculties: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [noticesRes, bannersRes, facultiesRes] = await Promise.all([
                fetch('/api/notices'),
                fetch('/api/admin/banners'),
                fetch('/api/faculties'),
            ]);

            const [noticesData, bannersData, facultiesData] = await Promise.all([
                noticesRes.json(),
                bannersRes.json(),
                facultiesRes.json(),
            ]);

            setStats({
                notices: noticesData.notices?.length || 0,
                banners: bannersData.banners?.length || 0,
                faculties: facultiesData.faculties?.length || 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Total Notices',
            value: stats.notices,
            icon: Bell,
            color: 'bg-blue-500',
            href: '/admin/notices',
        },
        {
            name: 'Active Banners',
            value: stats.banners,
            icon: Megaphone,
            color: 'bg-green-500',
            href: '/admin/banners',
        },
        {
            name: 'Faculty Members',
            value: stats.faculties,
            icon: Users,
            color: 'bg-purple-500',
            href: '/admin/faculties',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="lg:text-2xl text-xl font-semibold text-springer-charcoal mb-2">
                    Welcome to Admin Dashboard
                </h1>
                <p className="text-springer-gray lg:text-base text-sm">
                    Manage your school website content from here
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat) => (
                    <a
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-springer-gray mb-1">
                                    {stat.name}
                                </p>
                                <p className="lg:text-3xl text-xl font-semibold text-springer-charcoal">
                                    {loading ? '...' : stat.value}
                                </p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="lg:text-lg text-base font-semibold text-springer-charcoal mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/notices"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-springer-red hover:bg-red-50 transition-colors"
                    >
                        <Bell className="w-5 h-5 text-springer-red" />
                        <div>
                            <p className="font-medium text-springer-charcoal lg:text-base text-sm">Create Notice</p>
                            <p className="text-sm text-springer-gray lg:text-base text-sm">Add a new notice</p>
                        </div>
                    </a>
                    <a
                        href="/admin/banners"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-springer-green hover:bg-green-50 transition-colors"
                    >
                        <Megaphone className="w-5 h-5 text-springer-green" />
                        <div>
                            <p className="font-medium text-springer-charcoal lg:text-base text-sm">Create Banner</p>
                            <p className="text-sm text-springer-gray lg:text-base text-sm">Add admission banner</p>
                        </div>
                    </a>
                    <a
                        href="/admin/faculties"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors"
                    >
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                            <p className="font-medium text-springer-charcoal lg:text-base text-sm">Add Faculty</p>
                            <p className="text-sm text-springer-gray lg:text-base text-sm">Add faculty member</p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-gradient-to-r from-springer-red/10 to-springer-green/10 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-white rounded-lg">
                        <TrendingUp className="w-5 h-5 text-springer-red" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-springer-charcoal mb-2 lg:text-base text-sm">
                            Getting Started
                        </h3>
                        <p className="text-springer-gray mb-4 lg:text-base text-sm">
                            Use the sidebar navigation to manage different sections of your website.
                            All changes will be reflected on the live website immediately.
                        </p>
                        <ul className="text-springer-gray space-y-1 lg:text-base text-sm">
                            <li>• <strong>Notices:</strong> Manage school announcements and updates</li>
                            <li>• <strong>Banners:</strong> Control admission open/closed popups</li>
                            <li>• <strong>Faculties:</strong> Add and manage faculty member profiles</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
