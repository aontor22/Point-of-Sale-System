import AdminHeader from '@/components/ui/AdminHeader'
import Footer from '@/components/ui/Footer'
import ProductsDate from '@/components/ui/ProductsDate'
import StatView from '@/components/view/companyStatView'
import React from 'react'

const DashBoard = () => {
    return (
        <div className="space-y-6">
            <div className="w-full">
                <ProductsDate />
            </div>

            <div className="flex-1">
                <h1 className="text-xl font-semibold text-slate-800">Companies Management</h1>
                <span className="text-slate-500">Monitor and control all registered companies </span>
            </div>

            <div className="space-y-4">
                <StatView />
            </div>
            <Footer />
        </div>
    )
}

export default DashBoard
