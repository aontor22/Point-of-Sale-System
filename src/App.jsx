import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";
import Sidebar from "./components/view/SidebarView";
import Dashboard from "./pages/Dashboard";
import SaleDashboard from "./pages/SaleDashboard";
import Dashboard2 from "./pages/Dashboard-2";
import Product from "./pages/inventory/Product";
import CreateProduct from "./pages/inventory/CreateProduct";
import ExpiredProducts from "./pages/inventory/ExpiredProducts";
import LowStocks from "./pages/inventory/LowStocks";
import Category from "./pages/inventory/Category";
import SubCategory from "./pages/inventory/SubCategory";
import Brand from "./pages/inventory/Brand";
import Units from "./pages/inventory/Units";
import Warranties from "./pages/inventory/Warranties";
import PrintBarcode from "./pages/inventory/PrintBarcode";
import PrintQR from "./pages/inventory/PrintQR";
import BulkUpload from "./pages/inventory/BulkUpload";
import ManageStock from "./pages/stock/ManageStock";
import StockAdjustment from "./pages/stock/StockAdjustment";
import StockTransfer from "./pages/stock/StockTransfer";
import StockValuationReport from "./pages/stock/StockValuationReport";
import SaleReports from "./pages/reports/SaleReports";
import PurchaseReports from "./pages/reports/PurchaseReports";
import InventoryReports from "./pages/reports/InventoryReports";
import InvoiceReports from "./pages/reports/InvoiceReports";
import SupplierReports from "./pages/reports/SupplierReports";
import CustomerReports from "./pages/reports/CustomerReports";
import ProductReports from "./pages/reports/ProductReports";
import Customer from "./pages/people/Customer";
import Billers from "./pages/people/Billers";
import Suppliers from "./pages/people/Supplier";
import Stores from "./pages/people/Store";
import WareHouses from "./pages/people/WareHouse";
import Expense from "./pages/finance&accounts/Expense";
import Income from "./pages/finance&accounts/Income";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen bg-[#FBFBFB] dark:from-slate-900 dark:via-slate-800 transition-all duration-500">
      <div className="flex h-full overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex-1 flex flex-col min-h-0">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <main className="flex-1 overflow-y-auto no-scrollbar">
            <div className="p-6">
              <Routes>
                <Route path="/dashboard/admin" element={<Dashboard />} />
                <Route path="/dashboard/admin2" element={<Dashboard2 />} />
                <Route path="/dashboard/sales" element={<SaleDashboard />} />
                <Route path="/products" element={<Product />} />
                <Route path="/products/new" element={<CreateProduct />} />
                <Route path="/products/expired" element={<ExpiredProducts />} />
                <Route path="/products/low-stock" element={<LowStocks />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/sub-categories" element={<SubCategory />} />
                <Route path="/brands" element={<Brand />} />
                <Route path="/units" element={<Units />} />
                <Route path="/warranties" element={<Warranties />} />
                <Route path="/print/barcode" element={<PrintBarcode />} />
                <Route path="/print/qr" element={<PrintQR />} />
                <Route path="/bulk-upload" element={<BulkUpload />} />
                <Route path="/stock/manage" element={<ManageStock />} />
                <Route path="/stock/adjustment" element={<StockAdjustment />} />
                <Route path="/stock/transfer" element={<StockTransfer />} />
                <Route path="/reports/stock-valuation" element={<StockValuationReport />} />
                <Route path="/reports/sales-report" element={<SaleReports />} />
                <Route path="/reports/purchases-report" element={<PurchaseReports />} />
                <Route path="/reports/inventory-report" element={<InventoryReports />} />
                <Route path="/reports/invoice-report" element={<InvoiceReports />} />
                <Route path="/reports/supplier-report" element={<SupplierReports />} />
                <Route path="/reports/customer-report" element={<CustomerReports />} />
                <Route path="/reports/product-report" element={<ProductReports />} />
                <Route path="/peoples/customers" element={<Customer />} />
                <Route path="/peoples/billers" element={<Billers />} />
                <Route path="/peoples/suppliers" element={<Suppliers />} />
                <Route path="/peoples/stores" element={<Stores />} />
                <Route path="/peoples/warehouses" element={<WareHouses />} />
                <Route path="/finance/expenses" element={<Expense />} />
                <Route path="/finance/income" element={<Income />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
