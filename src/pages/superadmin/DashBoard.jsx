import AdminHeader from '@/components/ui/AdminHeader'
import Footer from '@/components/ui/Footer'
import ProductsDate from '@/components/ui/ProductsDate'
import { RevenueOverviewCard } from '@/components/ui/superAdmin/Dashboard/RevenueOverviewCard'
import { SubscriptionPlansCard } from '@/components/ui/superAdmin/Dashboard/SubscriptionPlansCard'
import { GrowthMetricsCard } from '@/components/ui/superAdmin/Dashboard/GrowthMetricsCard'
import { RecentActivityCard } from '@/components/ui/superAdmin/Dashboard/RecentActivityCard'
import { SystemStatusCard } from '@/components/ui/superAdmin/Dashboard/SystemStatusCard'
import { TransactionTrendsCard } from '@/components/ui/superAdmin/Dashboard/TransactionTrendsCard'
import StatView from '@/components/view/superStatView'
import PacmanLoader from '@/components/ui/PacmanLoader'
import React, { useState, useEffect } from 'react'

const DashBoard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-6">
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    {/* <PacmanLoader loading={loading} pageName="Super Admin Dashboard" color="#2b62e3" /> */}
                </div>
            )}
            {!loading && (
                <>
                    <div className="w-full">
                        <ProductsDate />
                        <AdminHeader name="Super Admin" order="200+" />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-300">Super Admin Dashboard</h1>
                        <span className="text-slate-500">Monitor and control all system operations </span>
                    </div>

                    <div className="space-y-4">
                        <StatView />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                        <RevenueOverviewCard />
                        <SubscriptionPlansCard />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <TransactionTrendsCard />
                        <GrowthMetricsCard />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                        <RecentActivityCard />
                        <SystemStatusCard />
                    </div>

                    <Footer />
                </>
            )}
        </div>
    )
}

export default DashBoard
