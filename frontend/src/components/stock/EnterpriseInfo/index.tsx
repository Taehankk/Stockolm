import "./index.css";

const EnterpriseInfo = () => {
  return (
    <div>
      <div className="invest-info-title">
        <span>회사정보</span>
      </div>
      <div className="invest-infomations">
        <div className="invest-infomation">
          <div>회사명</div>
          <div>종목코드</div>
          <div>대표자명</div>
          <div>법인등록번호</div>
        </div>
        <div className="invest-infomation-right">
          <div>1231</div>
          <div>2123</div>
          <div>412343</div>
          <div>2434</div>
        </div>
        <div className="invest-divider"></div>
        <div>
          <div>사업자등록번호</div>
          <div>주소</div>
          <div>홈페이지</div>
          <div>전화번호</div>
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

export default EnterpriseInfo;
