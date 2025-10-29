import { useState } from "react";
import Dashboard from "./components/Dashboard";
import PurchaseForm from "./components/PurchaseForm";
import PurchaseTable from "./components/PurchaseTable";

export default function App() {
  const [updatedKey, setUpdatedKey] = useState(0);

  const handleUpdate = () => setUpdatedKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-red-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 text-center">
            Controle de Compras
          </h1>
          <p className="text-center text-sm text-gray-600 mt-1">
            Painel responsivo • Amarelo & Vermelho
          </p>
        </header>

        {/* Dashboard */}
        <section className="mb-6">
          <Dashboard key={updatedKey} updatedKey={updatedKey} />
        </section>

        {/* Main layout: form + table */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <PurchaseForm onAdded={handleUpdate} />
          </aside>

          <section className="lg:col-span-2">
            <PurchaseTable onUpdated={handleUpdate} />
          </section>
        </main>
      </div>
    </div>
  );
}
