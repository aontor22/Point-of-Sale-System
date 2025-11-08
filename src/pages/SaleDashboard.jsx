import BestSellerCard from '@/components/ui/BestSellers'
import Footer from '@/components/ui/Footer'
import RecentTransactionsCard from '@/components/ui/RecentTransactionsCard'
import SalesAnalyticsCard from '@/components/ui/SalesAnalyticsCard'
import SalesByCountriesCard from '@/components/ui/SalesByCountriesCard'

import React from 'react'

const SaleDashboard = () => {
    return (
        <div className='space-y-6'>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                    <BestSellerCard />
                </div>
                <div className="lg:col-span-2">
                    <RecentTransactionsCard />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SalesAnalyticsCard />
                <SalesByCountriesCard />
            </div>
            <Footer />
        </div>
    )
}

export default SaleDashboard
