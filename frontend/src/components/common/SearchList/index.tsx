import { StockItem, SearchResultItem } from "../../../api/searchAPI";

interface SearchListProps {
  searchResults: SearchResultItem[];
  popularKeywords: StockItem[];
  recentKeywords: StockItem[];
  onKeywordClick: (stockName: string, stockCode: string) => void;
  loading: boolean;
  error: string | null;
  hasInput: boolean;
}

const SearchList = ({
  searchResults,
  popularKeywords,
  recentKeywords,
  onKeywordClick,
  hasInput,
}: SearchListProps) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-50">
      {hasInput ? (
        <div className="p-4">
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <li
                  key={index}
                  onClick={() => onKeywordClick(item.stockName, item.stockCode)}
                  className="cursor-pointer hover:bg-gray-100 p-2"
                >
                  <div className="flex justify-between">
                    <div>{item.stockName}</div>
                    <div>{item.stockCode}</div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-2">검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>
      ) : (
        <>
          <div className="p-4">
            <h3 className="font-bold">인기 검색어</h3>
            <ul>
              {popularKeywords.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    onKeywordClick(item.hotStockName!, item.hotStockCode!)
                  }
                  className="cursor-pointer hover:bg-gray-100 p-2"
                >
                  <div className="flex justify-between">
                    <div>{item.hotStockName}</div>
                    <div>{item.hotStockCode}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-bold">최근 검색어</h3>
            <ul>
              {recentKeywords.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    onKeywordClick(item.recentStockName!, item.recentStockCode!)
                  }
                  className="cursor-pointer hover:bg-gray-100 p-2"
                >
                  <div className="flex justify-between">
                    <div>{item.recentStockName}</div>
                    <div>{item.recentStockCode}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchList;
