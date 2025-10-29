import axios from "axios";

export const API = axios.create({
  baseURL: "https://controle-compras-backend.onrender.com",
});
