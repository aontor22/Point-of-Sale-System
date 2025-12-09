import Footer from '@/components/ui/Footer'
import ProductsDate from '@/components/ui/ProductsDate'
import AddProductView from '@/components/view/AddProductView'
import React, { useState } from 'react'

const CreateProduct = () => {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="space-y-4">
            <ProductsDate
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => setDateRange(dates)}
            />

            <AddProductView />
            <Footer />
        </div>
    )
}

export default CreateProduct
