import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCcwDot, Search } from "lucide-react";

import ButtonComponent from "@/components/ui/ChangeButton";
import Pos2CatView, { POS_CATEGORIES } from "@/components/view/Pos2CatView";
import Pos2ProductView from "@/components/view/Pos2ProductView";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import Pos2Sidebar from "@/components/ui/pos/Pos2Sidebar";

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
    const name = "Udoy CHowdhury";
    const currentdate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const [expanded, setExpanded] = useState(true);

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between pb-4 items-center">
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-300">
                                Welcome, {name}
                            </h1>
                            <span className="text-slate-500">{currentdate}</span>
                        </div>
                        <div className="relative w-auto max-w-sm">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search products"
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <ButtonComponent
                            title="View All Categories"
                            isVisible={isInventoryReportVisible}
                            className="bg-orange-600 ml-2 text-white gap-2 hover:bg-orange-600"
                            icon=""
                        />
                    </div>

                    <div className="flex-1 border-gray-200 dark:border-slate-700">
                        <Pos2CatView
                            activeIndex={activeCategoryIndex}
                            onChangeActive={setActiveCategoryIndex}
                        />
                    </div>
                    <div className="flex-1">
                        <Pos2ProductView isSidebarCollapsed={!expanded} />
                    </div>
                </div>

                <div className="w-[340px] xl:w-[360px] shrink-0">
                    <Pos2Sidebar orderId="#0" />
                </div>
            </div>

            <Footer />
        </div>
    );
}
