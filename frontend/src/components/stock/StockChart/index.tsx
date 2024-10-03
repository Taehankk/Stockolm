import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { aggregateData } from "../../../utils/aggregateDate";

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
interface StockChartProps {
  stockData: StockDataItem[];
}

const StockChart = ({ stockData }: StockChartProps) => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [timeFrame, setTimeFrame] = useState<
    "real-time" | "day" | "week" | "month"
  >("real-time");

  useEffect(() => {
    if (stockData && stockData.length > 0) {
      let transformedData: ChartDataItem[] = [];

      if (timeFrame === "real-time") {
        transformedData = stockData.map((item) => ({
          x: item.stockDate,
          y: [
            Number(item.stockStartValue),
            Number(item.stockHigh),
            Number(item.stockLow),
            Number(item.stockEndValue),
          ],
        }));
      } else if (timeFrame === "day") {
        transformedData = stockData.map((item) => ({
          x: `${item.stockDate.slice(2, 4)}년 ${item.stockDate.slice(4, 6)}월 ${item.stockDate.slice(6)}일`,
          y: [
            Number(item.stockStartValue),
            Number(item.stockHigh),
            Number(item.stockLow),
            Number(item.stockEndValue),
          ],
        }));
      } else if (timeFrame === "month") {
        transformedData = aggregateData(stockData, "month");
      }
      setData(transformedData);
    }
  }, [stockData, timeFrame]);

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      min: data.length > 80 ? data.length - 80 : data.length - 48,
      max: data.length,
      type: "category",
      labels: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      tickAmount: 4,
    },
  };

  return (
    <div className="chart-container">
      <div className="flex">
        <div className="m-1 py-1 px-5 text-medium text-white rounded-lg bg-PrimaryRed">
          기본
        </div>
        <div className="m-1 py-1 px-5 text-medium text-white rounded-lg bg-PrimaryBlue">
          분석
        </div>
      </div>
      <div className="w-[100%]">
        <ReactApexChart
          options={options}
          series={[{ data }]}
          type="candlestick"
          height={230}
        />
      </div>
      <div className="flex">
        <button
          onClick={() => setTimeFrame("real-time")}
          className={`mx-1 py-1 px-6 text-medium text-white rounded-lg ${timeFrame === "real-time" ? "bg-PrimaryBlue" : "bg-LightBlue"}`}
        >
          실시간
        </button>
        <button
          onClick={() => setTimeFrame("day")}
          className={`mx-1 py-1 px-6 text-medium text-white rounded-lg ${timeFrame === "day" ? "bg-PrimaryBlue" : "bg-LightBlue"}`}
        >
          일
        </button>
        <button
          onClick={() => setTimeFrame("month")}
          className={`mx-1 py-1 px-6 text-medium text-white rounded-lg ${timeFrame === "month" ? "bg-PrimaryBlue" : "bg-LightBlue"}`}
        >
          월
        </button>
      </div>
    </div>
  );
};

export default StockChart;
