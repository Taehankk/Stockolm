import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface StockDataItem {
  stockDate: string;
  stockEndValue: number;
}

interface AnalystDataItem {
  goalDate: string;
  goalStock: number;
  analystName: string;
  opinion: string;
}

interface AnalystStockChartProps {
  stockData: StockDataItem[];
  analystData: AnalystDataItem[];
}

const AnalystStockChart = ({
  stockData,
  analystData,
}: AnalystStockChartProps) => {
  const [stockSeries, setStockSeries] = useState<{ x: number; y: number }[]>(
    []
  );
  const [analystSeries, setAnalystSeries] = useState<
    { x: number; y: number; analystName: string; opinion: string }[]
  >([]);

  useEffect(() => {
    if (stockData.length > 0) {
      const formatDate = (dateString: string) => {
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return `${year}-${month}-${day}`;
      };

      const recentStockData = stockData
        .slice(-50)
        .filter(
          (item) =>
            !isNaN(new Date(formatDate(item.stockDate)).getTime()) &&
            !isNaN(Number(item.stockEndValue))
        )
        .map((item) => ({
          x: new Date(formatDate(item.stockDate)).getTime(),
          y: Number(item.stockEndValue),
        }));

      setStockSeries(recentStockData);
    }

    if (analystData.length > 0) {
      const analystPredictions = analystData
        .filter(
          (analyst) =>
            !isNaN(new Date(analyst.goalDate).getTime()) &&
            !isNaN(analyst.goalStock)
        )
        .map((analyst) => ({
          x: new Date(analyst.goalDate).getTime(),
          y: analyst.goalStock,
          analystName: analyst.analystName,
          opinion: analyst.opinion,
        }));

      setAnalystSeries(analystPredictions);
    }
  }, [stockData, analystData]);

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      foreColor: "#333",
    },
    stroke: {
      width: [3, 0],
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (timestamp) {
          if (timestamp) {
            return new Date(timestamp).toLocaleDateString("ko", {
              month: "short",
              day: "numeric",
            });
          }
          return "";
        },
      },
    },
    fill: {
      type: ["solid", "gradient"],
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.9,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    yaxis: {
      tickAmount: 5,
    },
    tooltip: {
      shared: false,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const data = w.globals.series[seriesIndex][dataPointIndex];
        if (seriesIndex === 1) {
          const prediction = analystSeries[dataPointIndex];
          return `
            <div style="padding: 10px;">
              <strong>예측 일자: </strong>${new Date(
                prediction.x
              ).toLocaleDateString()}<br/>
              <strong>담당 분석관: </strong>${prediction.analystName}<br/>
              <strong>예측 가격: </strong>${prediction.y}<br/>
              <strong>매수 의견: </strong>${prediction.opinion}<br/>
            </div>
          `;
        } else {
          return `<div style="padding: 10px;"><strong>주가: </strong>${data}</div>`;
        }
      },
    },
    markers: {
      size: [0, 5],
      colors: ["#FF4560"],
    },
    colors: ["#00E396", "#FF4560"],
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={[
          { name: "주가", data: stockSeries },
          { name: "분석가 예측", data: analystSeries },
        ]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default AnalystStockChart;
