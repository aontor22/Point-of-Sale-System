import { useState } from 'react';
import { Button } from './button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
import { Calendar } from 'lucide-react';

const SalesCat = ({ onGenerate }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [store, setStore] = useState('All');
    const [product, setProduct] = useState('All');

    const handleGenerate = () => {
        if (onGenerate) {
            onGenerate({
                startDate,
                endDate,
                store,
                product,
            });
        }
    };

    return (
        <div className="flex items-center justify-between space-x-4 p-4 border bg-white dark:bg-slate-800 rounded-md">
            <div className="flex-1 items-center space-x-2">
                <label className="text-sm font-medium">Choose Date</label>
                <div className="w-full flex gap-1.5 items-center border rounded-md mt-1 p-1 px-2 dark:bg-slate-900">
                    <Calendar size={18} />
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full"
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        onChangeRaw={(e) => e.preventDefault()}
                        dateFormat="dd-MMM-yyyy"
                    />
                </div>
            </div>

            <div className="flex-1 items-center space-x-2">
                <label className="text-sm font-medium">Store</label>
                <Select value={store} onValueChange={setStore}>
                    <SelectTrigger className="w-full mt-1 dark:bg-slate-900">
                        <SelectValue placeholder="Store" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Store 1">Store 1</SelectItem>
                        <SelectItem value="Store 2">Store 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 items-center space-x-2">
                <label className="text-sm font-medium">Products</label>
                <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger className="w-full mt-1 dark:bg-slate-900">
                        <SelectValue placeholder="Products" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Product 1">Product 1</SelectItem>
                        <SelectItem value="Product 2">Product 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                className="bg-orange-500 text-white mt-5"
                onClick={handleGenerate}
            >
                Generate Report
            </Button>
        </div>
    );
};

export default SalesCat;
