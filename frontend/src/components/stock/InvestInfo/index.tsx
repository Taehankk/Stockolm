import { StockInfo } from "../../../types/stock";

// 소숫점 2자리까지 포맷
const formatPercentage = (value: string) => {
  return `${parseFloat(value).toFixed(2)}%`;
};

// 자본금 백만 단위 포맷
const formatMillion = (value: string) => {
  const num = parseFloat(value) / 1000000; // 백만 단위로 변환
  return (
    new Intl.NumberFormat("ko-KR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num) + " 백만"
  );
};

interface InvestInfoProps {
  stockInfo: StockInfo;
}

const InvestInfo = ({ stockInfo }: InvestInfoProps) => {
  return (
    <div className="p-4">
      <div className="border-b pb-2 mb-4">
        <span className="text-xl font-semibold">투자정보</span>
      </div>
      <div className="flex flex-wrap justify-between text-sm">
        {/* 왼쪽 정보 */}
        <div className="w-full sm:w-1/2 mb-4">
          <div className="mb-2">
            <span className="font-semibold">EPS: </span>
            <span>{stockInfo.eps}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">BPS: </span>
            <span>{stockInfo.bps}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">ROE: </span>
            <span>{formatPercentage(stockInfo.roeVal)}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">영업이익률: </span>
            <span>{formatPercentage(stockInfo.bsopPrfiInrt)}</span>
          </div>
        </div>

        {/* 오른쪽 정보 */}
        <div className="w-full sm:w-1/2 mb-4">
          <div className="mb-2">
            <span className="font-semibold">매출액증가율: </span>
            <span>{formatPercentage(stockInfo.grs)}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">순이익증가율: </span>
            <span>{formatPercentage(stockInfo.ntinInrt)}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">자본금: </span>
            <span>{formatMillion(stockInfo.cpta)}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">액면가: </span>
            <span>{stockInfo.papr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestInfo;
