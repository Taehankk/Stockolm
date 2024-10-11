import { StockInfo } from "../../../types/stock";

interface EnterpriseInfoProps {
  stockInfo: StockInfo;
}

const EnterpriseInfo = ({ stockInfo }: EnterpriseInfoProps) => {
  return (
    <div className="p-4">
      <div className="border-b pb-2 mb-4">
        <span className="text-xl font-semibold">회사정보</span>
      </div>
      <div className="flex flex-wrap justify-between text-sm">
        <div className="w-full sm:w-1/2 mb-4">
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">회사명: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.corpName}
            </span>
          </div>
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">대표자명: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.ceoName}
            </span>
          </div>
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">종목코드: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.stockCode}
            </span>
          </div>
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">기업고유코드: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.corpCode}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-1/2 mb-4">
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">주소: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.address}
            </span>
          </div>
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">홈페이지: </span>
            {stockInfo.url}
          </div>
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">전화번호: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.phoneNumber}
            </span>
          </div>
          <div className="mb-2 flex">
            <span className="font-semibold w-1/3">팩스번호: </span>
            <span className="w-2/3 whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip">
              {stockInfo.faxNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseInfo;
