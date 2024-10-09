import { useParams } from "react-router-dom";
import BarChart from "../../../components/elements/BarChart";
import DonutChart from "../../../components/elements/DonutChart";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalystInfo } from "../../../api/analystAPI";
import { useEffect } from "react";

import RedUp from "/src/assets/RedUp.webp"

interface AnalystInfo {
  boardSize: number,
  follower: number,
  totalAnalystRank: number,
  reliability: number,
  reliabilityStock: {
    stockName: string;
    stockSize: number;
    stockReliabilitySize: number;
    stockReliabilityValue: number;
  }[];
  accuracy: number
  accuracyStock: {
    stockName: string;
    stockSize: number;
    stockReliabilitySize: number;
    stockReliabilityValue: number;
  }[];
  industry: {
    industryName: string;
    industryValue: number;
  }[];
}

const Statistic: React.FC = () => {

  const { nickname } = useParams<{ nickname: string }>();

  const { data: analystInfo, error: analystInfoError, isLoading: analystInfoIsLoading } = useQuery<AnalystInfo, Error>({
    queryKey: ["analystInfo", nickname], 
    queryFn: ({ queryKey }) => fetchAnalystInfo(queryKey[1] as string)
  });

  useEffect(() => {
    console.log(analystInfo)
  }, [analystInfo])

  useEffect(() => {
  }, [nickname]);

  if (analystInfoIsLoading) {
    return <p>Loading...</p>;
  }

  if (analystInfoError) {
    return <p>Error</p>;
  }

  return(
    <div className="w-full">
      <div className="w-full text-[2rem] mb-[2rem] border-b-black border-b-[0.0625rem]">통계</div>
      <div className="flex flex-col gap-[1.5rem] mx-[2rem]">
      <div className="absolute right-[10rem] top-[13.5rem]">
            <img
              src={RedUp}
              alt={`투자상승이`}
              className="size-[4rem] mt-3 rounded-full"
            />
            <div className="tooltip absolute left-1/2 transform -translate-x-1/3 mt-2  bg-gray-800 text-white text-lg rounded-lg py-2 px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span>신뢰도 : 종목 별 매수, 매도 포지션 예상 적중</span>
              <br />
              <span>정확도 : 종목 별 목표 주가에 ±5% 이내 적중</span>
              <br />
              <span>산업군 : 산업군 별 매수, 매도 포지션 예상 적중</span>
            </div>
          </div>

        <div className="flex gap-[3rem] w-full h-[11rem]">
          <DonutChart color="#FFF5D2" value={analystInfo?.reliability ?? 0} content="신뢰도"></DonutChart>
          <div className="flex flex-col" style={{marginBottom: '8rem'}}>
            {analystInfo?.reliabilityStock?.[0] ? (
              <BarChart color="#FFE2B1" value={analystInfo.reliabilityStock[1].stockReliabilityValue} children={analystInfo.reliabilityStock[0].stockName} />
            ) : <BarChart color="#FFE2B1" value={0} children={"분석없음"} />}
            {analystInfo?.reliabilityStock?.[1] ? (
              <BarChart color="#FFE2B1" value={analystInfo.reliabilityStock[1].stockReliabilityValue} children={analystInfo.reliabilityStock[1].stockName} />
            ) : <BarChart color="#FFE2B1" value={0} children={"분석없음"} />}
            {analystInfo?.reliabilityStock?.[2] ? (
              <BarChart color="#FFE2B1" value={analystInfo.reliabilityStock[2].stockReliabilityValue} children={analystInfo.reliabilityStock[2].stockName} />
            ) : <BarChart color="#FFE2B1" value={0} children={"분석없음"} />
            }
          </div>
        </div>

        <div className="flex gap-[3rem] w-full justify-end h-[11rem] ml-[3rem]">
          <div className="flex flex-col" style={{marginBottom: '8rem'}}>
            {analystInfo?.accuracyStock?.[0] ? (
              <BarChart color="#61A9FB" value={analystInfo.accuracyStock[1].stockReliabilityValue} children={analystInfo.accuracyStock[0].stockName} />
            ) : <BarChart color="#61A9FB" value={0} children={"분석없음"} />}
            {analystInfo?.accuracyStock?.[1] ? (
              <BarChart color="#61A9FB" value={analystInfo.accuracyStock[1].stockReliabilityValue} children={analystInfo.accuracyStock[1].stockName} />
            ) : <BarChart color="#61A9FB" value={0} children={"분석없음"} />}
            {analystInfo?.accuracyStock?.[2] ? (
              <BarChart color="#61A9FB" value={analystInfo.accuracyStock[2].stockReliabilityValue} children={analystInfo.accuracyStock[2].stockName} />
            ) : <BarChart color="#61A9FB" value={0} children={"분석없음"} />}
          </div>
          <DonutChart color="#61A9FB" value={analystInfo?.accuracy} content="정확도"></DonutChart>
        </div>

        <div className="flex gap-[3rem] w-full h-[11rem]" style={{marginBottom: '8rem'}}>
          <DonutChart color="#FFABAB" value={101} content="산업군"></DonutChart>
          <div className="flex flex-col">
            {analystInfo?.industry?.[0] ? (
              <BarChart color="#FFABAB" value={analystInfo.industry[0].industryValue} children={analystInfo.industry[0].industryName.split(" ")[1]} />
            ) : <BarChart color="#FFABAB" value={0} children={"분석없음"} />}
            {analystInfo?.industry?.[1] ? (
              <BarChart color="#FFABAB" value={analystInfo.industry[1].industryValue} children={analystInfo.industry[1].industryName.split(" ")[1]} />
            ) : <BarChart color="#FFABAB" value={0} children={"분석없음"} />}
            {analystInfo?.industry?.[2] ? (
              <BarChart color="#FFABAB" value={analystInfo.industry[2].industryValue} children={analystInfo.industry[2].industryName.split(" ")[1]} />
            ) : <BarChart color="#FFABAB" value={0} children={"분석없음"} />}
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default Statistic;
