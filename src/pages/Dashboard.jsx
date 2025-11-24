import AdminHeader from "@/components/ui/AdminHeader";
import AlertBar from "@/components/ui/AlertBar";
import OverallInformation from "@/components/view/OverallInformationView";
import StatsGrid from "@/components/ui/StatsGrid";
import SalesPurchaseCard from "@/components/ui/SalesPurchaseCard";
import React from "react";
import ProductsView from "@/components/view/ProductsView";
import Footer from "@/components/ui/Footer";
import ls1 from '../assets/products/lowstock2.svg'
import ls2 from '../assets/products/lowstock3.svg'
import ls3 from '../assets/products/lowstock4.svg'
import ls4 from '../assets/products/lowstock5.svg'
import ls5 from '../assets/products/lowstock1.svg'

import rs1 from '../assets/products/rs1.svg'
import rs2 from '../assets/products/rs2.svg'
import rs3 from '../assets/products/rs3.svg'
import rs4 from '../assets/products/rs4.svg'
import rs5 from '../assets/products/rs5.svg'


import ts1 from '../assets/products/ts1.svg'
import ts2 from '../assets/products/ts2.svg'
import ts3 from '../assets/products/ts3.svg'
import ts4 from '../assets/products/ts4.svg'
import ts5 from '../assets/products/ts5.svg'
import CategoryView from "@/components/view/CategoryView";
import SalesStaticsCard from "@/components/ui/SalesStaticsCard";
import RecentTransactionsCard from "@/components/ui/RecentTransactionsCard";

const lowStock = [
  { id: "#904004", name: "Vacuum Cleaner Robot", thumb: ls1, qty: 21 },
  { id: "#892013", name: "Dell XPS 13", thumb: ls2, qty: 8 },
  { id: "#325569", name: "KitchenAid Stand Mixer", thumb: ls3, qty: 14 },
  { id: "#124588", name: "Levi's Trucker Jacket", thumb: ls4, qty: 12 },
  { id: "#365586", name: "Lay's Classic", thumb: ls5, qty: 10 },
];

const recentSales = [
  { name: "Apple Watch Series 9", cat: "Electronics", price: 640, date: "Today", status: "Processing", thumb: rs1 },
  { name: "Apple Watch Series 9", cat: "Electronics", price: 640, date: "Today", status: "Canceled", thumb: rs2 },
  { name: "Apple Watch Series 9", cat: "Electronics", price: 640, date: "Today", status: "Onhold", thumb: rs3 },
  { name: "Apple Watch Series 9", cat: "Electronics", price: 640, date: "Today", status: "Processing", thumb: rs4 },
  { name: "Apple Watch Series 9", cat: "Electronics", price: 640, date: "Today", status: "Completed", thumb: rs5 },
];

const topSelling = [
  { name: "Charger Cable - Lightning", price: 587, change: "25%", thumb: ts1 },
  { name: "Charger Cable - Lightning", price: 587, change: "25%", thumb: ts2 },
  { name: "Charger Cable - Lightning", price: 587, change: "25%", thumb: ts3 },
  { name: "Charger Cable - Lightning", price: 587, change: "21%", thumb: ts4 },
  { name: "Charger Cable - Lightning", price: 587, change: "25%", thumb: ts5 },
];


const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="w-full">
        <AdminHeader name="Admin" order="200+" />
        <AlertBar
          product="Apple iPhone 17"
          stockNote="is running Low, already below 5 Pcs."
          onAddStock={() => console.log("Add Stock clicked")}
          onClose={() => console.log("Closed")}
        />
      </div>
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <OverallInformation />
        </div>
        <div className="lg:col-span-2">
          <SalesPurchaseCard />
        </div>
      </div>

      <div className="space-y-6">
        <ProductsView lowStock={lowStock} recentSales={recentSales} topSelling={topSelling} />
      </div>

      <div className="space-y-6">
        <CategoryView />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesStaticsCard />
        <RecentTransactionsCard />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
