import AdminHeader from "@/components/ui/AdminHeader";
import WelcomeBanner from "../components/ui/WelcomeBanner"
import { useState } from "react";
import Footer from "@/components/ui/Footer";
import StatsRow from "@/components/ui/StatsRow";
import RecentTransactionsPanel from "@/components/ui/RecentTransactionsPanel";
import RecentlyRegisteredPanel from "@/components/ui/RecentlyRegisteredPanel";
import RecentPlanExpiredPanel from "@/components/ui/RecentPlanExpiredPanel";

export default function Dashboard2() {
    const [tab, setTab] = useState("companies");
    return (
        <div className='space-y-6'>
            <AdminHeader />
            <WelcomeBanner
                name="Udoy"
                newCompanies={14}
                active={tab}
                onChange={setTab}
            />
            <div className="space-y-4">
                <StatsRow />
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <RecentTransactionsPanel />
                <RecentlyRegisteredPanel />
                <RecentPlanExpiredPanel />
            </div>

            <Footer />
        </div>
    );
}