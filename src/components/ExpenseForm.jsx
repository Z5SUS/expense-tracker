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
    <div className="bg-white p-5 rounded-xl shadow space-y-3">
      <h3 className="text-lg font-semibold">Add Transaction</h3>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          onClick={addTransaction}
          className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;
