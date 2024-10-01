import "./index.css";
import { StockInfo } from "../../../types/stock";

interface EnterpriseInfoProps {
  stockInfo: StockInfo;
}

const EnterpriseInfo = ({ stockInfo }: EnterpriseInfoProps) => {
  return (
    <div>
      <div className="invest-info-title">
        <span>회사정보</span>
      </div>
      <div className="invest-infomations">
        <div className="invest-infomation">
          <div>회사명</div>
          <div>대표자명</div>
          <div>종목코드</div>
          <div>기업고유코드</div>
        </div>
        <div className="invest-infomation-right">
          <div>{stockInfo.corpName}</div>
          <div>{stockInfo.ceoName}</div>
          <div>{stockInfo.stockCode}</div>
          <div>{stockInfo.corpCode}</div>
        </div>
        <div className="invest-divider"></div>
        <div>
          <div>주소</div>
          <div>홈페이지</div>
          <div>전화번호</div>
          <div>팩스번호</div>
        </div>
        <div className="invest-infomation-right">
          <div>{stockInfo.address}</div>
          <div>{stockInfo.url}</div>
          <div>{stockInfo.phoneNumber}</div>
          <div>{stockInfo.faxNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseInfo;
