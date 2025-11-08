import { 
    Package, Settings, LayoutDashboard,
    UserPen,
    Box,
    Boxes,
    Info,
    ClockFading,
    MoveDownRight,
    LayoutList,
    LayoutGrid,
    GalleryVertical,
    Shapes,
    Group,
    Ribbon,
    ScanBarcode,
    ScanQrCode,
    FileBadge,
    Layers,
    TrendingUp,
    ChartNoAxesCombined,
    MessageSquareShare,
    RefreshCcwDot,
    SquareCheckBig,
    ShoppingCart,
    FileSignal,
    FileOutput,
    Files,
    TvMinimal,
    BarChart,
    ChartNoAxesColumnIncreasing,
    ChartPie,
    FolderGit2,
    UserCog,
    ClipboardClock,
    ClipboardList,
    FileChartPie,
    FileSearchCorner,
    ChartNetwork,
    BadgeDollarSign,
    ChartSpline,
    Users,
    UserStar,
    UserLock,
    Archive,
    Handbag,
    FileUp,
    FileQuestion,
    FileX,
    FileStack,
    FilePen,
    Puzzle,
    WalletCards,
    Landmark,
    Receipt,
    BadgeCent,
    SearchCheck,
    FileMinusCorner,
    User,
    CircuitBoard,
    GitFork,
    Calendar,
    Calendar1,
    CalendarCheck2,
    DollarSign,
    Shuffle,
    ShieldUser,
    Trash2,
    Shredder,
    GitCompare,
    Globe,
    Bolt,
    Cog,
    Smartphone,
    Monitor,
    Store
} from 'lucide-react';

