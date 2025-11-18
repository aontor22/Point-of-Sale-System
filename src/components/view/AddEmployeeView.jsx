// src/app/employees/AddEmployeeForm.jsx
import React, { useState } from "react";
import EmployeePhotoCard from "@/components/ui/employee/EmployeePhotoCard";
import EmployeeBasicInfoCard from "@/components/ui/employee/EmployeeBasicInfoCard";
import EmployeeJobInfoCard from "@/components/ui/employee/EmployeeJobInfoCard";
import EmployeeAddressInfoCard from "@/components/ui/employee/EmployeeAddressInfoCard";
import EmployeeEmergencyContactCard from "@/components/ui/employee/EmployeeEmergencyContactCard";
import EmployeeAdditionalInfoCard from "@/components/ui/employee/EmployeeAdditionalInfoCard";
import ButtonComponent from "../ui/ChangeButton";
import { Save, X } from "lucide-react";
import Footer from "../ui/Footer";

export default function AddEmployeeForm() {

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    return (
        <div className="space-y-6">
            <div className="flex">
                <div className="flex-1">
                    <h1 className="text-xl font-semibold text-blue-800">Add New Employee</h1>
                    <span className="text-slate-500">Create a new employee profile with all required information</span>
                </div>
                <div>
                    <ButtonComponent
                        title="Cancel"
                        isVisible={isInventoryReportVisible}
                        className="bg-white border gap-2 hover:bg-orange-600"
                        icon={<X size={20} />}
                    ></ButtonComponent>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                    <EmployeePhotoCard />
                </div>

                <div className="space-y-4 md:col-span-2">
                    <EmployeeBasicInfoCard />
                    <EmployeeJobInfoCard />
                    <EmployeeAddressInfoCard />
                    <EmployeeEmergencyContactCard />
                    <EmployeeAdditionalInfoCard />
                </div>
            </div>

            <div className="w-full flex justify-end items-center gap-4 mt-4">
                <ButtonComponent
                    title="Cancel"
                    isVisible={isInventoryReportVisible}
                    className="bg-white border gap-2 hover:bg-orange-600"
                    icon=""
                />

                <ButtonComponent
                    title="Save Employee"
                    isVisible={isInventoryReportVisible}
                    className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                    icon={<Save size={20} />}
                />
            </div>

            <Footer />

        </div>
    );
}
