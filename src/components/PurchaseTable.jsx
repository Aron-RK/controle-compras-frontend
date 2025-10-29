import { useEffect, useState } from "react";
import { API } from "../api";

export default function PurchaseTable({ refresh }) {
  const [purchases, setPurchases] = useState([]);

  const load = async () => {
    const res = await API.get("/purchases");
    setPurchases(res.data);
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja deletar esta compra?")) return;
    await API.delete(`/purchases/${id}`);
    load();
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-2xl shadow-md overflow-x-auto w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Compras</h2>

      {/* --- Tabela (para telas grandes) --- */}
      <div className="hidden md:block">
