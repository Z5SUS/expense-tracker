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
    <button
      onClick={exportCSV}
      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black"
    >
      Export CSV
    </button>
  );
}

export default ExportCSV;
