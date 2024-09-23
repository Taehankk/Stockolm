import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const mockData = [
  {
    x: new Date(2024, 8, 20),
    y: [70000, 71000, 69000, 70500],
  },
  {
    x: new Date(2024, 8, 19),
    y: [69000, 70500, 68500, 70000],
  },
  {
    x: new Date(2024, 8, 18),
    y: [68000, 69500, 67500, 69000],
  },
  {
    x: new Date(2024, 8, 17),
    y: [67000, 68000, 66500, 67500],
  },
  {
    x: new Date(2024, 8, 16),
    y: [66000, 67500, 65500, 67000],
  },
];

const StockChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(mockData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="">
      <div className="flex">
        <div className="m-1 py-1 px-5 text-medium text-white rounded-lg bg-PrimaryRed">
          기본
        </div>
        <div className="m-1 py-1 px-5 text-medium text-white rounded-lg bg-PrimaryBlue">
          분석
        </div>
      </div>
      <div className="w-[100%] ">
        <ReactApexChart
          options={options}
          series={[{ data: data }]}
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
