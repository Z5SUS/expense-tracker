function ExportCSV({ transactions }) {
  const exportCSV = () => {
    if (transactions.length === 0) return;

    const headers = ["Type", "Amount", "Date"];
    const rows = transactions.map((t) => [
      t.type,
      t.amount,
      t.createdAt ? t.createdAt.toDate().toLocaleDateString() : "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-end">
      <button
        onClick={exportCSV}
        className="
          h-[42px]
          px-4
          rounded-md
          bg-slate-800
          border border-slate-600
          text-white
          text-sm
          hover:bg-slate-700
          transition
        "
      >
        Export CSV
      </button>
    </div>
  );
}

export default ExportCSV;
