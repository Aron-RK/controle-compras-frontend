import { useEffect, useState } from "react";
import { API } from "../api";

function EditModal({ open, onClose, purchase, onSaved }) {
  const [buyer, setBuyer] = useState(purchase?.buyer || "");
  const [amount, setAmount] = useState(purchase?.amount || "");
  const [date, setDate] = useState(purchase?.date || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBuyer(purchase?.buyer || "");
    setAmount(purchase?.amount || "");
    setDate(purchase?.date || "");
  }, [purchase]);

  if (!open) return null;

  const handleSave = async () => {
    if (!buyer || !amount || !date) {
      alert("Preencha todos os campos.");
      return;
    }
    setSaving(true);
    try {
      await API.put(`/purchases/${purchase.id}`, { buyer, amount: parseFloat(amount), date });
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Não foi possível salvar a alteração.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-5">
        <h3 className="text-lg font-semibold text-red-700 mb-3">Editar Compra</h3>

        <label className="text-sm text-gray-600">Comprador</label>
        <input value={buyer} onChange={(e)=>setBuyer(e.target.value)} className="w-full p-2 mb-2 border rounded" />

        <label className="text-sm text-gray-600">Valor</label>
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" step="0.01" className="w-full p-2 mb-2 border rounded" />

        <label className="text-sm text-gray-600">Data</label>
        <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="w-full p-2 mb-4 border rounded" />

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded-md border">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-red-600 text-white">
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseTable({ onUpdated }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const res = await API.get("/purchases");
      setPurchases(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar compras:", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir esta compra?")) return;
    try {
      await API.delete(`/purchases/${id}`);
      await fetchPurchases();
      onUpdated?.();
    } catch (err) {
      console.error("Erro ao deletar compra:", err);
      alert("Não foi possível deletar a compra.");
    }
  };

  const openEdit = (p) => {
    setEditItem(p);
    setModalOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-red-700">Histórico de Compras</h2>
        <div className="flex gap-2">
          <button onClick={fetchPurchases} className="text-sm px-3 py-1 border rounded">Atualizar</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-8 text-center text-gray-500">Carregando...</div>
        ) : purchases.length === 0 ? (
          <div className="py-8 text-center text-gray-500">Nenhuma compra encontrada.</div>
        ) : (
          <table className="min-w-full w-full table-auto">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Comprador</th>
                <th className="px-4 py-2 text-right">Valor</th>
                <th className="px-4 py-2 text-center">Data</th>
                <th className="px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="odd:bg-white even:bg-yellow-50 hover:bg-yellow-100">
                  <td className="px-4 py-2">{p.buyer}</td>
                  <td className="px-4 py-2 text-right">R$ {Number(p.amount).toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">{p.date}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-sm px-2 py-1 rounded bg-yellow-400 text-red-700 hover:brightness-95"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-sm px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <EditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        purchase={editItem}
        onSaved={async () => {
          await fetchPurchases();
          onUpdated?.();
        }}
      />
    </div>
  );
}
