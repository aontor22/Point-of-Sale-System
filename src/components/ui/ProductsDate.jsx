import React from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductsDate = ({
    startDate,
    endDate,
    onChange,
    placeholder = "Select Date Range",
}) => {
    const handleChange = (dates) => {
        if (onChange) {
            onChange(dates);
        }
    };

    return (
        <div className="flex justify-end">

            <div className="flex justify-end gap-1.5 items-center border rounded-md mt-1 p-1 px-2 bg-white dark:bg-slate-900">
                <Calendar size={18} className="text-slate-600 dark:text-slate-200" />

                <DatePicker
                    id="date-range"
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleChange}
                    onChangeRaw={(e) => e.preventDefault()}
                    dateFormat="dd-MMM-yyyy"
                    placeholderText={placeholder}
                    className="w-full bg-transparent outline-none text-sm"
                />
            </div>
        </div>
    );
};

export default ProductsDate;
