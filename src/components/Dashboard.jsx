import { useEffect, useState } from "react";
import { API } from "../api";

export default function Dashboard({ updatedKey }) {
  const [totals, setTotals] = useState({ by_buyer: {}, total: 0 });

  const fetchTotals = async () => {
    try {
      const res = await API.get("/totals");
      setTotals(res.data ?? { by_buyer: {}, total: 0 });
    } catch (err) {
      console.error("Erro ao buscar totais:", err);
      setTotals({ by_buyer: {}, total: 0 });
    }
  };

  useEffect(() => {
    fetchTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedKey]);

  const buyers = Object.entries(totals.by_buyer || {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-red-600 text-white p-4 rounded-xl shadow-md flex flex-col justify-center items-center">
        <div className="text-sm font-medium">Total Geral</div>
        <div className="text-2xl font-extrabold mt-1">R$ {Number(totals.total || 0).toFixed(2)}</div>
      </div>

      {/* Show top 2 buyers on the first row for small screens; others below */}
      {buyers.length === 0 ? (
        <>
          <div className="hidden sm:flex bg-yellow-400 text-red-700 p-4 rounded-xl shadow-md items-center justify-center">
            <span className="font-medium">Nenhum comprador</span>
          </div>
          <div className="hidden sm:flex bg-yellow-400 text-red-700 p-4 rounded-xl shadow-md items-center justify-center">
            <span className="font-medium">Sem dados</span>
          </div>
        </>
      ) : (
        buyers.slice(0, 2).map(([buyer, amount]) => (
          <div key={buyer} className="bg-yellow-400 text-red-700 p-4 rounded-xl shadow-md text-center">
            <div className="text-sm font-medium">{buyer}</div>
            <div className="text-xl font-bold mt-1">R$ {Number(amount).toFixed(2)}</div>
          </div>
        ))
      )}

      {/* If more buyers exist, render them below in responsive way */}
      {buyers.length > 2 && (
        <div className="sm:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {buyers.map(([buyer, amount]) => (
            <div key={buyer} className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-sm text-gray-600">{buyer}</div>
              <div className="text-lg font-semibold text-red-700">R$ {Number(amount).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
