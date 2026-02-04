export function getMonthlyStats(transactions) {
  const map = {};

  transactions.forEach((t) => {
    if (!t.createdAt) return;

    const date = t.createdAt.toDate();
    const key = date.toISOString().slice(0, 7); // YYYY-MM

    if (!map[key]) {
      map[key] = { income: 0, expense: 0 };
    }

    map[key][t.type] += Number(t.amount);
  });

  return map;
}
