import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import { setSearchTerm, setSearchCode } from "../../../slices/stockSlice";
import {
  fetchSearchList,
  fetchSearchResults,
} from "../../../slices/searchSlice";
import { RootState } from "../../../store";

import SearchList from "../SearchList";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 검색창을 눌렀을때 아래에 인기검색어, 추천검색어가 뜨기 위해 , 눌렀는지를 확인
  const [isFocused, setIsFocused] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // 검색 입력값 관리
  const [value, setValue] = useState("");

  const { hotStockList, recentStockList, searchResults, loading, error } =
    useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (value.trim() !== "") {
      dispatch(fetchSearchResults(value));
    } else if (isFocused) {
      dispatch(fetchSearchList());
    }
  }, [dispatch, value, isFocused]);

  // 서치바 클릭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearch = () => {
    dispatch(setSearchTerm(value));
    navigate(`/stock`);
    setIsFocused(false);
    setValue("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsFocused(true);
  };

  return (
    <div ref={searchBarRef} className="relative w-full max-w-lg">
      <div
        className="flex items-center border border-gray-400 rounded-full px-4 py-2"
        onClick={() => setIsFocused(true)}
      >
        <input
          type="text"
          placeholder="종목명 입력"
          value={value}
          onChange={handleInputChange}
          className="flex-grow outline-none"
          onFocus={() => setIsFocused(true)}
        />
        <button
          onClick={onSearch}
          className="ml-2 bg-white rounded-full p-2 hover:bg-gray-100 focus:outline-none"
        ></button>
      </div>
      {isFocused && (
        <SearchList
          searchResults={searchResults}
          popularKeywords={hotStockList}
          recentKeywords={recentStockList}
          onKeywordClick={(stockName: string, stockCode: string) => {
            dispatch(setSearchTerm(stockName));
            dispatch(setSearchCode(stockCode));
            navigate(`/stock`);
            setIsFocused(false);
            setValue("");
          }}
          loading={loading}
          error={error}
          hasInput={value.trim() !== ""}
        />
      )}
    </div>
  );
};

export default SearchBar;
