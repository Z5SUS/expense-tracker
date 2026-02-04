function MonthFilter({ selectedMonth, setSelectedMonth }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mr-2">Select Month</label>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border p-2 rounded-md"
      />
    </div>
  );
}

export default MonthFilter;
