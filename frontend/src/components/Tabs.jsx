export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex bg-white rounded-xl p-1 shadow w-fit">
      <button
        onClick={() => setActiveTab("employees")}
        className={`px-6 py-2 rounded-lg ${
          activeTab === "employees"
            ? "bg-emerald-500 text-white"
            : "text-slate-600"
        }`}
      >
        Employees
      </button>

      <button
        onClick={() => setActiveTab("attendance")}
        className={`px-6 py-2 rounded-lg ${
          activeTab === "attendance"
            ? "bg-emerald-500 text-white"
            : "text-slate-600"
        }`}
      >
        Attendance
      </button>
    </div>
  );
}
