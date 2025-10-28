import { useEffect, useState } from "react";
import { API } from "../api";

export default function PurchaseTable() {
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

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Compras</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Comprador</th>
            <th className="px-4 py-2 text-right">Valor</th>
            <th className="px-4 py-2 text-center">Data</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p.id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-2">{p.buyer}</td>
              <td className="px-4 py-2 text-right">R$ {p.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-center">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
