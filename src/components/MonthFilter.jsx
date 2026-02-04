function MonthFilter({ selectedMonth, setSelectedMonth }) {
  return (
    <input
      type="month"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="bg-[#111827] border border-white/10 text-sm px-3 py-2 rounded-md"
    />
  );
}

export default MonthFilter;
