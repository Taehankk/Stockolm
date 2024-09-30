  import ReactApexChart from "react-apexcharts";

  interface DonutChartProps {
    color: string;
    content?: string | null;
    value?: number;
    w?: string;
    h?: string;
    textSize?: string;
    textHeight?: string;
  }

  const DonutChart = ({
    color = "#ffd400",
    value,
    content = null,
    w = "13rem",
    h = "13rem",
    textSize = "1.125rem",
    textHeight = "80%",
  }: DonutChartProps) => {

    const roundedValue = value ? Math.round(value) : 100;

    const options = {
      chart: {
        type: 'donut' as const,
      },
      series: [100-roundedValue, roundedValue],
      labels: ['',''], 
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
      stroke: {
        width: 0,
      },
      tooltip: { enabled: false },
      dataLabels: { enabled: false },
      legend: { show: false },
    };

    return (
        <div className={`w-[${w}] h-[${h}] flex relative pointer-events-none`} style={{ width: w, height: h }}>
          <ReactApexChart options={options} series={options.series} type="donut" width="100%" height="100%"/>
          <div className={`w-full h-[${textHeight}] absolute inset-0 flex flex-col gap-[0.5rem] justify-center items-center text-[${textSize}]`}>
            {content ? <span>{content}</span> : <></>}
            {value !== 100 ? <span className="pl-[0.3rem]">{roundedValue}%</span> : <></>}
          </div>
        </div>
    );
  };

  export default DonutChart;