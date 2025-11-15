import React from "react";

import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import { ProductBulkUpload } from "@/components/ui/ProductBulkUpload";

export default function Units() {

    return (
        <div className="space-y-4">
            <ProductsDate />
            <ProductHeader
                title="Bulk Upload"
                breadcrumbs={[
                    { label: "Dashboard" },
                    { label: "Bulk Upload (Excel / CSV)", active: true },
                ]}
            />

            <ProductBulkUpload/>
            
            <Footer />
        </div>
    );
}
