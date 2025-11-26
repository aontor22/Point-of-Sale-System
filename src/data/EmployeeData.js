import e1 from "../assets/employee/e1.jpg";
import e2 from "../assets/employee/e2.jpg";
import e3 from "../assets/employee/e3.jpg";
import e4 from "../assets/employee/e4.jpg";
import e5 from "../assets/employee/e5.jpg";
import e6 from "../assets/employee/e6.jpg";
import e7 from "../assets/employee/e7.jpg";
import e8 from "../assets/employee/e8.jpg";
import e9 from "../assets/employee/e9.jpg";
import e10 from "../assets/employee/e10.jpg";
import e11 from "../assets/employee/e11.jpg";
import e12 from "../assets/employee/e12.jpg";

const baseEmployees = [
  {
    empID: 1,
    empCode: "EMP-001",
    empName: "Sarah Johnson",
    empEmail: "sarah.johnson@company.com",
    empDepartment: "Store Operations",
    empRole: "Store Manager",
    empPhone: "+1 (555) 123-4567",
    empHireDate: "Mar 15, 2020",
    empStatus: "Active",
    empImage: e1,

    empCheckIn: "08:45 AM",
    empCheckOut: "05:30 PM",
    empWorkHours: "8h 45m",
    empLocation: "Main Store",
    empAttendanceStatus: "Present",
  },
  {
    empID: 2,
    empCode: "EMP-002",
    empName: "Michael Chen",
    empEmail: "michael.chen@company.com",
    empDepartment: "POS Operations",
    empRole: "Senior Cashier",
    empPhone: "+1 (555) 234-5678",
    empHireDate: "Jul 20, 2021",
    empStatus: "Active",
    empImage: e2,

    empCheckIn: "09:00 AM",
    empCheckOut: "06:00 PM",
    empWorkHours: "9h 0m",
    empLocation: "Main Store",
    empAttendanceStatus: "Present",
  },
  {
    empID: 3,
    empCode: "EMP-003",
    empName: "David Martinez",
    empEmail: "david.martinez@company.com",
    empDepartment: "Inventory",
    empRole: "Inventory Manager",
    empPhone: "+1 (555) 345-6789",
    empHireDate: "Jan 10, 2021",
    empStatus: "Active",
    empImage: e3,

    empCheckIn: "09:45 AM",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "Warehouse",
    empAttendanceStatus: "Late",
  },
  {
    empID: 4,
    empCode: "EMP-004",
    empName: "Emily Rodriguez",
    empEmail: "emily.rodriguez@company.com",
    empDepartment: "Sales",
    empRole: "Sales Associate",
    empPhone: "+1 (555) 456-7890",
    empHireDate: "Sep 5, 2022",
    empStatus: "On Leave",
    empImage: e4,

    empCheckIn: "-",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "-",
    empAttendanceStatus: "On Leave",
  },
  {
    empID: 5,
    empCode: "EMP-005",
    empName: "James Anderson",
    empEmail: "james.anderson@company.com",
    empDepartment: "POS Operations",
    empRole: "POS Operator",
    empPhone: "+1 (555) 567-8901",
    empHireDate: "Nov 12, 2023",
    empStatus: "Active",
    empImage: e5,

    empCheckIn: "08:30 AM",
    empCheckOut: "05:15 PM",
    empWorkHours: "8h 45m",
    empLocation: "Main Store",
    empAttendanceStatus: "Present",
  },
  {
    empID: 6,
    empCode: "EMP-006",
    empName: "Amanda Foster",
    empEmail: "amanda.foster@company.com",
    empDepartment: "Customer Service",
    empRole: "Customer Service Rep",
    empPhone: "+1 (555) 678-9012",
    empHireDate: "May 18, 2022",
    empStatus: "Active",
    empImage: e6,

    empCheckIn: "09:00 AM",
    empCheckOut: "01:00 PM",
    empWorkHours: "4h 0m",
    empLocation: "Main Store",
    empAttendanceStatus: "Half Day",
  },
  {
    empID: 7,
    empCode: "EMP-007",
    empName: "Robert Thompson",
    empEmail: "robert.thompson@company.com",
    empDepartment: "Store Operations",
    empRole: "Floor Supervisor",
    empPhone: "+1 (555) 789-0123",
    empHireDate: "Jun 1, 2021",
    empStatus: "Active",
    empImage: e7,

    empCheckIn: "-",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "Main Store",
    empAttendanceStatus: "Present",
  },
  {
    empID: 8,
    empCode: "EMP-008",
    empName: "Lisa Williams",
    empEmail: "lisa.williams@company.com",
    empDepartment: "Finance",
    empRole: "Accountant",
    empPhone: "+1 (555) 890-1234",
    empHireDate: "Feb 14, 2020",
    empStatus: "Active",
    empImage: e8,

    empCheckIn: "09:10 AM",
    empCheckOut: "06:05 PM",
    empWorkHours: "8h 55m",
    empLocation: "Main Store",
    empAttendanceStatus: "Present",
  },
  {
    empID: 9,
    empCode: "EMP-009",
    empName: "Kevin Brown",
    empEmail: "kevin.brown@company.com",
    empDepartment: "Inventory",
    empRole: "Stock Clerk",
    empPhone: "+1 (555) 901-2345",
    empHireDate: "Aug 30, 2023",
    empStatus: "Inactive",
    empImage: e9,

    empCheckIn: "-",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "Main Store",
    empAttendanceStatus: "Absent",
  },
  {
    empID: 10,
    empCode: "EMP-010",
    empName: "Maria Garcia",
    empEmail: "maria.garcia@company.com",
    empDepartment: "POS Operations",
    empRole: "Cashier",
    empPhone: "+1 (555) 012-3456",
    empHireDate: "Jan 15, 2024",
    empStatus: "Active",
    empImage: e10,

    empCheckIn: "08:50 AM",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "Main Store",
    empAttendanceStatus: "Present",
  },
  {
    empID: 11,
    empCode: "EMP-011",
    empName: "Daniel Wilson",
    empEmail: "daniel.wilson@company.com",
    empDepartment: "Store Operations",
    empRole: "Shift Manager",
    empPhone: "+1 (555) 112-3456",
    empHireDate: "Mar 20, 2022",
    empStatus: "Active",
    empImage: e11,

    empCheckIn: "-",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "-",
    empAttendanceStatus: "-",
  },
  {
    empID: 12,
    empCode: "EMP-012",
    empName: "Jessica Lee",
    empEmail: "jessica.lee@company.com",
    empDepartment: "Sales",
    empRole: "Sales Team Lead",
    empPhone: "+1 (555) 212-3456",
    empHireDate: "Oct 5, 2021",
    empStatus: "Active",
    empImage: e12,

    empCheckIn: "-",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "-",
    empAttendanceStatus: "-",
  },
];

