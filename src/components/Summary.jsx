function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-5 shadow">
      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
        <p className="text-sm text-slate-400">Income</p>
        <p className="text-xl font-semibold text-green-400">₹{income}</p>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
        <p className="text-sm text-slate-400">Expense</p>
        <p className="text-xl font-semibold text-red-400">₹{expense}</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
        <p className="text-sm text-slate-400">Balance</p>
        <p className="text-xl font-semibold text-blue-400">₹{balance}</p>
      </div>
    </div>
  );
}

export default Summary;
