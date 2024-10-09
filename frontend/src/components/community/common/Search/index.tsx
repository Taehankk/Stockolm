interface Props {
  searchValue: string;
  handleSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchList: () => void;
}

const Search = ({ searchValue, handleSearchValue, searchList }: Props) => {
  // onKeyDown 핸들러에서 Enter 키 감지
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchList(); // Enter 키 입력 시 searchList 함수 호출
    }
  };

  return (
    <div className="flex h-1/3 items-center border border-gray-400 rounded-full px-2 py-1 justify-between">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchValue}
        onKeyDown={handleKeyDown} // Enter 키 감지하는 핸들러 추가
        placeholder="검색어를 입력하세요"
        className="flex p-2 px-6 h-[2rem] rounded outline-none"
        maxLength={20}
      />
      <span onClick={searchList} className="cursor-pointer pr-3">
        검색
      </span>
    </div>
  );
};

export default Search;
