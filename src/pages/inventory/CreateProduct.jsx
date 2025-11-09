import Footer from '@/components/ui/Footer'
import ProductsDate from '@/components/ui/ProductsDate'
import AddProductView from '@/components/view/AddProductView'
import React from 'react'

const CreateProduct = () => {
    return (
        <div className="space-y-4">
            <ProductsDate />
            <AddProductView />
            <Footer />
        </div>
    )
}

export default CreateProduct
