import { useState } from "react";
import ProductInformationCard from "../ui/ProductsInformationCard";
import PricingStocksSection from "../ui/PricingStocksSection";
import ImagesSection from "../ui/ImagesSection";
import { Button } from "../ui/button";
import CustomFieldsSection from "../ui/CustomFieldSection";

export default function AddProduct() {

    const [pricing, setPricing] = useState({
        productType: "single",
        quantity: "",
        price: "",
        taxType: "",
        discountType: "",
        discountValue: "",
        quantityAlert: "",
    });

    const [images, setImages] = useState([]);

    const [customs, setCustoms] = useState({
        warrantyType: "",
        warrantyMonths: "",
        warrantyDetails: "",
        brand: "",
        origin: "",
        model: "",
        mfgDate: "",
        expDate: "",
        shelfLife: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...pricing,
            images,
            customFields: { ...customs },
        };
        console.log("SUBMIT", payload);
    };
    return (
        <div className="space-y-6">
            <ProductInformationCard
                onGenerateSku={() => console.log("Generate SKU")}
                onGenerateItemCode={() => console.log("Generate Item Code")}
                onAddCategory={() => console.log("Open Add Category modal")}
            />

            <form onSubmit={onSubmit} className="space-y-6">
                <PricingStocksSection values={pricing} onChange={setPricing} />
                <ImagesSection files={images} setFiles={setImages} />
                <CustomFieldsSection values={customs} onChange={setCustoms} />

                <div className="flex items-center justify-end gap-3">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Add Product</Button>
                </div>
            </form>

        </div>
    );
}
