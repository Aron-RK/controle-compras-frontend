import PurchaseForm from "./components/PurchaseForm";
import PurchaseTable from "./components/PurchaseTable";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-800">
        Controle de Compras
      </h1>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Dashboard />
      </div>

      {/* Form + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PurchaseForm />
        </div>
        <div className="lg:col-span-2 overflow-x-auto">
          <PurchaseTable />
        </div>
      </div>
    </div>
  );
}
