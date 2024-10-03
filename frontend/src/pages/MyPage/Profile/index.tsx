  import { fetchAnalyzeStock, fetchFavoriteAnalysts, fetchFavoriteBoard, fetchFavoriteStock } from "../../../api/mypageAPI";
  import { useQuery } from "@tanstack/react-query";

  import person from "/src/assets/person.svg"
  import category from "/src/assets/category.svg"
  import StockInfoList from "../../../components/common/StockInfoList";
  import FavoriteCardList from "../../../components/mypage/FavoriteCardList";
  import DonutChart from "../../../components/elements/DonutChart";
  import BarChart from "../../../components/elements/BarChart";
  import { useEffect, useState } from "react";
  import { fetchAnalystInfo } from "../../../api/analystAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

  interface Stock {
    stockCode: string, 
    stockName: string,
  }

  interface Analyst {
    userName: string;
    userNickName: string;
    userImagePath: string;
    accuracy: number;
    reliability: number;
    totalAnalystRanking: number;
  }

  interface AnalystInfo {
    boardSize: number,
    follower: number,
    totalAnalystRank: number,
    reliability: number,
    reliabilityStock: [
      {
        stockName: string,
        stockSize: number,
        stockReliabilitySize: number
        stockReliabilityValue: number
      },
    ],
    accuracy: number
    accuracyStock: [
      {
        stockName: string,
        stockSize: number,
        stockAccuracySize: number
        stockAccuracyValue: number 
      },
    ],	
    industry: [
      {
        industryName: string,
        industryValue: number
      },
    ]
  }

  const Profile: React.FC= () => {

    const { userNickName } = useSelector((state: RootState) => state.user);
    const [role, setRole] = useState("");

    useEffect(() => {
      setRole(sessionStorage.getItem("ROLE") || "USER");
    },[])

    const { data: favoriteStock, error: stockError, isLoading: stockIsLoading } = useQuery<Stock[], Error>({
      queryKey: ["favoriteStock"],
      queryFn: fetchFavoriteStock,
    });

    const { data: favoriteAnalysts, error: analystError, isLoading: analystIsLoading } = useQuery<Analyst[], Error>({
      queryKey: ["favoriteAnalysts"],
      queryFn: fetchFavoriteAnalysts,
    });

    const { data: analystInfo, error: analystInfoError, isLoading: analystInfoIsLoading } = useQuery<AnalystInfo, Error>({
      queryKey: ["analystInfo", userNickName], 
      queryFn: ({ queryKey }) => fetchAnalystInfo(queryKey[1] as string)
    });

    useEffect(() => {
      console.log(favoriteStock);
      console.log(favoriteAnalysts);
    },[favoriteStock, favoriteAnalysts])

    if (analystInfoIsLoading || !analystInfo) {
      return <p>Loading analyst information...</p>;
    }

    return (
      <div className="mt-[-5rem] w-full h-[100vh]">
          {role === "USER" ? <div className="w-full h-[200px] mb-[4rem]">
              <div className="h-[2rem] flex mb-[2rem]">
                <img src={person} className="flex h-[1.7rem] self-end"></img>
                <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">관심 분석가</div>
              </div>
              <FavoriteCardList dataProps={favoriteAnalysts || []} />
          </div> :
          <div className="w-full h-[200px] mb-[4rem]">
          <div className="h-[2rem] flex mb-[2rem]">
            <img src={person} className="flex h-[1.7rem] self-end"></img>
            <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">내 통계</div>
          </div>
          <div className="flex w-full gap-[4rem]">
              <div className="flex flex-col justify-center items-center gap-[1rem]">
                <span className="text-[1.3rem]">신뢰도</span>
                <DonutChart color="#FFD2D2" value={analystInfo.reliability}></DonutChart>
              </div>
              <div className="flex flex-col justify-center items-center gap-[1rem]">
                <span className="text-[1.3rem] text-center ">정확도</span>
                <DonutChart color="#FFF3CB" value={analystInfo.accuracy}></DonutChart>
              </div>
              <div className="flex flex-col items-center gap-[0.4rem] ml-[1rem]">
                <span className="text-[1.3rem]">산업군</span>
                <BarChart color="#FFABAB" value={60} children="반도체"></BarChart>
                <BarChart color="#FFABAB" value={20} children="IT"></BarChart>
                <BarChart color="#FFABAB" value={20} children="자동차"></BarChart>
              </div>
            </div>
          </div> 
          }

          <div className="flex flex-col items-center w-full mt-[10rem] h-[200px]">
              <div className="flex self-start h-[2rem] mb-[2rem]">
                <img src={category} className="flex h-[1.7rem] self-end"></img>
                <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">{role === "USER" ? "관심 종목" : "분석 종목"}</div>
              </div>
              <StockInfoList dataProps={favoriteStock || []} />
          </div>
      </div>
    );
  };

  export default Profile;
