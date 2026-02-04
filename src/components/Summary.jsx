function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-xl shadow">
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Income</p>
        <p className="text-xl font-semibold text-green-600">₹{income}</p>
      </div>

      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Expense</p>
        <p className="text-xl font-semibold text-red-600">₹{expense}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Balance</p>
        <p className="text-xl font-semibold text-blue-600">₹{balance}</p>
      </div>
    </div>
  );
}

export default Summary;
