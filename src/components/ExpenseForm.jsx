import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const addTransaction = async () => {
    if (!amount) return;

    await addDoc(collection(db, "transactions"), {
      uid: auth.currentUser.uid,
      amount: Number(amount),
      type,
      createdAt: serverTimestamp(),
    });

    setAmount("");
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-5 shadow space-y-4">
      <h3 className="text-lg font-semibold">Add Transaction</h3>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          onClick={addTransaction}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;