export const sidebarData = [
    {
        title: "Main",
        items: [
            {
                name: "Dashboard", icon: LayoutGrid, path: "/dashboard", active: true , subItems: [
                    { name: "Admin Dashboard", path: "/dashboard/admin" },
                    { name: "Admin Dashboard 2", path: "/dashboard/admin2" },
                    { name: "Sales Dashboard", path: "/dashboard/sales" }
                ]
            },
            {
                name: "Super Admin", icon: UserCog, path: "/super-admin", subItems: [
                    { name: "Dashboard", path: "/super-admin/dashboard" },
                    { name: "Companies", path: "/super-admin/companies" },
                    { name: "Subscriptions", path: "/super-admin/subscriptions"},
                    { name: "Packages", path: "/super-admin/packages" },
                    { name: "Domain", path: "/super-admin/domain" },
                    { name: "Purchase Transaction", path: "/super-admin/transactions" },
                    { name: "System Overview", path: "/super-admin/overview" },
                    { name: "Activity Log", path: "/super-admin/activity-log" }
                ]
            }
        ]
    },
    {
        title: "Inventory",
        items: [
            { name: "Products", icon: Package, path: "/products" },
            { name: "Create Product", icon: FileUp, path: "/products/new" },
            { name: "Expired Products", icon: ClockFading, path: "/products/expired"},
            { name: "Low Stocks", icon: BarChart, path: "/products/low-stock" },
            { name: "Category", icon: LayoutList, path: "/categories" },
            { name: "Sub Category", icon: LayoutList, path: "/sub-categories" },
            { name: "Brands", icon: Ribbon, path: "/brands" },
            { name: "Units", icon: Package, path: "/units" },
            { name: "Warranties", icon: ShieldUser, path: "/warranties" },
            { name: "Print Barcode", icon: ScanBarcode, path: "/print/barcode" },
            { name: "Print QR Code", icon: ScanQrCode, path: "/print/qr" },
            { name: "Bulk Upload", icon: FileOutput, path: "/bulk-upload" }
        ]
    },
    {
        title: "Stock",
        items: [
            { name: "Manage Stock", icon: Settings, path: "/stock/manage" },
            { name: "Stock Adjustment", icon: Settings, path: "/stock/adjustment" },
            { name: "Stock Transfer", icon: Shuffle, path: "/stock/transfer" },
            { name: "Stock Alert Settings", icon: FileSignal, path: "/stock/alerts" },
            { name: "Stock Valuation Report", icon: FileChartPie, path: "/reports/stock-valuation" }
        ]
    }, {
        title: "Sales",
        items: [
            {
                name: "Sales", icon: ChartNoAxesCombined, path: "/sales/sales", subItems: [
                    {
                        name: "Online Orders", path: "sales/sales/online-orders",
                        name: "POS Orders", path: "sales/sales/pos-orders"
                    }
                ]
            },
            { name: "Invoice", icon: Receipt, path: "/sales/invoice" },
            { name: "Sales Return", icon: FileMinusCorner, path: "/sales/sales-return" },
            { name: "Quotation", icon: FileQuestion, path: "/sales/quotation" },
            {
                name: "POS", icon: ShoppingCart, path: "/sales/pos", subItems: [
                    {
                        name: "Split/Hold Bill", path: "sales/pos/split-hold-bill",
                        name: "Return/Exchange", path: "sales/pos/pos-orders",
                        name: "Multi payment Support", path: "sales/pos/multi-payment-support",
                        name: "POS 4", path: "sales/pos/pos-4",
                        name: "POS 5", path: "sales/pos/pos-5",
                    }
                ]
            }
        ]
    },
    {
        title: "Reports",
        items: [
            { name: "Sales Report", icon: ChartNoAxesColumnIncreasing, path: "/reports/sales-report" },
            { name: "Purchase Report", icon: BarChart, path: "/reports/purchases-report" },
            { name: "Inventory Report", icon: Layers, path: "/reports/inventory-report" },
            { name: "Invoice Report", icon: Receipt, path: "/reports/invoice-report" },
            { name: "Supplier Report", icon: FileStack, path: "/reports/supplier-report" },
            { name: "Customer Report", icon: Users, path: "/reports/customer-report" },
            { name: "Product Report", icon: Package, path: "/reports/product-report" },
            { name: "Expense Report", icon: BadgeCent, path: "/reports/expense-report" },
            { name: "Income Report", icon: BadgeDollarSign, path: "/reports/income-report" },
            { name: "Tax Report", icon: Landmark, path: "/reports/tax-report" },
            { name: "Profit & Loss", icon: ChartSpline, path: "/reports/profit-&-loss" },
            { name: "Annual Report", icon: FileChartPie, path: "/reports/annual-report" },
        ]
    },
    {
        title: "Peoples",
        items: [
            { name: "Customers", icon: Users, path: "/peoples/customers" },
            { name: "Billers", icon: User, path: "/peoples/billers" },
            { name: "Suppliers", icon: Handbag, path: "/peoples/suppliers" },
            { name: "Stores", icon: Store, path: "/peoples/stores" },
            { name: "Warehouses", icon: Boxes, path: "/peoples/warehouses" },
        ]
    },
    {
        title: "Purchases",
        items: [
            { name: "Purchases", icon: ShoppingCart, path: "/purchases/purchases" },
            { name: "Purchases Order", icon: Receipt, path: "/purchases/purchases-order" },
            { name: "Purchases Return", icon: MoveDownRight, path: "/purchases/purchases-return" },
        ]
    },
    {
        title: "Promo",
        items: [
            { name: "Coupons", icon: WalletCards, path: "/purchases/purchases" },
            { name: "Purchases Order", icon: Receipt, path: "/purchases/purchases-order" },
            { name: "Purchases Return", icon: MoveDownRight, path: "/purchases/purchases-return" },
        ]
    },
    {
        title: "Settings",
        items: [
            { name: "General Settings", icon: Settings, path: "/settings/general", subItems: ["...", "..."] },
            { name: "Logout", icon: UserLock, path: "/logout", isLogout: true }
        ]
    }
];
