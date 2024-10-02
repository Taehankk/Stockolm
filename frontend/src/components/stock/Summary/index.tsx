import { useState, useEffect } from "react";
import { getStockData, toggleFollowAPI } from "../../../api/stockAPI";

import { RootState } from "../../../store";
import { updateFollowStatus } from "../../../slices/stockSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StockLikeON from "../../../assets/StockLikeON.svg";
import StockLikeOFF from "../../../assets/StockLikeOFF.svg";
import { useDispatch, useSelector } from "react-redux";

interface SummaryProps {
  searchCode: string;
  searchTerm: string;
}

interface StockData {
  stck_prpr: number;
  prdy_vrss: number;
  prdy_ctrt: number;
  stck_hgpr: number;
  stck_lwpr: number;
  acml_vol: number;
  acml_tr_pbmn: number;
}

const Summary = ({ searchCode, searchTerm }: SummaryProps) => {
  const dispatch = useDispatch();

  const { isFollow } = useSelector((state: RootState) => state.stock);
  const [stockData, setStockData] = useState<StockData | null>(null);

  const fetchData = async () => {
    try {
      const data = await getStockData(searchCode);
      setStockData(data.output);
    } catch (error) {
      console.error("주식 요약 정보를 불러오지 못함", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [searchCode]);

  if (!stockData) return <div>Loading...</div>;

  const toggleFollow = async () => {
    try {
      console.log(searchTerm);
      await toggleFollowAPI(searchTerm);
      dispatch(updateFollowStatus(!isFollow));
    } catch (error) {
      console.error("관심 종목 상태를 변경하지 못했습니다.", error);
    }
    console.log(isFollow);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center h-12 border-b pt-3 pb-2 mb-2">
        {/* 상단: 
        종목명 : searchTerm 
        종목코드 : searchCode
        가격:stck_prpr 
        등락 가격:stockData.prdy_vrss 
        등락 률:stockData.prdy_ctrt
        */}
        <div className="flex items-baseline gap-5 w-4/5">
          <div className="text-2xl">{searchTerm}</div>
          <div className="text-sm">{searchCode}</div>
          <div>{Math.abs(stockData.stck_prpr).toLocaleString()}</div>
          <div className="flex">
            {stockData.prdy_vrss > 0 ? (
              <>
                <FontAwesomeIcon icon={faCaretUp} className="text-red-500" />
                <span className="ml-1 text-red-500">
                  {Math.abs(stockData.prdy_vrss).toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCaretDown} className="text-blue-500" />
                <span className="ml-1 text-blue-500">
                  {Math.abs(stockData.prdy_vrss).toLocaleString()}
                </span>
              </>
            )}
          </div>
          <div>
            {stockData.prdy_vrss > 0 ? (
              <span className="ml-1 text-red-500">
                {Math.abs(stockData.prdy_ctrt) + "%"}
              </span>
            ) : (
              <span className="ml-1 text-blue-500">
                {Math.abs(stockData.prdy_ctrt) + "%"}
              </span>
            )}
          </div>
        </div>
        <img
          src={isFollow ? StockLikeON : StockLikeOFF}
          alt={isFollow ? "관심 종목 설정됨" : "관심 종목 아님"}
          onClick={toggleFollow}
          className="cursor-pointer"
        />
      </div>
      {/* 중단 : 구체적인 수치 */}
      <div className="flex w-4/5 flex-row gap-8 justify-between pt-3">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div>전일</div>
            <div>
              {Math.abs(
                stockData.stck_prpr - stockData.prdy_vrss
              ).toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col">
            <div>시가</div>
            <div>{Math.abs(stockData.stck_prpr).toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div>고가</div>
            <div>{Math.abs(stockData.stck_hgpr).toLocaleString()}</div>
          </div>
          <div className="flex flex-col">
            <div>저가</div>
            <div>{Math.abs(stockData.stck_lwpr).toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div>거래량</div>
            <div>{Math.abs(stockData.acml_vol).toLocaleString()}</div>
          </div>
          <div className="flex flex-col">
            <div>거래대금</div>
            <div>
              {Math.round(stockData.acml_tr_pbmn / 1_000_000).toLocaleString()}{" "}
              백만
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
