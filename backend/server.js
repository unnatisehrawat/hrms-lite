const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);



    mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
  