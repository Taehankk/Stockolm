import { useState, useEffect } from "react";
import { getMinuteChartData } from "../../../../api/stockAPI";
import { ApexOptions } from "apexcharts";
import { aggregateData } from "../../../../utils/aggregateDate";
import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";

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

interface BasicStockChartProps {
  stockData: StockDataItem[];
  stockCode: string;
}

interface MinuteChartItem {
  stckCntgHour: string;
  stckOprc: string;
  stckHgpr: string;
  stckLwpr: string;
  stckPrpr: string;
}

const BasicStockChart = ({ stockData, stockCode }: BasicStockChartProps) => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [timeFrame, setTimeFrame] = useState<"real-time" | "day" | "month">(
    "real-time"
  );

  const { data: minuteChartData, isSuccess } = useQuery({
    queryKey: ["minuteChartData", stockCode],
    queryFn: () => getMinuteChartData(stockCode),
    refetchInterval: 3000,
    enabled: timeFrame === "real-time",
  });

  useEffect(() => {
    if (timeFrame === "real-time" && minuteChartData && isSuccess) {
      const flattenedData = minuteChartData.flat();
      const transformedData = flattenedData.map((item: MinuteChartItem) => ({
        x: item.stckCntgHour,
        y: [
          Number(item.stckOprc),
          Number(item.stckHgpr),
          Number(item.stckLwpr),
          Number(item.stckPrpr),
        ],
      }));
      setData(transformedData);
    } else if (stockData.length > 0) {
      let transformedData: ChartDataItem[] = [];
      if (timeFrame === "day") {
        transformedData = stockData.map((item) => ({
          x: `${item.stockDate.slice(2, 4)}.${item.stockDate.slice(4, 6)}.${item.stockDate.slice(6)}`,
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
  }, [minuteChartData, stockData, timeFrame, isSuccess]);

  const options: ApexOptions = {
    chart: {
      type: timeFrame === "day" ? "line" : "candlestick",
      height: 390,
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#ED2926",
          downward: "#2679ED",
        },
      },
    },
    xaxis: {
      min:
        timeFrame === "real-time"
          ? data.length > 60
            ? data.length - 60
            : 0
          : data.length > 80
            ? data.length - 80
            : data.length - 48,
      max: data.length,
      type: "category",
      tickAmount: 7,
      labels: {
        rotate: 0,
        formatter: function (value: string) {
          if (timeFrame === "real-time" && value && value.length >= 6) {
            const hour = value.slice(0, 2);
            const minute = value.slice(2, 4);
            return `${hour}시 ${minute}분`;
          }
          return value;
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
    },
    tooltip: {
      shared: true,
      x: {
        format: "dd MMM HH:mm",
      },
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const isCandlestick = timeFrame !== "day";
        const dataPoint = series[seriesIndex][dataPointIndex];

        if (isCandlestick && Array.isArray(dataPoint)) {
          const [open, high, low, close] = dataPoint;
          return `
            <div style="padding: 10px;">
              <strong>시가: </strong>${open}<br/>
              <strong>고가: </strong>${high}<br/>
              <strong>저가: </strong>${low}<br/>
              <strong>종가: </strong>${close}<br/>
            </div>
          `;
        } else if (!isCandlestick) {
          return `
            <div style="padding: 10px;">
              <strong>종가: </strong>${dataPoint}<br/>
            </div>
          `;
        }
        return "";
      },
    },
    stroke: {
      curve: "smooth",
      width: timeFrame === "day" ? 3 : 1,
      colors: timeFrame === "day" ? ["#FF0000"] : undefined,
    },
    fill:
      timeFrame === "day"
        ? {
            opacity: 0.9,
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "diagonal2",
              gradientToColors: ["#FF5F5F"],
              stops: [0, 100],
              opacityFrom: 0.8,
              opacityTo: 0.2,
            },
          }
        : {
            type: "solid",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: ["#FF5F5F"],
              stops: [0, 100],
              opacityFrom: 0.7,
              opacityTo: 0.2,
            },
          },
  };

  return (
    <div className="chart-container">
      <div className="w-[100%]">
        <ReactApexChart
          options={options}
          series={[{ data }]}
          type={timeFrame === "day" ? "line" : "candlestick"}
          height={390}
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

export default BasicStockChart;
