import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    origin: process.env.NEXT_PUBLIC_URL_BASE || "http://localhost:3000",
  },
});