const employeeImages = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12];

const departments = [
  "Sales",
  "POS Operations",
  "Inventory",
  "Customer Service",
  "Finance",
  "Store Operations",
];

const roles = [
  "Manager",
  "Supervisor",
  "Cashier",
  "Team Lead",
  "Operator",
  "Clerk",
  "Assistant"
];

function randomDate() {
  const start = new Date(2018, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toDateString().slice(4);
}

const demoEmployees = Array.from({ length: 200 }, (_, i) => {
  const id = i + baseEmployees.length + 1;

  return {
    empID: id,
    empCode: `EMP-${String(id).padStart(3, "0")}`,
    empName: `Demo Employee ${id}`,
    empEmail: `employee${id}@company.com`,
    empDepartment: departments[Math.floor(Math.random() * departments.length)],
    empRole: roles[Math.floor(Math.random() * roles.length)],
    empPhone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    empHireDate: randomDate(),
    empStatus: ["Active", "Inactive", "On Leave"][Math.floor(Math.random() * 3)],
    empImage: employeeImages[Math.floor(Math.random() * employeeImages.length)],

    empCheckIn: "-",
    empCheckOut: "-",
    empWorkHours: "-",
    empLocation: "Main Store",
    empAttendanceStatus: ["Present", "Absent", "Late", "Half Day"][Math.floor(Math.random() * 4)],
  };
});

const employees = [...baseEmployees, ...demoEmployees];
export default employees;

