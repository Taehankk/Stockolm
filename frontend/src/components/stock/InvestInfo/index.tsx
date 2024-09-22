import "./index.css";

const InvestInfo = () => {
  return (
    <div>
      <div className="invest-info-title">
        <span>투자정보</span>
      </div>
      <div className="invest-infomations">
        <div className="invest-infomation">
          <div>시가총액</div>
          <div>시가총액순위</div>
          <div>상장주식수</div>
          <div>액면가 | 매매단위</div>
        </div>
        <div className="invest-infomation-right">
          <div>1231</div>
          <div>2123</div>
          <div>412343</div>
          <div>2434</div>
        </div>
        <div className="invest-divider"></div>
        <div>
          <div>PER | EPS</div>
          <div>추정 PER | EPS</div>
          <div>PBR | BPS</div>
          <div>배당수익률</div>
        </div>
        <div className="invest-infomation-right">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </div>
  );
};

export default InvestInfo;
