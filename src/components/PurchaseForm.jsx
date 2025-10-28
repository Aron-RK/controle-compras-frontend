import { useState } from "react";
import { API } from "../api";

export default function PurchaseForm({ onAdded }) {
  const [buyer, setBuyer] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/purchases", { buyer, amount: parseFloat(amount), date });
      setBuyer(""); setAmount(""); setDate("");
      onAdded?.();
    } catch (err) {
      console.error("Erro ao adicionar compra:", err);
      alert("Não foi possível adicionar a compra.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-yellow-100 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-2 text-red-700">Adicionar Compra</h2>
      <input
        value={buyer}
        onChange={(e) => setBuyer(e.target.value)}
        placeholder="Comprador"
        className="border border-red-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
        required
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Valor"
        type="number"
        step="0.01"
        className="border border-red-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
        required
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        className="border border-red-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
        required
      />
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition-all duration-200"
      >
        Adicionar
      </button>
    </form>
  );
}
