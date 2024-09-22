import BasicLayout from "../../layouts/BasicLayout";
import "./index.css";
import Summary from "../../components/stock/Summary";
import Button from "../../components/elements/Button";
import InvestInfo from "../../components/stock/InvestInfo";
import EnterpriseInfo from "../../components/stock/EnterpriseInfo";

const StockPage = () => {
  return (
    <BasicLayout>
      <div className="top">
        <div className="chart-info">
          <Summary></Summary>
        </div>
        <div className="navigator">
          <Button size="medium">종목게시판</Button>
          <Button size="medium">종목채팅방</Button>
        </div>
      </div>
      <div className="middle">
        <div className="chart">차트그림 가로:70% 세로:35vh</div>
        <div>Best분석가 30%</div>
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
