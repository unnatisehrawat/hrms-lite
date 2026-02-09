import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeTable({ setRefresh }) {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await axios.get("https://hrms-lite-n52f.onrender.com/api/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();

    // give Dashboard the refresh function
    setRefresh(() => fetchEmployees);
  }, []);

  const deleteEmployee = async (id) => {
    await axios.delete(`https://hrms-lite-n52f.onrender.com/api/employees/${id}`);
    fetchEmployees(); // immediate update after delete
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Employees</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-b">
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  onClick={() => deleteEmployee(emp._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
