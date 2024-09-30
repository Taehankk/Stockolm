interface StockDataItem {
  stockDate: string;
  stockStartValue: number;
  stockHigh: number;
  stockLow: number;
  stockEndValue: number;
}
interface ChartDataItem {
  x: string;
  y: [number, number, number, number];
}

export const aggregateData = (
  data: StockDataItem[],
  period: "week" | "month"
): ChartDataItem[] => {
  const aggregatedData: { [key: string]: StockDataItem[] } = {};

  data.forEach((item) => {
    let key = "";

    if (period === "week") {
      const date = new Date(
        Number(item.stockDate.slice(0, 4)),
        Number(item.stockDate.slice(4, 6)) - 1,
        Number(item.stockDate.slice(6, 8))
      );
      const weekNumber = getWeekNumber(date);
      key = `${date.getFullYear()}년 ${weekNumber}주`;
    } else if (period === "month") {
      key = `${item.stockDate.slice(0, 4)}년 ${item.stockDate.slice(4, 6)}월`;
    }

    if (!aggregatedData[key]) {
      aggregatedData[key] = [];
    }
    aggregatedData[key].push(item);
  });

  const result: ChartDataItem[] = [];

  for (const key in aggregatedData) {
    const items = aggregatedData[key];
    const open = Number(items[0].stockStartValue);
    const close = Number(items[items.length - 1].stockEndValue);
    const high = Math.max(...items.map((item) => Number(item.stockHigh)));
    const low = Math.min(...items.map((item) => Number(item.stockLow)));

    result.push({
      x: key,
      y: [open, high, low, close],
    });
  }

  // x축 레이블 정렬
  result.sort((a, b) => (a.x > b.x ? 1 : -1));

  return result;
};
const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
