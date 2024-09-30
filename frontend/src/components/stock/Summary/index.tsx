import { useState, useEffect } from "react";
import { getStockData } from "../../../api/stockAPI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

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
        <div>좋아요버튼</div>
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
