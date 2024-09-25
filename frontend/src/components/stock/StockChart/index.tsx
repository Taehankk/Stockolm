import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const StockChart = ({ stockData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("주식정보 전달 된 값 (차트컴포넌트)", stockData);
    if (stockData && stockData.length > 0) {
      console.log(stockData[0].stockDate);
      const transformedData = stockData.map((item) => ({
        // x: ` ${item.stockDate.slice(4, 6)}월 ${item.stockDate.slice(6)}일`,
        x: `${item.stockDate.slice(0, 4)}년 ${item.stockDate.slice(4, 6)}월 ${item.stockDate.slice(6)}일`,
        // x: new Date(
        //   `${item.stockDate.slice(0, 4)}-${item.stockDate.slice(4, 6)}-${item.stockDate.slice(6)}`
        // ),
        y: [
          Number(item.stockStartValue),
          Number(item.stockHigh),
          Number(item.stockLow),
          Number(item.stockEndValue),
        ],
      }));
      setData(transformedData);
      console.log("차트에 맞게 가공된 데이터", transformedData);
    }
  }, [stockData]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    xaxis: {
      type: "category",
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
        <div className="mx-1 py-1 px-6 text-medium text-white rounded-lg bg-PrimaryBlue">
          일
        </div>
        <div className="mr-1 py-1 px-6 text-medium text-white rounded-lg bg-LightBlue">
          주
        </div>
        <div className="py-1 px-6 text-medium text-white rounded-lg bg-LightBlue">
          월
        </div>
      </div>
    </div>
  );
};

export default StockChart;
