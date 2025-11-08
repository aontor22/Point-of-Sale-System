import InsightsRow from "../ui/InsightsRow";
import tc1 from '../../assets/products/tc1.svg'
import tc2 from '../../assets/products/tc2.svg'
import tc3 from '../../assets/products/tc3.svg'
import tc4 from '../../assets/products/tc4.svg'
import tc5 from '../../assets/products/tc5.svg'


export default function CategoryView() {


  const heatmapData = {
    period: "Weekly",
    days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    hours: ["2 am","4 am","6 am","8 am","10 am","12 pm"],
    dataMap: {
      "0-0": 0.9, "1-2": 0.6, "2-1": 0.7, "2-3": 0.5, "4-5": 0.8, "6-4": 0.9,
    },
  };

  const customers = [
    { name: "Carlos Curran", city: "Dhaka",   orders: 20, amount: "8965", avatar: tc1 },
    { name: "Stan Gaunter",  city: "Dhaka",   orders: 25, amount: "6985", avatar: tc2 },
    { name: "Richard Wilson",city: "Gazipur", orders: 15, amount: "5366", avatar: tc3 },
    { name: "Mary Bronson",  city: "Rangpur", orders: 9,  amount: "4569", avatar: tc4 },
    { name: "Annie Tremblay",city: "Khulna",  orders: 17, amount: "35698",avatar: tc5 },
  ];

  return (
    <InsightsRow
      catsData
      heatmapData={heatmapData}
      customers={customers}
    />
  );
}
