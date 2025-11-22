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
    Trash2,
    PauseCircle,
    Banknote,
    Calendar,
    UserPlus2,
    Minus,
    Plus,
} from "lucide-react";
import Cart from "@/assets/icons/cart.png";
import cash from "@/assets/icons/cash.png";
import points from "@/assets/icons/points.png";
import card from "@/assets/icons/card.png";
import deposit from "@/assets/icons/deposit.png";
import cheque from "@/assets/icons/cheque.png";
import { useCart } from "@/context/CartContext1";
import { Input } from "@/components/ui/input";

export default function OrderSidebarShadcn(props) {
    const { orderId = "#0" } = props;

    const [paymentMethod, setPaymentMethod] = useState("cash");

    const { items, incrementQty, decrementQty, removeItem } = useCart();
    const cartArray = Object.values(items);

    const productCount = cartArray.length;
    const subTotal = cartArray.reduce(
        (sum, p) => sum + (Number(p.price) || 0) * (p.qty ?? 1),
        0
    );
    const total = subTotal;
    const grandTotal = total;

    return (
        <aside className="w-[460px] h-auto p-5 bg-white dark:bg-slate-800 rounded-md border border-Transparent-Secondry-Transparent flex flex-col gap-5">

            <Card className="w-full p-0 rounded-md bg-slate-100 dark:bg-slate-700 shadow-none border-none">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div>
                        <CardTitle className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-5">
                            Order List
                        </CardTitle>
                        <CardDescription className="text-slate-700 dark:text-slate-400 text-sm">
                            Transaction id : {orderId}
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

            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <div className="flex flex-col gap-1">
                    <div className="relative">
                        <Input
                            defaultValue="15/08/2025"
                            className="h-9 rounded-sm border-Transparent-Secondry-Transparent bg-Brand-White pr-9 text-sm text-Grey-Grey-900"
                        />
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-Grey-Grey-900" />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Type Ref Number"
                        className="h-9 rounded-sm border-Transparent-Secondry-Transparent bg-Brand-White text-sm text-Grey-Grey-300"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <Select>
                        <SelectTrigger className="h-9 w-25 text-[12px] rounded-sm border-Transparent-Secondry-Transparent bg-Brand-White text-sm text-Grey-Grey-900">
                            <SelectValue placeholder="Select Shop" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shop-1">Shop 1</SelectItem>
                            <SelectItem value="shop-2">Shop 2</SelectItem>
                            <SelectItem value="shop-3">Shop 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <Select defaultValue="walk-in">
                            <SelectTrigger className="flex-1 h-9 rounded-sm border-Transparent-Secondry-Transparent text-sm dark:text-slate-300">
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

                    <div className="flex items-center justify-between gap-2">
                        <Select defaultValue="USD">
                            <SelectTrigger className="flex-1 h-9 rounded-sm border-Transparent-Secondry-Transparent text-sm dark:text-slate-300">
                                <SelectValue placeholder="USD" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="BDT">BDT</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex flex-col gap-1">
                            <Input
                                placeholder="Currency Exchange Rate"
                                className="h-9 rounded-sm border-Transparent-Secondry-Transparent bg-Brand-White text-sm text-Grey-Grey-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-Grey-Grey-900 dark:text-slate-300 text-base font-bold">
                                    Order Details
                                </span>
                            </div>
                            <span className="bg-slate-200 text-slate-800 p-1.5 rounded-sm">
                                items :
                                <Badge className="bg-orange-500 ml-2 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                                    {productCount}
                                </Badge>
                            </span>
                        </div>

                        <div className="flex-1 min-h-[340px] bg-slate-100 dark:bg-slate-700 rounded-md flex flex-col gap-2 text-slate-600 dark:text-slate-300 p-3 overflow-y-auto">
                            {productCount === 0 ? (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <img src={Cart} alt="total items" className="w-70 h-50" />
                                    <p className="text-sm font-bold">No Products Selected</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-[2.5fr_1fr_0.9fr_1.1fr_1.1fr_24px] items-center text-[11px] font-semibold text-slate-500 mb-1 px-2 gap-2">
                                        <span className="text-left dark:text-slate-300/50">Product</span>
                                        <span className="text-left -ml-3 dark:text-slate-300/50">Batch No</span>
                                        <span className="text-center -ml-10 dark:text-slate-300/50">Price</span>
                                        <span className="text-center mr-3 dark:text-slate-300/50">QTY</span>
                                        <span className="text-right dark:text-slate-300/50">Sub total</span>
                                        <span></span>
                                    </div>

                                    {cartArray.map((item) => (
                                        <div
                                            key={item.key}
                                            className="grid grid-cols-[2.5fr_1fr_0.9fr_1.1fr_1.1fr_24px] items-center bg-white/90 dark:bg-slate-800 rounded-md px-2 py-2 text-xs gap-2"
                                        >
                                            <div className="flex flex-col min-w-0">
                                                <span
                                                    className="font-semibold text-slate-800 dark:text-slate-100 whitespace-normal break-words leading-tight text-[12px]">
                                                    {item.name}
                                                </span>
                                                <span className="text-[11px] text-slate-500">
                                                    In Stock: {item.stock ?? item.quantityLabel ?? "--"}
                                                </span>
                                            </div>

                                            <Input
                                                className="h-7 w-full rounded border border-slate-200 bg-white px-2 text-[11px] outline-none focus:ring-1 focus:ring-slate-300"
                                                placeholder=""
                                            />

                                            <span className="text-center text-slate-700 dark:text-slate-100 font-semibold">
                                                ${Number(item.price).toFixed(2)}
                                            </span>

                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    type="button"
                                                    className="h-6 w-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                                                    onClick={() => decrementQty(item.key)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-4 text-center text-slate-800 dark:text-slate-100">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="h-6 w-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                                                    onClick={() => incrementQty(item.key)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <span className="text-right text-slate-700 dark:text-slate-100 font-semibold">
                                                ${(Number(item.price) * (item.qty ?? 1)).toFixed(2)}
                                            </span>

                                            <button
                                                type="button"
                                                className="h-6 w-6 flex items-center justify-center text-slate-400 hover:text-red-500"
                                                onClick={() => removeItem(item.key)}
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-5">
                    <div className="flex-1">
                        <div className="flex justify-between w-full bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded-t-sm p-2">
                            <span className="text-Brand-Secondry text-base">Sub Total</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full bg-slate-50 dark:bg-slate-700/50 dark:text-slate-300 p-2">
                            <span className="text-Brand-Secondry text-base">Shipping</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full bg-slate-100 dark:bg-slate-700 dark:text-slate-300 p-2">
                            <span className="text-Brand-Secondry text-base">Tax</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full bg-slate-50 dark:bg-slate-700/50 dark:text-slate-300 p-2">
                            <span className="text-Brand-Secondry text-base">Coupon</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full bg-slate-100 dark:bg-slate-700 dark:text-slate-300 p-2">
                            <span className="text-Brand-Secondry text-base">Discount</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between h-10 w-full bg-teal-500 dark:text-slate-800 rounded-b-sm p-2">
                            <span className="text-Brand-Secondry text-base">Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-3 pt-4 gap-1.5">
                            <Button className="bg-teal-700 text-[12px] hover:bg-cyan-700/90 text-white">
                                <PauseCircle className="w-4 h-4 mr-1" />
                                Discount
                            </Button>
                            <Button className="bg-purple-800 text-[12px] hover:bg-red-400/90 text-white">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Tax
                            </Button>
                            <Button className="bg-pink-400 text-[12px] hover:bg-sky-800/90 text-white">
                                <Banknote className="w-4 h-4 mr-1" />
                                Shipping
                            </Button>
                            <Button className="bg-red-700 text-[12px] hover:bg-cyan-700/90 text-white">
                                <PauseCircle className="w-4 h-4 mr-1" />
                                Hold
                            </Button>
                            <Button className="bg-sky-600 text-[12px] hover:bg-red-400/90 text-white">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Void
                            </Button>
                            <Button className="bg-sky-800 text-[12px] hover:bg-sky-800/90 text-white">
                                <Banknote className="w-4 h-4 mr-1" />
                                Payment
                            </Button>
                            <Button className="bg-gray-500 text-[12px] hover:bg-cyan-700/90 text-white">
                                <PauseCircle className="w-4 h-4" />
                                View Orders
                            </Button>
                            <Button className="bg-purple-800 text-[12px] hover:bg-red-400/90 text-white">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Reset
                            </Button>
                            <Button className=" bg-red-500 text-[12px] hover:bg-sky-800/90 text-white">
                                <Banknote className="w-4 h-4" />
                                Transaction
                            </Button>
                        </div>
                    </div>

                    <Separator className="bg-slate-200" />

                    <div className="flex flex-col gap-3">
                        <span className="text-Grey-Grey-900 text-base font-semibold">
                            Select Payment
                        </span>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Cash */}
                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "cash"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-white dark:bg-slate-600 border-transparent"
                                    }`}
                                onClick={() => setPaymentMethod("cash")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                                        <img
                                            src={cash}
                                            className={`w-6 h-6 ${paymentMethod === "cash"
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

                            {/* Card */}
                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "card"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-white dark:bg-slate-600 border-transparent"
                                    }`}
                                onClick={() => setPaymentMethod("card")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <img
                                        src={card}
                                        className={`w-6 h-6 mt-0.5 ${paymentMethod === "card"
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

                            {/* Points */}
                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "points"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-white dark:bg-slate-600 border-transparent"
                                    }`}
                                onClick={() => setPaymentMethod("points")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <img
                                        src={points}
                                        className={`w-6 h-6 mt-0.5 ${paymentMethod === "points"
                                            ? "text-Brand-Primary"
                                            : "text-Grey-Grey-600"
                                            }`}
                                    />
                                    <span
                                        className={`text-base leading-4 ${paymentMethod === "points"
                                            ? "text-Brand-Primary"
                                            : "text-Brand-Secondry"
                                            }`}
                                    >
                                        Points
                                    </span>
                                </CardContent>
                            </Card>

                            {/* Deposit */}
                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "deposit"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-white dark:bg-slate-600 border-transparent"
                                    }`}
                                onClick={() => setPaymentMethod("deposit")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <img
                                        src={deposit}
                                        className={`w-6 h-6 mt-0.5 ${paymentMethod === "deposit"
                                            ? "text-Brand-Primary"
                                            : "text-Grey-Grey-600"
                                            }`}
                                    />
                                    <span
                                        className={`text-base leading-4 ${paymentMethod === "deposit"
                                            ? "text-Brand-Primary"
                                            : "text-Brand-Secondry"
                                            }`}
                                    >
                                        Deposit
                                    </span>
                                </CardContent>
                            </Card>

                            {/* Cheque */}
                            <Card
                                className={`cursor-pointer text-center py-2.5 rounded-md ${paymentMethod === "cheque"
                                    ? "bg-orange-100 text-orange-600 border-orange-600"
                                    : "bg-white dark:bg-slate-600 border-transparent"
                                    }`}
                                onClick={() => setPaymentMethod("cheque")}
                            >
                                <CardContent className="p-0 flex flex-col items-center gap-1.5">
                                    <img
                                        src={cheque}
                                        className={`w-6 h-6 mt-0.5 ${paymentMethod === "cheque"
                                            ? "text-Brand-Primary"
                                            : "text-Grey-Grey-600"
                                            }`}
                                    />
                                    <span
                                        className={`text-base leading-4 ${paymentMethod === "cheque"
                                            ? "text-Brand-Primary"
                                            : "text-Brand-Secondry"
                                            }`}
                                    >
                                        Cheque
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <Button className="w-full h-12 rounded-md bg-blue-900 hover:bg-indigo-500/90 text-white text-sm font-bold">
                    Pay : ${grandTotal.toFixed(2)}
                </Button>
            </div>
        </aside>
    );
}
