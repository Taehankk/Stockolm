import ReactApexChart from "react-apexcharts";

interface BarChartProps {
  value: number;
  color: string;
  children?: string;
}

const BarChart = ({
    value = 40,
    color="#ffd400",
    children ="반도체",
}: BarChartProps) => {
  const validValue = Math.round(value) || 0;

  const optionsLight = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '200%',
        borderRadius: 13,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      max: 100,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: { enabled: false },
    fill: {
      opacity: 0.3,
    },
    colors: [color],
    legend: { show: false },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
  };

  const optionsDark = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '200%',
        borderRadius: 13,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      max: 100,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: { enabled: false },
    fill: {
      opacity: 1,
    },
    colors: [color],
    legend: { show: false },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
  };

  const seriesLight = [
    {
      data: [100],
    },
  ];

  const seriesDark = [
    {
      data: [validValue],
    },
  ];

  return (
    <div className="flex justify-between w-[400px]">
      <span className="pt-[27px] pr-[1rem]">{children}</span>
      <div className="relative w-[300px] justify-center items-center">
        <div className="absolute w-full top-0 left-0 z-1">
            <ReactApexChart options={optionsLight} series={seriesLight} type="bar" height={60} />
        </div>
        <div className="absolute top-0 left-0 w-full z-2">
            <ReactApexChart options={optionsDark} series={seriesDark} type="bar" height={60} />
        </div>
        {value !== 0 ? <span className="absolute top-[28px] left-[140px] text-[14px]">{value}%</span>
        : <span></span>}
        
      </div>
    </div>
  );
};

export default BarChart;
