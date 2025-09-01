// Helper to get start and end dates for period
export function getPeriodDates(period: 'monthly' | 'weekly') {
  const now = new Date();
  let startDate: string, endDate: string;
  if (period === 'weekly') {
    const today = new Date();
    const day = today.getDay();
    // Calculate last Monday (or today if Monday)
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((day + 6) % 7));
    startDate = monday.toISOString().slice(0, 10);
    endDate = today.toISOString().slice(0, 10);
  } else {
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startDate = firstOfMonth.toISOString().slice(0, 10);
    endDate = now.toISOString().slice(0, 10);
  }
  return { startDate, endDate };
}