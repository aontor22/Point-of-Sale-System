import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MaintenanceImg from "@/assets/maintenance.png";
import { useNavigate } from "react-router-dom";

export default function MaintenancePage() {
    const navigate = useNavigate();

    const handleDashboard = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="w-full h-full min-h-screen bg-Light-Light-500 flex items-center justify-center">
            <Card className="w-full max-w-3xl bg-slate-100 shadow-slate-600 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center gap-8 px-6 py-10">
                    <div className="w-full flex items-center justify-center">
                        <img
                            src={MaintenanceImg}
                            alt="Under maintenance"
                            className="w-full max-w-[420px] h-auto"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center">
                        <h2 className="text-Grey-Grey-900 text-2xl font-bold font-['Nunito_Sans'] leading-9">
                            We are Under Maintenance
                        </h2>
                        <p className="text-Grey-Grey-600 text-base font-medium font-['Nunito_Sans'] leading-6">
                            Sorry for any inconvenience caused, we have almost done
                            <br />
                            Will get back soon!
                        </p>

                        <Button
                            onClick={handleDashboard}
                            size="sm"
                            className="mt-2 px-3 py-1.5 bg-sky-600 rounded-sm text-white text-xs font-medium font-['Nunito_Sans'] leading-5 hover:bg-sky-700"
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
