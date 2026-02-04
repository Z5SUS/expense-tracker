import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

function ExpenseList({ setTransactions }) {
  const [transactions, setLocalTransactions] = useState([]);

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("uid", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc"),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLocalTransactions(data);
      setTransactions(data);
    });

    return () => unsub();
  }, [setTransactions]);

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-5 shadow">
      <h3 className="text-lg font-semibold mb-3">Transactions</h3>

      {transactions.length === 0 && (
        <p className="text-slate-400">No transactions yet</p>
      )}

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-slate-800/60 border border-slate-700 p-3 rounded-lg"
          >
            <span className="font-medium">
              {t.type.toUpperCase()} — ₹{t.amount}
            </span>

            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-400 hover:text-red-500 transition"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
