import BasicLayout from "../../layouts/BasicLayout";
import "./index.css";
import Summary from "../../components/stock/Summary";
import Button from "../../components/elements/Button";
import InvestInfo from "../../components/stock/InvestInfo";
import EnterpriseInfo from "../../components/stock/EnterpriseInfo";
import BestAnalystList from "../../components/stock/bestAnalyst/BestAnalystList";
import StockChart from "../../components/stock/StockChart";

import { useEffect } from "react";
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock data</div>;

  const handleCommunityButtonClick = () => {
    if (searchTerm) {
      nav(`/community/report?stockName=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <BasicLayout>
      <div className="top">
        <div className="chart-info">
          <Summary searchCode={searchCode} searchTerm={searchTerm}></Summary>
        </div>
        <div className="navigator">
          <Button size="medium" onClick={handleCommunityButtonClick}>
            종목게시판
          </Button>
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
        {stockInfo && (
          <>
            <div className="invest-infos">
              <InvestInfo stockInfo={stockInfo}></InvestInfo>
            </div>
            <div className="divider">|</div>
            <div className="enterprise-infos">
              <EnterpriseInfo stockInfo={stockInfo}></EnterpriseInfo>
            </div>
          </>
        )}
      </div>
    </BasicLayout>
  );
};

export default StockPage;
