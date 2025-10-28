import axios from "axios";

// Substitua pela URL real do seu backend no Render
export const API = axios.create({
  baseURL: "https://SEU_BACKEND.onrender.com"
});
