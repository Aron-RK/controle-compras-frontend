import axios from "axios";

// URL do backend no Render
export const API = axios.create({
  baseURL: "https://controle-compras-backend.onrender.com", // sem /purchases
});
