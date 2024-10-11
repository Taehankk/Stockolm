import React, { useState } from "react";

interface RankingSearchProps {
  onSearch: (query: string) => void;
}

const RankingSearch: React.FC<RankingSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-3/5 items-center border border-gray-400 rounded-full px-2 py-1 justify-between">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="분석가 이름을 검색하세요"
        className="p-2 px-6 w-4/5 rounded outline-none"
        onKeyDown={handleKeyDown}
        maxLength={15}
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 text-black rounded border-none"
      >
        검색
      </button>
    </div>
  );
};

export default RankingSearch;
