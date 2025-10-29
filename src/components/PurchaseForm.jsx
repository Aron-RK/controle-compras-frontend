import { useState } from "react";
import { API } from "../api";

export default function PurchaseForm({ onAdded }) {
  const [buyer, setBuyer] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyer.trim() || !amount || !date) {
      alert("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      await API.post("/purchases", { buyer: buyer.trim(), amount: parseFloat(amount), date });
      setBuyer("");
      setAmount("");
      setDate("");
      onAdded?.();
    } catch (err) {
      console.error("Erro ao adicionar compra:", err);
      alert("Não foi possível adicionar a compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-yellow-100 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-red-700 mb-3">Adicionar Compra</h3>

      <label className="block mb-2 text-sm text-gray-700">Comprador</label>
      <input
        value={buyer}
        onChange={(e) => setBuyer(e.target.value)}
        placeholder="Nome do comprador"
        className="w-full p-2 mb-3 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
        required
      />

      <label className="block mb-2 text-sm text-gray-700">Valor (R$)</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        step="0.01"
        placeholder="0.00"
        className="w-full p-2 mb-3 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
        required
      />

      <label className="block mb-2 text-sm text-gray-700">Data</label>
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        className="w-full p-2 mb-4 border border-red-300 rounded-md focus:ring-2 focus:ring-red-400"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md transition"
      >
        {loading ? "Adicionando..." : "Adicionar"}
      </button>
    </form>
  );
}
