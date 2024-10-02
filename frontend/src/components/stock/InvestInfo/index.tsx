import "./index.css";
import { StockInfo } from "../../../types/stock";

interface InvestInfoProps {
  stockInfo: StockInfo;
}

const InvestInfo = ({ stockInfo }: InvestInfoProps) => {
  return (
    <div>
      <div className="invest-info-title">
        <span>투자정보</span>
      </div>
      <div className="invest-infomations">
        <div className="invest-infomation">
          <div>EPS</div>
          <div>BPS</div>
          <div>ROE</div>
          <div>영업이익률</div>
        </div>
        <div className="invest-infomation-right">
          <div>{stockInfo.eps}</div>
          <div>{stockInfo.bps}</div>
          <div>{stockInfo.roeVal}</div>
          <div>{stockInfo.bsopPrfiInrt}</div>
        </div>
        <div className="invest-divider"></div>
        <div>
          <div>매출액증가율</div>
          <div>순이익증가율</div>
          <div>자본금</div>
          <div>액면가</div>
        </div>
        <div className="invest-infomation-right">
          <div>{stockInfo.grs}</div>
          <div>{stockInfo.ntinInrt}</div>
          <div>{stockInfo.cpta}</div>
          <div>{stockInfo.papr}</div>
        </div>
      </div>
    </div>
  );
};

export default InvestInfo;
