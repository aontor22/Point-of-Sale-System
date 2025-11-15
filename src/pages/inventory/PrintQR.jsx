import React from "react";

import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import PrintBarcodeQRView from "@/components/view/PrintBarcodeQRView"

export default function Units() {

    return (
        <div className="space-y-4">
            <ProductsDate />
            <ProductHeader
                title="Print QR Code"
                breadcrumbs={[
                    { label: "Dashboard" },
                    { label: "Print QR Code", active: true },
                ]}
            />
            <PrintBarcodeQRView />
            
            <Footer />
        </div>
    );
}
