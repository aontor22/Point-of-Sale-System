import React, { useState } from "react";
import { Info } from "lucide-react";
import OverallInfo from "../ui/OverallInfo";
import CustomersOverview from "../ui/CustomersOverview";


export default function OverallInformation() {

    return (
        <section className="rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                    <Info size={14} className="text-slate-600" />
                </span>
                <h3 className="text-slate-800 font-semibold">Overall Information</h3>
            </div>

            <div className="border-b ">
                <div className=" mx-auto">
                    <OverallInfo suppliers={6987} customers={4896} orders={487} />
                </div>
            </div>


            <div className="">
                <CustomersOverview />
            </div>

        </section>
    );
}
