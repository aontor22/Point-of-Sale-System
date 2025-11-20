import React from "react";
import { Calendar, Trash2, UserPlus2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function OrderHeaderCard() {
    return (
        <Card className="self-stretch p-5 bg-Brand-White shadow-[0px_4px_60px_0px_rgba(190,190,190,0.27)]">
            <CardContent className="p-0 space-y-4">
                

                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="flex-1 flex flex-col gap-1">
                        <Select defaultValue="walk-in">
                            <SelectTrigger className="h-9 rounded-[5px] border-Transparent-Secondry-Transparent bg-Brand-White text-sm text-Grey-Grey-900">
                                <SelectValue placeholder="Walk In Customer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="walk-in">Walk In Customer</SelectItem>
                                <SelectItem value="member">Registered Customer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="button"
                        className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-Brand-Primary p-0 md:mt-0"
                    >
                        <UserPlus2 className="h-5 w-5 text-white" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <Select defaultValue="usd">
                            <SelectTrigger className="h-9 rounded-[5px] border-Transparent-Secondry-Transparent bg-Brand-White text-sm text-Grey-Grey-900">
                                <SelectValue placeholder="USD" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">USD</SelectItem>
                                <SelectItem value="eur">EUR</SelectItem>
                                <SelectItem value="bdt">BDT</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Input
                            placeholder="Currency Exchange Rate"
                            className="h-9 rounded-[5px] border-Transparent-Secondry-Transparent bg-Brand-White text-sm text-Grey-Grey-300"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
