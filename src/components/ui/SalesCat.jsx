import { useState } from 'react';
import { Button } from './button';
import DatePicker from 'react-datepicker'; // Correct import
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import styles
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select'; // Assuming you have custom Select components from Shadcn
import { Calendar } from 'lucide-react';

const ReportFilter = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [store, setStore] = useState('All');
    const [product, setProduct] = useState('All');

    return (
        <div className="flex items-center justify-between space-x-4 p-4 border bg-white rounded-md">
            <div className="flex-1 items-center space-x-2">
                <label htmlFor="date-range" className="text-sm font-medium">
                    Choose Date
                </label>
                <div className="w-full flex gap-1.5 items-center border rounded-md mt-1 p-1 px-2">
                    <Calendar size={18} />
                    <DatePicker
                        id="date-range"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd-MMM-yyyy"
                        className="w-full"
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        onChangeRaw={(e) => e.preventDefault()}
                        placeholderText="Select Date Range"
                    />
                </div>
            </div>

            <div className="flex-1 items-center space-x-2">
                <label htmlFor="store" className="text-sm font-medium">
                    Store
                </label>
                <Select value={store} onValueChange={setStore}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Store" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Store 1">Store 1</SelectItem>
                        <SelectItem value="Store 2">Store 2</SelectItem>
                        <SelectItem value="Store 3">Store 3</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 items-center space-x-2">
                <label htmlFor="products" className="text-sm font-medium">
                    Products
                </label>
                <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Products" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Product 1">Product 1</SelectItem>
                        <SelectItem value="Product 2">Product 2</SelectItem>
                        <SelectItem value="Product 3">Product 3</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-none">
                <Button className="bg-orange-500 text-white mt-5" onClick={() => alert('Generate Report')}>
                    Generate Report
                </Button>
            </div>
        </div>
    );
};

export default ReportFilter;
