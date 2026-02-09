const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");


router.post("/", async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Employee.findOne({ employeeId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Employee with this ID already exists" });
    }

    const employee = new Employee({
      employeeId,
      fullName,
      email,
      department,
    });

    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Employee ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
