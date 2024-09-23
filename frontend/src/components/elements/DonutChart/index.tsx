import ReactApexChart from "react-apexcharts";

interface DonutChartProps {
  color: string;
  content?: string;
  value: number;
}

const DonutChart = ({
  color = "#ffd400",
  value = 99,
  content = undefined,
}: DonutChartProps) => {

  const roundedValue = Math.round(value);

  const options = {
    chart: {
      type: 'donut' as const,
    },
    series: [100-roundedValue, roundedValue],
    labels: ['', ''], 
    colors: ['#ffffff', color], 
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  return (
    <div className="w-[200px] h-[200px] flex relative pointer-events-none">
      <ReactApexChart options={options} series={options.series} type="donut" height="100%" width="100%" />
      <div className="w-full h-[80%] absolute flex flex-col gap-[10px] justify-center items-center text-[18px]">
        {content ? <span>{content}</span> : <></>}
        <span className="pl-[7px]">{roundedValue}%</span>
      </div>
    </div>
  );
};

export default DonutChart;