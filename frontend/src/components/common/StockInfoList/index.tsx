interface StockData {
  stockName: string;
  currentPrice: string;
  priceChange: string;
  fluctuationRate: string;
  tradingVolume: string;
  tradingAmount: string;
}
  
interface StockInfoListProps {
  dataProps: StockData[];
}

const StockInfoList = ({
  dataProps, 
}: StockInfoListProps) => {

    // const data = dataProps || [];

    const data = [
        {
          stockName: "삼성전자",
          currentPrice: "74,300",
          priceChange: "800",
          fluctuationRate: "+1.08%",
          tradingVolume: "13,579,440",
          tradingAmount: "1,102,100"
        },
        {
          stockName: "현대자동차",
          currentPrice: "332,300",
          priceChange: "1,000",
          fluctuationRate: "+1.08%",
          tradingVolume: "579,440",
          tradingAmount: "102,100"
        },
        {
            stockName: "현대자동차",
            currentPrice: "332,300",
            priceChange: "1,000",
            fluctuationRate: "+1.08%",
            tradingVolume: "579,440",
            tradingAmount: "102,100"
          },
          {
            stockName: "현대자동차",
            currentPrice: "332,300",
            priceChange: "1,000",
            fluctuationRate: "+1.08%",
            tradingVolume: "579,440",
            tradingAmount: "102,100"
          },
      ];

  return(
    <div>
      <div className="flex justify-around items-center w-[60rem] h-[4rem] border-y-black border-y-[0.1rem]">
        <span className="w-1/6 text-center">종목명</span>
        <span className="w-1/6 text-center">현재가</span>
        <span className="w-1/6 text-center">전일대비</span>
        <span className="w-1/6 text-center">등락률</span>
        <span className="w-1/6 text-center">거래량</span>
        <span className="w-1/6 text-center">거래대금(백만)</span>
      </div>
    <div>
    <div className="w-[60rem] min-h-[15rem] max-h-[15rem] border-b-black border-b-[0.1rem] overflow-y-auto overflow-x-hidden custom-scrollbar">
        {data.length > 0 ? data.map((item, index) => (
          <div key={index} className="flex justify-around items-center w-[60rem] h-[5rem]">
            <span className="w-1/6 text-center">{item.stockName}</span>
            <span className="w-1/6 text-center">{item.currentPrice}</span>
            <span className="w-1/6 text-center">{item.priceChange}</span>
            <span className="w-1/6 text-center">{item.fluctuationRate}</span>
            <span className="w-1/6 text-center">{item.tradingVolume}</span>
            <span className="w-1/6 text-center">{item.tradingAmount}</span>
          </div>
        )) : <div className="flex min-h-[14rem] justify-center items-center"><span className="text-[1.5rem]">등록된 종목이 없습니다.</span></div>}
      </div>
    </div>
    </div>
  );
};

export default StockInfoList;