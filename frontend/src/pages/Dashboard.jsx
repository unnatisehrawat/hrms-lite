import { useState } from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("employees");

  const [refreshEmployees, setRefreshEmployees] = useState(null);

  const [refreshAttendance, setRefreshAttendance] = useState(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* EMPLOYEES TAB */}
        {activeTab === "employees" && (
          <div className="space-y-6 mt-6">
            <EmployeeForm refreshEmployees={() => refreshEmployees?.()} />
            <EmployeeTable setRefresh={setRefreshEmployees} />
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === "attendance" && (
          <div className="space-y-6 mt-6">
            <AttendanceForm refreshAttendance={refreshAttendance} />
            <AttendanceTable setRefresh={setRefreshAttendance} />
          </div>
        )}
      </div>
    </div>
  );
}
