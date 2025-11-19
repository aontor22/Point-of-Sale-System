import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    ShoppingCart,
    Trash2,
    UserPlus2,
    PauseCircle,
    CreditCard,
    WalletCards,
    ScanLine,
    X,
    Banknote,
} from "lucide-react";

export default function OrderSidebarShadcn(props) {
    const {
        orderId = "#0",
        productCount = 0,
        grandTotal = 0,
    } = props;

    const [paymentMethod, setPaymentMethod] = useState("cash");

    return (
        <aside className="w-[360px] h-[1173px] p-5 bg-white dark:bg-slate-800 rounded-md border border-Transparent-Secondry-Transparent flex flex-col gap-5">
            <Card className="w-full p-0 rounded-md bg-slate-100 dark:bg-slate-700 shadow-none border-none">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div>
                        <CardTitle className="text-slate-800 dark:text-slate-300 text-lg font-bold leading-5">
                            Order List
                        </CardTitle>
                        <CardDescription className="text-Grey-Grey-600 text-base font-medium">
                            Id : {orderId}
                        </CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-System-Color-Danger hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </CardHeader>
            </Card>

            <div className="flex-1 flex flex-col gap-5">
                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-Grey-Grey-900 text-lg font-bold">
                            Customer Information
                        </h3>

                        <div className="flex items-center gap-2">
                            <Select defaultValue="walk-in">
                                <SelectTrigger className="flex-1 h-9 rounded-sm border-slate-300 text-sm dark:text-slate-300">
                                    <SelectValue placeholder="Walk In Customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="walk-in">Walk In Customer</SelectItem>
                                    <SelectItem value="saved">Saved Customer</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button className="h-9 w-9 rounded-sm bg-orange-600 hover:bg-teal-600 text-white p-0">
                                <UserPlus2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <Select>
                            <SelectTrigger className="h-9 rounded-sm w-full border-slate-300 text-sm">
                                <SelectValue placeholder="Search Products" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="search">Search Products</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator className="bg-Transparent-Secondry-Transparent" />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-Grey-Grey-900 dark:text-slate-300 text-base font-bold">
                                    Product Added
                                </span>
                                <Badge className="bg-orange-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                                    {productCount}
                                </Badge>
                            </div>

                            <button
                                type="button"
                                className="flex items-center gap-1 text-red-600 cursor-pointer text-sm"
                            >
                                <X size={16} />Clear all
                            </button>
                        </div>
                        <div className="flex-1 min-h-[340px] bg-slate-100 dark:bg-slate-700 rounded-md flex flex-col items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
                            <ShoppingCart className="w-8 h-8" />
                            <p className="text-sm font-bold">No Products Selected</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-Brand-Secondry text-base">Order Tax</span>
                            <Select>
                                <SelectTrigger className="h-10 rounded-sm border-Transparent-Secondry-Transparent text-sm">
                                    <SelectValue placeholder="Choose" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="vat">VAT</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-Brand-Secondry text-base">Shipping</span>
                            <Select defaultValue="0">
                                <SelectTrigger className="h-10 rounded-sm border-Transparent-Secondry-Transparent text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-Brand-Secondry text-base">Discount</span>
                            <div className="flex items-center h-10 rounded-sm border dark:bg-slate-700 px-2.5 text-sm">
                                <Select defaultValue="%">
                                    <SelectTrigger className="h-10 border-none px-0 ">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="%">%</SelectItem>
                                        <SelectItem value="flat">$</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="ml-1 dark:text-slate-300">0</span>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-slate-200" />

                    <div className="flex flex-col gap-3">
                        <span className="text-Grey-Grey-900 text-base font-semibold">
                            Payment Method
                        </span>

                        <div className="grid grid-cols-3 gap-4">
                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "cash"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-Brand-White border-Transparent-Secondry-Transparent"
                                    }`}
                                onClick={() => setPaymentMethod("cash")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <div className="w-4 h-4 flex items-center justify-center mt-0.5">
                                        <WalletCards
                                            className={`w-4 h-4 ${paymentMethod === "cash"
                                                ? "text-Brand-Primary"
                                                : "text-Grey-Grey-600"
                                                }`}
                                        />
                                    </div>
                                    <span
                                        className={`text-base leading-4 ${paymentMethod === "cash"
                                            ? "text-Primary"
                                            : "text-Secondry"
                                            }`}
                                    >
                                        Cash
                                    </span>
                                </CardContent>
                            </Card>

                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "card"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-Brand-White border-Transparent-Secondry-Transparent"
                                    }`}
                                onClick={() => setPaymentMethod("card")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <CreditCard
                                        className={`w-4 h-4 mt-0.5 ${paymentMethod === "card"
                                            ? "text-Brand-Primary"
                                            : "text-Grey-Grey-600"
                                            }`}
                                    />
                                    <span
                                        className={`text-base leading-4 ${paymentMethod === "card"
                                            ? "text-Brand-Primary"
                                            : "text-Brand-Secondry"
                                            }`}
                                    >
                                        Debit Card
                                    </span>
                                </CardContent>
                            </Card>

                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "scan"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-Brand-White border-Transparent-Secondry-Transparent"
                                    }`}
                                onClick={() => setPaymentMethod("scan")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <ScanLine
                                        className={`w-4 h-4 mt-0.5 ${paymentMethod === "scan"
                                            ? "text-Brand-Primary"
                                            : "text-Grey-Grey-600"
                                            }`}
                                    />
                                    <span
                                        className={`text-base leading-4 ${paymentMethod === "scan"
                                            ? "text-Brand-Primary"
                                            : "text-Brand-Secondry"
                                            }`}
                                    >
                                        Scan
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <Button className="w-full h-12 rounded-md bg-blue-900 hover:bg-indigo-500/90 text-white text-sm font-bold">
                    Grand Total : ${grandTotal.toFixed(2)}
                </Button>

                <div className="grid grid-cols-3 gap-1.5">
                    <Button className="bg-cyan-700 hover:bg-cyan-700/90 text-white">
                        <PauseCircle className="w-4 h-4 mr-1" />
                        Hold
                    </Button>
                    <Button className="bg-red-400 hover:bg-red-400/90 text-white">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Void
                    </Button>
                    <Button className="bg-sky-800 hover:bg-sky-800/90 text-white">
                        <Banknote className="w-4 h-4 mr-1" />
                        Payment
                    </Button>
                </div>
            </div>
        </aside>
    );
}
