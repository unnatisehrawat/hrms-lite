import axios from "axios";
import { useState } from "react";

export default function EmployeeForm({ refreshEmployees }) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://hrms-lite-n52f.onrender.com/api/employees", form);

      alert("Employee added");

      refreshEmployees();

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) =>
            setForm({ ...form, employeeId: e.target.value })
          }
          className="border border-slate-200 p-2 w-full rounded-lg"
          required
        />

        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
          className="border border-slate-200 p-2 w-full rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border border-slate-200 p-2 w-full rounded-lg"
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          className="border border-slate-200 p-2 w-full rounded-lg"
          required
        />

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium w-full">
          Add Employee
        </button>
      </form>
    </div>
  );
}
