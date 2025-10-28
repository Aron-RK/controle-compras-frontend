import { useEffect, useState } from "react";
import { API } from "../api";

export default function PurchaseTable({ onUpdated }) {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
      const res = await API.get("/purchases");
      setPurchases(res.data);
    } catch (err) {
      console.error("Erro ao buscar compras:", err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir esta compra?")) return;
    try {
      await API.delete(`/purchases/${id}`);
      fetchPurchases();
      onUpdated?.();
    } catch (err) {
      console.error("Erro ao deletar compra:", err);
      alert("Não foi possível deletar a compra.");
    }
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-red-700">Compras</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Comprador</th>
            <th className="px-4 py-2 text-right">Valor</th>
            <th className="px-4 py-2 text-center">Data</th>
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p.id} className="hover:bg-red-100 transition-colors">
              <td className="px-4 py-2">{p.buyer}</td>
              <td className="px-4 py-2 text-right">R$ {p.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-center">{p.date}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm transition-colors"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
