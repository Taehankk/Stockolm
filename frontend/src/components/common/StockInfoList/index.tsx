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
    stck_prpr: string;
    prdy_vrss: string;
    prdy_ctrt: string;
    acml_vol: string;
    acml_tr_pbmn: string;
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

        setDataList(results.map(result => result.output));

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
          {dataList.length > 0 ? dataList.map((data, index) => (
            <div key={index} className="flex justify-around items-center w-[60rem] h-[5rem] cursor-pointer" onClick={() => onStockClick && onStockClick(dataProps[index])}>
              <span className="w-1/6 text-center">{dataProps[index].stockName}</span>
              <span className="w-1/6 text-center">{data.stck_prpr}</span>
              <span className="w-1/6 text-center">{data.prdy_vrss}</span>
              <span className="w-1/6 text-center">{data.prdy_ctrt}</span>
              <span className="w-1/6 text-center">{data.acml_vol}</span>
              <span className="w-1/6 text-center">{data.acml_tr_pbmn}</span>
            </div>
          )) : <div className="flex min-h-[14rem] justify-center items-center"><span className="text-[1.5rem]">등록된 종목이 없습니다.</span></div>}
        </div>
      </div>
      </div>
    );
  };

  export default StockInfoList;