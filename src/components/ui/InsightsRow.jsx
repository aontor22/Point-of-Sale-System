// components/dashboard/InsightsRow.jsx
import TopCategories from "./TopCategories";
import OrderStatistics from "./OrderStatistics";
import TopCustomers from "./TopCustomers";

export default function InsightsRow({ catsData, heatmapData, customers }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TopCategories />
            <OrderStatistics {...(heatmapData || {})} />
            <TopCustomers customers={customers || []} />
        </div>
    );
}
