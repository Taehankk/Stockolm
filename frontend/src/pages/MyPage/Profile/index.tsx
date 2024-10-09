import { fetchAnalyzeStock, fetchFavoriteAnalysts, fetchFavoriteStock } from "../../../api/mypageAPI";
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
import Modal from "../../../components/common/Modal";

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
  reliabilityStock: {
    stockName: string,
    stockSize: number,
    stockReliabilitySize: number,
    stockReliabilityValue: number
  }[],
  accuracy: number,
  accuracyStock: {
    stockName: string,
    stockSize: number,
    stockAccuracySize: number,
    stockAccuracyValue: number 
  }[],
  industry: {
    industryName: string,
    industryValue: number
  }[]
}

const Profile: React.FC= () => {

  const { userNickName } = useSelector((state: RootState) => state.user);
  const [role, setRole] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [stockName, setStockName] = useState("");

  useEffect(() => {
    setRole(sessionStorage.getItem("role") || "USER");
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

  const { data: analystStock, error: analystBoardError, isLoading: analystBoardIsLoading } = useQuery<Stock[], Error>({
    queryKey: ["analystStock"], 
    queryFn: fetchAnalyzeStock,
  });

  useEffect(() => {
    console.log(analystStock);
  },[favoriteStock, favoriteAnalysts, analystStock])

  if (stockIsLoading || analystInfoIsLoading || analystIsLoading || analystBoardIsLoading) {
    return <p>Loading...</p>;
  }

  if (analystError || analystInfoError || stockError || analystBoardError) {
    return <p>Error</p>;
  }

  const handleStockClick = (stock: Stock) => {
    if (role === "USER") {
      
      setStockName(stock.stockName);
      setIsModal(true);
      
      console.log("클릭된 주식:", stock);
    } else if (role === "ANALYST") {

      setStockName(stock.stockName);
      setIsModal(true);

      console.log("클릭된 주식:", stock);
    }
  };

  const handleClickClose = () => {
    setIsModal(false);
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
              <DonutChart color="#FFD2D2" value={analystInfo?.reliability}></DonutChart>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1rem]">
              <span className="text-[1.3rem] text-center ">정확도</span>
              <DonutChart color="#FFF3CB" value={analystInfo?.accuracy}></DonutChart>
            </div>
              <div className="flex flex-col items-center gap-[0.4rem] ml-[1rem]">
                <span className="text-[1.3rem]">산업군</span>
                <div className="flex flex-col mt-[0.5rem]">
                  {analystInfo?.industry?.[0] && (
                    <BarChart color="#FFABAB" value={analystInfo.industry[0].industryValue} children={analystInfo.industry[0].industryName.split(" ")[1]} />
                  )}
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
        }

        <div className="flex flex-col items-center w-full mt-[10rem] h-[200px]">
            <div className="flex self-start h-[2rem] mb-[2rem]">
              <img src={category} className="flex h-[1.7rem] self-end"></img>
              <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">{role === "USER" ? "관심 종목" : "분석 종목"}</div>
            </div>
            {role === "USER" ? <StockInfoList dataProps={favoriteStock || [] } onStockClick={handleStockClick}/> :
            <StockInfoList dataProps={analystStock || [] } onStockClick={handleStockClick}/>}
            {isModal && <Modal onCloseClick={handleClickClose} stockNameProps={stockName}></Modal>}
        </div>
    </div>
  );
};

export default Profile;
