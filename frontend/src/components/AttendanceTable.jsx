import { useEffect, useState } from "react";
import API from "../services/api";

export default function AttendanceTable({ setRefresh }) {
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    const res = await API.get("/attendance");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchAttendance();
    setRefresh(() => fetchAttendance);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>

      {records.length === 0 ? (
        <p className="text-slate-400">No records yet</p>
      ) : (
        <table className="w-full">
          <thead className="text-left text-slate-500 text-sm">
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="border-t">
                <td>{r.employeeId}</td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
