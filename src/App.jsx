import { useState } from "react";
import Header from "./components/ui/header";
import Sidebar from "./components/view/SidebarView";
import Dashboard from "./pages/Dashboard";
import Sidebars from "./components/ui/Sidebars";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:from-slate-900 dark:via-slate-800 transition-all duration-500">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <div className="flex-1 flex flex-col min-h-0">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <main className="flex-1 overflow-y-auto no-scrollbar">
            <div className="p-6">
              {currentPage === "dashboard" && <Dashboard />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
