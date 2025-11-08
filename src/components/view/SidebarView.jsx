
import Sidebar, { SidebarItem } from '../ui/sidebar'
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

const sidebarview = () => {
  return (
    <main className="App">
      <Sidebar>
        <SidebarItem icon={<LayoutGrid size={20} />} text="Dashboard" active alert />
        <SidebarItem icon={<UserPen size={20} />} text="Super Admin" alert />
        <hr className="my-3" />
        <SidebarItem icon={<Box size={20} />} text="Products" />
        <SidebarItem icon={<Boxes size={20} />} text="Create Product" />
        <SidebarItem icon={<ClockFading size={20} />} text="Expired Products" />
        <SidebarItem icon={<MoveDownRight size={20} />} text="Low Stocks" />
        <SidebarItem icon={<LayoutList size={20} />} text="Category" />
        <SidebarItem icon={<GalleryVertical size={20} />} text="Sub Category" />
        <SidebarItem icon={<Shapes size={20} />} text="Brands" />
        <SidebarItem icon={<Group size={20} />} text="Units" />
        <SidebarItem icon={<Ribbon size={20} />} text="Warranties" />
        <SidebarItem icon={<ScanBarcode size={20} />} text="Print Barcode" />
        <SidebarItem icon={<ScanQrCode size={20} />} text="Print QR Code" />
        <SidebarItem icon={<FileBadge size={20} />} text="Bulk Upload" />
        <hr className="my-3" />
        <SidebarItem icon={<Layers size={20} />} text="Manage Stock" />
        <SidebarItem icon={<ChartNoAxesCombined size={20} />} text="Stock Adjustment" />
        <SidebarItem icon={<RefreshCcwDot size={20} />} text="Stock Transfer" />
        <SidebarItem icon={<MessageSquareShare size={20} />} text="Stock Alert Settings" />
        <SidebarItem icon={<SquareCheckBig size={20} />} text="Stock Valuation Report" />
        <hr className="my-3" />
        <SidebarItem icon={<ShoppingCart size={20} />} text="Sales" alert/>
        <SidebarItem icon={<FileSignal size={20} />} text="Invoice" />
        <SidebarItem icon={<FileOutput size={20} />} text="Sales Return" />
        <SidebarItem icon={<Files size={20} />} text="Quotation" />
        <SidebarItem icon={<TvMinimal size={20} />} text="POS" alert/>
        <hr className="my-3" />
        <SidebarItem icon={<ChartNoAxesColumnIncreasing size={20} />} text="Sales Report" />
        <SidebarItem icon={<ChartPie size={20} />} text="Purchase Report" />
        <SidebarItem icon={<FolderGit2 size={20} />} text="Inventory Report" />
        <SidebarItem icon={<FileSignal size={20} />} text="Invoice Report" />
        <SidebarItem icon={<UserCog size={20} />} text="Supplier Report" />
        <SidebarItem icon={<ClipboardClock size={20} />} text="Customer Report" />
        <SidebarItem icon={<ClipboardList size={20} />} text="Product Report" />
        <SidebarItem icon={<FileChartPie size={20} />} text="Expense Report" />
        <SidebarItem icon={<ChartSpline size={20} />} text="Income Report" />
        <SidebarItem icon={<ChartNetwork size={20} />} text="Tax Report" />
        <SidebarItem icon={<BadgeDollarSign size={20} />} text="Profit & Loss" />
        <SidebarItem icon={<FileSearchCorner size={20} />} text="Annual Report" />
        <hr className="my-3" />
        <SidebarItem icon={<Users size={20} />} text="Customers" />
        <SidebarItem icon={<UserStar size={20} />} text="Billers" />
        <SidebarItem icon={<UserLock size={20} />} text="Suppliers" />
        <SidebarItem icon={<Store size={20} />} text="Stores" />
        <SidebarItem icon={<Archive size={20} />} text="Warehouses" />
        <hr className="my-3" />
        <SidebarItem icon={<Handbag size={20} />} text="Purchases" />
        <SidebarItem icon={<FileQuestion size={20} />} text="Purchases Order" />
        <SidebarItem icon={<FileUp size={20} />} text="Purchases Return" />
        <hr className="my-3" />
        <SidebarItem icon={<Puzzle size={20} />} text="Coupons" />
        <SidebarItem icon={<WalletCards size={20} />} text="Gift Card" />
        <SidebarItem icon={<FileX size={20} />} text="Discount" alert />
        <hr className="my-3" />
        <SidebarItem icon={<Shredder size={20} />} text="Income" alert/>
        <SidebarItem icon={<Landmark size={20} />} text="Bank Accounts" />
        <SidebarItem icon={<BadgeCent size={20} />} text="Money Transfer" />
        <SidebarItem icon={<Receipt size={20} />} text="Balance Sheet" />
        <SidebarItem icon={<Info size={20} />} text="Trial Balance" />
        <SidebarItem icon={<SearchCheck size={20} />} text="Cash Flow" />
        <SidebarItem icon={<FileMinusCorner size={20} />} text="Account Statement" />
        <hr className="my-3" />
        <SidebarItem icon={<User size={20} />} text="Employees" />
        <SidebarItem icon={<CircuitBoard size={20} />} text="Departments" />
        <SidebarItem icon={<GitFork size={20} />} text="Designation" />
        <SidebarItem icon={<Shuffle size={20} />} text="Shifts" />
        <SidebarItem icon={<UserCog size={20} />} text="Attendance" />
        <SidebarItem icon={<Calendar1 size={20} />} text="Leaves" />
        <SidebarItem icon={<CalendarCheck2 size={20} />} text="Holidays" />
        <SidebarItem icon={<DollarSign size={20} />} text="Payroll" alert/>
        <hr className="my-3" />
        <SidebarItem icon={<ShieldUser size={20} />} text="Users" />
        <SidebarItem icon={<GitCompare size={20} />} text="Role & Permissions" />
        <SidebarItem icon={<Trash2 size={20} />} text="Delete Account Request" />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="General Settings" alert/>
        <SidebarItem icon={<Globe size={20} />} text="Website Settings" alert/>
        <SidebarItem icon={<Smartphone size={20} />} text="App Settings" alert/>
        <SidebarItem icon={<Monitor size={20} />} text="System Settings" alert/>
        <SidebarItem icon={<Cog size={20} />} text="Financial Settings" alert/>
        <SidebarItem icon={<Bolt size={20} />} text="Other Settings" alert/>
        <SidebarItem icon={<Boxes size={20} />} text="Logout" />
      </Sidebar>
    </main>
  )
}

export default sidebarview;
