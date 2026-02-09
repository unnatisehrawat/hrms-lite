import { useState } from "react";
import axios from "axios";

export default function AttendanceForm({ refreshAttendance }) {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/attendance", {
        employeeId,
        date,
        status,
      });

      alert("Attendance marked");

      setEmployeeId("");
      setDate("");
      setStatus("Present");

      refreshAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border border-slate-200 p-2 rounded w-full"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-slate-200 p-2 rounded w-full"
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-slate-200 p-2 rounded w-full"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium">
          Submit
        </button>
      </form>
    </div>
  );
}
