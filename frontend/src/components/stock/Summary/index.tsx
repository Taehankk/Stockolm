import "./index.css";
import { useState, useEffect } from "react";
import { getStockData } from "../../../api/stockAPI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const MockCode: string = "005380";

const Summary = () => {
  const [stockData, setStockData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const data = await getStockData(MockCode);
      setStockData(data.output);
      console.log(data.output);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!stockData) return <div>Loading...</div>;

  return (
    <div className="summary">
      <div className="top-title">
        <div className="title-info">
          <div className="text-large">삼성전자</div>
          <div className="text-small">{MockCode}</div>
          <div>{Math.abs(stockData.stck_prpr).toLocaleString()}</div>
          <div className="flex">
            {stockData.prdy_vrss > 0 ? (
              <>
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="text-red-500" // 양수일 때 빨간색
                />
                <span className="ml-1 text-red-500">
                  {Math.abs(stockData.prdy_vrss).toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="text-blue-500" // 음수일 때 파란색
                />
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
          {/* <div>{stockData.prdy_ctrt}</div> */}
        </div>
        <div>좋아요버튼</div>
      </div>
      <div className="summary-detail">
        <div className="infomation">
          <div>
            <div>전일</div>
            <div>
              {Math.abs(
                stockData.stck_prpr - stockData.prdy_vrss
              ).toLocaleString()}
            </div>
          </div>
          <div>
            <div>시가</div>
            <div>{Math.abs(stockData.stck_prpr).toLocaleString()}</div>
          </div>
        </div>
        <div className="infomation">
          <div>
            <div>고가</div>
            <div>{Math.abs(stockData.stck_hgpr).toLocaleString()}</div>
          </div>
          <div>
            <div>저가</div>
            <div>{Math.abs(stockData.stck_lwpr).toLocaleString()}</div>
          </div>
        </div>
        <div className="infomation">
          <div>
            <div>거래량</div>
            <div>{Math.abs(stockData.acml_vol).toLocaleString()}</div>
          </div>
          <div>
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
