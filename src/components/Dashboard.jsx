import { useEffect, useState } from "react";
import { API } from "../api";

export default function Dashboard({ updatedKey }) {
  const [totals, setTotals] = useState({ by_buyer: {}, total: 0 });

  const fetchTotals = async () => {
    try {
      const res = await API.get("/totals");
      setTotals(res.data);
    } catch (err) {
      console.error("Erro ao buscar totais:", err);
    }
  };

  // atualiza sempre que updatedKey mudar
  useEffect(() => {
    fetchTotals();
  }, [updatedKey]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-lg text-center">
        <p className="text-gray-500 font-semibold">Total Geral</p>
        <p className="text-2xl font-bold">R$ {totals.total.toFixed(2)}</p>
      </div>
      {Object.entries(totals.by_buyer).map(([buyer, amount]) => (
        <div key={buyer} className="bg-white p-4 rounded-xl shadow-lg text-center">
          <p className="text-gray-500 font-semibold">{buyer}</p>
          <p className="text-xl font-bold">R$ {amount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
