import BarChart from "../../../components/elements/BarChart";
import DonutChart from "../../../components/elements/DonutChart";

const Statistic = () => {
  return(
    <div className="w-full">
      <div className="w-full text-[2rem] mb-[2rem] border-b-black border-b-[0.0625rem]">통계</div>
      <div className="flex flex-col gap-[1.5rem] mx-[2rem]">

        <div className="flex gap-[3rem] w-full h-[11rem]">
          <DonutChart color="#FFF5D2" value={82} content="신뢰도"></DonutChart>
          <div className="flex flex-col mt-[-1.5rem]">
            <BarChart color="#FFE2B1" value={85} children="삼성전자"></BarChart>
            <BarChart color="#FFE2B1" value={74} children="LG전자"></BarChart>
            <BarChart color="#FFE2B1" value={71} children="현대오토에버"></BarChart>
          </div>
        </div>

        <div className="flex gap-[3rem] w-full justify-end h-[11rem] ml-[3rem]">
          <div className="flex flex-col mt-[-1.5rem]">
            <BarChart color="#61A9FB" value={80} children="삼성전자"></BarChart>
            <BarChart color="#61A9FB" value={72} children="LG전자"></BarChart>
            <BarChart color="#61A9FB" value={60} children="현대오토에버"></BarChart>
          </div>
          <DonutChart color="#61A9FB" value={70} content="정확도"></DonutChart>
        </div>

        <div className="flex gap-[3rem] w-full h-[11rem]">
          <DonutChart color="#FFABAB" value={100} content="산업군"></DonutChart>
          <div className="flex flex-col mt-[-1.5rem]">
            <BarChart color="#FFABAB" value={60} children="삼성전자"></BarChart>
            <BarChart color="#FFABAB" value={20} children="LG전자"></BarChart>
            <BarChart color="#FFABAB" value={20} children="현대오토에버"></BarChart>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default Statistic;
