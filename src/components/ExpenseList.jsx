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
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">Transactions</h3>

      {transactions.length === 0 && (
        <p className="text-gray-500">No transactions yet</p>
      )}

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <span className="font-medium">
              {t.type.toUpperCase()} — ₹{t.amount}
            </span>
            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-500 hover:text-red-700"
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
