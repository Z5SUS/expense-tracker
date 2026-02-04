import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";
import ExpenseChart from "../components/ExpenseChart";
import MonthFilter from "../components/MonthFilter";
import ExportCSV from "../components/ExportCSV";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
  };

  const filteredTransactions = selectedMonth
    ? transactions.filter((t) => {
        if (!t.createdAt) return false;
        const date = t.createdAt.toDate();
        const month = date.toISOString().slice(0, 7);
        return month === selectedMonth;
      })
    : transactions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-5 shadow-lg">
          <h1 className="text-2xl font-bold tracking-tight">Expense Tracker</h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/90 hover:bg-red-600 transition rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-4 shadow">
          <MonthFilter
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <ExportCSV transactions={filteredTransactions} />
        </div>

        {/* Summary + Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Summary transactions={filteredTransactions} />
          <ExpenseChart transactions={filteredTransactions} />
        </div>

        {/* Add Transaction */}
        <ExpenseForm />

        {/* Transactions */}
        <ExpenseList setTransactions={setTransactions} />
      </div>
    </div>
  );
}

export default Dashboard;
