const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");


router.post("/", async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendance = new Attendance({
      employeeId,
      date,
      status,
    });

    await attendance.save();

    res.status(201).json(attendance);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json(record);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const records = await Attendance.find().sort({ date: -1 });
  res.json(records);
});

module.exports = router;
