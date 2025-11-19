import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCcwDot, Search } from "lucide-react";
import { GrPowerReset } from "react-icons/gr";
import { BsCart3 } from "react-icons/bs";

import ButtonComponent from "@/components/ui/ChangeButton";
import ProductsDate from "@/components/ui/ProductsDate";
import PosCatView, { POS_CATEGORIES } from "@/components/view/PosCatView";
import PosProductView from "@/components/view/PosProductView";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import PosSidebar from "@/components/ui/pos/PosSidebar";

export default function POS1() {
    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [search, setSearch] = useState("");

    const totalCategories = POS_CATEGORIES.length;

    const handlePrevCategory = () => {
        setActiveCategoryIndex((prev) =>
            prev === 0 ? totalCategories - 1 : prev - 1
        );
    };

    const handleNextCategory = () => {
        setActiveCategoryIndex((prev) =>
            prev === totalCategories - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="space-y-6">
            <ProductsDate />

            <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-4">
                    <div className="flex gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-md shadow-md border border-gray-200 dark:border-slate-700">
                        <ButtonComponent
                            title="View Orders"
                            isVisible={isInventoryReportVisible}
                            className="bg-teal-600 text-white gap-2 hover:bg-orange-600"
                            icon={<BsCart3 size={16} />}
                        />

                        <ButtonComponent
                            title="Reset"
                            isVisible={isInventoryReportVisible}
                            className="bg-indigo-600 text-white gap-2 hover:bg-orange-600"
                            icon={<GrPowerReset size={16} />}
                        />

                        <ButtonComponent
                            title="Transactions"
                            isVisible={isInventoryReportVisible}
                            className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                            icon={<RefreshCcwDot size={16} />}
                        />
                    </div>

                    <div className="flex-1 border-b border-gray-200 dark:border-slate-700 py-4">
                        <div className="flex justify-between pb-4 items-center">
                            <h1 className="text-xl pb-4 font-semibold text-slate-800 dark:text-slate-300">
                                Categories
                            </h1>
                            <div className="gap-2 flex">
                                <ButtonComponent
                                    title=""
                                    isVisible={isInventoryReportVisible}
                                    onClick={handlePrevCategory}
                                    className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white gap-2 border rounded-full hover:bg-slate-600"
                                    icon={<ChevronLeft size={16} />}
                                />

                                <ButtonComponent
                                    title=""
                                    isVisible={isInventoryReportVisible}
                                    onClick={handleNextCategory}
                                    className="bg-orange-500 text-white gap-2 border rounded-3xl hover:bg-slate-600"
                                    icon={<ChevronRight size={16} />}
                                />
                            </div>
                        </div>

                        <PosCatView
                            activeIndex={activeCategoryIndex}
                            onChangeActive={setActiveCategoryIndex}
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between pb-4 items-center">
                            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-300">
                                Products
                            </h1>
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-8"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <PosProductView
                            activeIndex={activeCategoryIndex}
                            onChangeActive={setActiveCategoryIndex}
                        />
                    </div>
                </div>

                <div className="w-[340px] xl:w-[360px] shrink-0">
                    <PosSidebar orderId="#0" productCount={0} grandTotal={0} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
