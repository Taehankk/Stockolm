import { useEffect, useState } from "react";
import { getStockData } from "../../../api/stockAPI";

  interface Stock {
    stockCode: string, 
    stockName: string,
  }
  interface StockInfoListProps {
    dataProps: Stock[];
    onStockClick?: (stock: Stock) => void;
  }

  interface StockInfo {
    stockName: string,
    stckPrpr: string;
    prdyVrss: string;
    prdyCtrt: string;
    acmlVol: string;
    acmlTrPbmn: string;
  }

  const StockInfoList = ({
    dataProps, 
    onStockClick,
  }: StockInfoListProps) => {

    const [dataList, setDataList] = useState<StockInfo[]>([]);

    const fetchData = async (dataProps: Stock[]) => {
      console.log(dataProps)
      try {
        const results = await Promise.all(dataProps.map(stock => getStockData(stock.stockCode)));

        await setDataList(results.map(result => result));
        
      } catch (error) {
        console.error("주식 요약 정보를 불러오지 못함", error);
      } finally {
        console.log(getStockData(dataProps[0].stockCode))
      }
    };

    useEffect(() => {
      if (dataProps.length > 0) {
        fetchData(dataProps);
      }
    }, [dataProps]);

  const formatNumberWithCommas = (number: string | number) => {
    return Number(number).toLocaleString();
  };

  const formatTransactionAmount = (amount: string | number) => {
    const dividedAmount = Number(amount) / 1000000;
    if (dividedAmount < 1) {
      return dividedAmount.toFixed(1);
    }
    return dividedAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  };

    const getColorClass = (value: string | number) => {
      const numericValue = Number(value);
      if (numericValue > 0) return 'text-red-500';
      if (numericValue < 0) return 'text-blue-500';
      return 'text-black';
    };
    
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
          {dataList.length > 0 ? dataList.flat().map((data, index) => (
            <div key={index} className="flex justify-around items-center w-[60rem] h-[5rem] cursor-pointer" onClick={() => onStockClick && onStockClick(dataProps[index])}>
              <span className="w-1/6 text-center">{dataProps[index].stockName}</span>
              <span className="w-1/6 text-center">{formatNumberWithCommas(data.stckPrpr)}</span>
              <span className={`w-1/6 text-center ${getColorClass(data.prdyVrss)}`}>{formatNumberWithCommas(data.prdyVrss)}</span>
              <span className={`w-1/6 text-center ${getColorClass(data.prdyVrss)}`}>{formatNumberWithCommas(data.prdyCtrt)}</span>
              <span className="w-1/6 text-center">{formatNumberWithCommas(data.acmlVol)}</span>
              <span className="w-1/6 text-center">{formatTransactionAmount(data.acmlTrPbmn)}</span>
            </div>
          )) : <div className="flex min-h-[14rem] justify-center items-center"><span className="text-[1.5rem]">등록된 종목이 없습니다.</span></div>}
        </div>
      </div>
      </div>
    );
  };

  export default StockInfoList;