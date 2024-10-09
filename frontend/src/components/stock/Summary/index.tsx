import { useState, useEffect } from "react";
import {
  getStockData,
  getFollowStatus,
  toggleFollowAPI,
} from "../../../api/stockAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StockLikeON from "../../../assets/StockLikeON.svg";
import StockLikeOFF from "../../../assets/StockLikeOFF.svg";

interface SummaryProps {
  searchCode: string;
  searchTerm: string;
}

interface StockData {
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  stckHgpr: number;
  stckLwpr: number;
  acmlVol: number;
  acmlTrPbmn: number;
}

const Summary = ({ searchCode, searchTerm }: SummaryProps) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const getToken = () => sessionStorage.getItem("access_token");

  const fetchData = async () => {
    try {
      const data = await getStockData(searchCode);
      setStockData(data[0]);
    } catch (error) {
      console.error("주식 요약 정보를 불러오지 못함", error);
    }
  };

  const fetchFollowStatus = async () => {
    try {
      const followStatus = await getFollowStatus(searchTerm);
      setIsFollowed(followStatus);
    } catch (error) {
      console.error("관심 종목 상태를 가져오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFollowStatus();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [searchCode, searchTerm]);

  const toggleFollow = async () => {
    try {
      await toggleFollowAPI(searchTerm);
      setIsFollowed(!isFollowed); // 상태 업데이트
    } catch (error) {
      console.error("관심 종목 상태를 변경하지 못했습니다.", error);
    }
  };

  if (!stockData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div className="flex items-center h-12 border-b pt-3 pb-2 mb-2">
        <div className="flex items-baseline gap-5 w-4/5">
          <div className="text-2xl">{searchTerm}</div>
          <div className="text-sm">{searchCode}</div>
          <div>{Math.abs(stockData.stckPrpr).toLocaleString()}</div>
          <div className="flex">
            {stockData.prdyVrss > 0 ? (
              <>
                <FontAwesomeIcon icon={faCaretUp} className="text-red-500" />
                <span className="ml-1 text-red-500">
                  {Math.abs(stockData.prdyVrss).toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCaretDown} className="text-blue-500" />
                <span className="ml-1 text-blue-500">
                  {Math.abs(stockData.prdyVrss).toLocaleString()}
                </span>
              </>
            )}
          </div>
          <div>
            {stockData.prdyVrss > 0 ? (
              <span className="ml-1 text-red-500">
                {Math.abs(stockData.prdyCtrt).toFixed(2) + "%"}
              </span>
            ) : (
              <span className="ml-1 text-blue-500">
                {Math.abs(stockData.prdyCtrt).toFixed(2) + "%"}
              </span>
            )}
          </div>
        </div>
        {getToken() && (
          <img
            src={isFollowed ? StockLikeON : StockLikeOFF}
            alt={isFollowed ? "관심 종목 설정됨" : "관심 종목 아님"}
            onClick={toggleFollow}
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="flex w-4/5 flex-row gap-8 justify-between pt-3">
        <div className="flex flex-col">
          <div>전일</div>
          <div>
            {Math.abs(stockData.stckPrpr - stockData.prdyVrss).toLocaleString()}
          </div>
          <div>시가</div>
          <div>{Math.abs(stockData.stckPrpr).toLocaleString()}</div>
        </div>
        <div className="flex flex-col">
          <div>고가</div>
          <div>{Math.abs(stockData.stckHgpr).toLocaleString()}</div>
          <div>저가</div>
          <div>{Math.abs(stockData.stckLwpr).toLocaleString()}</div>
        </div>
        <div className="flex flex-col">
          <div>거래량</div>
          <div>{Math.abs(stockData.acmlVol).toLocaleString()}</div>
          <div>거래대금</div>
          <div>
            {Math.round(stockData.acmlTrPbmn / 1_000_000).toLocaleString()} 백만
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
