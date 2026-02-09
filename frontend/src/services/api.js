import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-n52f.onrender.com/api",
});

export default API;
