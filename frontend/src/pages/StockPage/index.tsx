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
import { fetchStockData } from "../../slices/stockSlice";

const StockPage = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useSelector((state: RootState) => state.stock.searchTerm);
  const searchCode = useSelector((state: RootState) => state.stock.searchCode);
  const stockData = useSelector((state: RootState) => state.stock.stockData);
  const isLoading = useSelector((state: RootState) => state.stock.loading);
  const error = useSelector((state: RootState) => state.stock.error);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchStockData(searchTerm));
    }
  }, [dispatch, searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stock data</div>;

  return (
    <BasicLayout>
      <div className="top">
        <div className="chart-info">
          <Summary searchCode={searchCode} searchTerm={searchTerm}></Summary>
        </div>
        <div className="navigator">
          <Button size="medium">종목게시판</Button>
          <Button size="medium">종목채팅방</Button>
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
        <div className="infos">
          <InvestInfo></InvestInfo>
        </div>
        <div className="divider">|</div>
        <div className="infos">
          <EnterpriseInfo></EnterpriseInfo>
        </div>
      </div>
    </BasicLayout>
  );
};

export default StockPage;
