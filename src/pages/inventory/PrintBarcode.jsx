import React, { useState } from "react";

import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import PrintBarcodeQRView from "@/components/view/PrintBarcodeQRView"

export default function Units() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="space-y-4">
            <ProductsDate
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => setDateRange(dates)}
            />

            <ProductHeader
                title="Print BarCode"
                breadcrumbs={[
                    { label: "Dashboard" },
                    { label: "Print BarCode", active: true },
                ]}
            />
            <PrintBarcodeQRView />

            <Footer />
        </div>
    );
}
