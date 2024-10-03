import { useState } from "react";
import { useSelector } from "react-redux";
import BasicStockChart from "./BasicStockChart";
import AnalystStockChart from "./AnalystStockChart";
import { RootState } from "../../../store";

interface StockDataItem {
  stockDate: string;
  stockStartValue: number;
  stockHigh: number;
  stockLow: number;
  stockEndValue: number;
}

interface AnalystDataItem {
  goalDate: string;
  goalStock: number;
  analystName: string;
  opinion: string;
}

interface StockChartProps {
  stockData: StockDataItem[];
}

const StockChart = ({ stockData }: StockChartProps) => {
  const [chartType, setChartType] = useState<"basic" | "analysis">("basic");
  const analystData: AnalystDataItem[] = useSelector((state: RootState) =>
    state.stock.bestAnalysts.map((analyst) => ({
      ...analyst,
      goalStock: Number(analyst.goalStock),
    }))
  );
  return (
    <div className="chart-container">
      <div className="flex">
        <button
          className={`m-1 py-1 px-5 text-medium text-white rounded-lg ${
            chartType === "basic" ? "bg-PrimaryRed" : "bg-red-200"
          }`}
          onClick={() => setChartType("basic")}
        >
          기본
        </button>
        <button
          className={`m-1 py-1 px-5 text-medium text-white rounded-lg ${
            chartType === "analysis" ? "bg-PrimaryBlue" : "bg-LightBlue"
          }`}
          onClick={() => setChartType("analysis")}
        >
          분석
        </button>
      </div>

      {chartType === "basic" ? (
        <BasicStockChart stockData={stockData} />
      ) : (
        <AnalystStockChart stockData={stockData} analystData={analystData} />
      )}
    </div>
  );
};

export default StockChart;
