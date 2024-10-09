import BasicLayout from "../../layouts/BasicLayout";
import "./index.css";
import Summary from "../../components/stock/Summary";
import Button from "../../components/elements/Button";
import InvestInfo from "../../components/stock/InvestInfo";
import EnterpriseInfo from "../../components/stock/EnterpriseInfo";
import BestAnalystList from "../../components/stock/bestAnalyst/BestAnalystList";
import StockChart from "../../components/stock/StockChart";
import RedUp from "../../assets/RedUp.webp";

import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchStockData,
  fetchStockInfo,
  fetchBestAnalysts,
} from "../../slices/stockSlice";

const StockPage = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useSelector((state: RootState) => state.stock.searchTerm);
  const searchCode = useSelector((state: RootState) => state.stock.searchCode);
  const stockId = useSelector((state: RootState) => state.stock.stockId);
  const stockData = useSelector((state: RootState) => state.stock.stockData);
  const stockInfo = useSelector((state: RootState) => state.stock.stockInfo);
  const isLoading = useSelector((state: RootState) => state.stock.loading);
  const error = useSelector((state: RootState) => state.stock.error);

  const nav = useNavigate();
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchStockData(searchTerm));
    }
    if (searchCode) {
      dispatch(fetchStockInfo(searchCode));
    }
    if (stockId) {
      dispatch(fetchBestAnalysts(stockId));
    }
  }, [dispatch, searchTerm, searchCode, stockId]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      setAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock data</div>;

  const handleCommunityButtonClick = () => {
    if (searchTerm) {
      nav(`/community/report?stockName=${encodeURIComponent(searchTerm)}`);
    }
  };
  const handleCommunityBoardButtonClick = () => {
    if (searchTerm) {
      nav(`/community/board?stockName=${encodeURIComponent(searchTerm)}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <BasicLayout>
      <div className="top">
        <div className="chart-info">
          <Summary searchCode={searchCode} searchTerm={searchTerm}></Summary>
        </div>
        <div className="right-nav">
          <div className="relative">
            <img
              src={RedUp}
              alt={`투자상승이`}
              className="size-[10rem] ml-[3rem] mt-3 rounded-full"
            />
            <div className="tooltip absolute left-1/2 transform -translate-x-1/3 mt-2  bg-gray-800 text-white text-lg rounded-lg py-2 px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span>분석 탭을 이용해보세요!.</span>
              <br></br>
              <span>
                최고의 신뢰도를 가진 애널리스트의 분석데이터를 확인하세요!
              </span>
            </div>
          </div>
          <div className="navigator">
            <Button
              size="medium"
              className="bg-red-400"
              onClick={handleCommunityButtonClick}
            >
              종목게시판
            </Button>
            <Button
              size="medium"
              className="bg-red-400"
              onClick={handleCommunityBoardButtonClick}
            >
              자유게시판
            </Button>
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="chart">
          <StockChart stockData={stockData}></StockChart>
        </div>
        <div>
          <BestAnalystList></BestAnalystList>
        </div>
      </div>
      <div className="bottom">
        <div className="invest-infos">
          {stockInfo ? (
            <InvestInfo stockInfo={stockInfo}></InvestInfo>
          ) : (
            <div className="text-center text-gray-500">
              투자관련 정보가 없습니다
            </div>
          )}
        </div>
        <div className="enterprise-infos">
          {stockInfo ? (
            <EnterpriseInfo stockInfo={stockInfo}></EnterpriseInfo>
          ) : (
            <div className="text-center text-gray-500">
              회사관련 정보가 없습니다
            </div>
          )}
        </div>
        <button
          onClick={atBottom ? scrollToTop : scrollToBottom}
          className="stock-scroll-botton"
        >
          {atBottom ? "▲ 최상단으로" : "▼ 투자정보보기"}
        </button>
      </div>
    </BasicLayout>
  );
};

export default StockPage;
