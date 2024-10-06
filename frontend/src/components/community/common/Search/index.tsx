interface Props {
  searchValue: string;
  handleSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchList: () => void;
}

const Search = ({ searchValue, handleSearchValue, searchList }: Props) => {
  return (
    <div className="flex h-1/3 items-center border border-gray-400 rounded-full px-2 py-1 justify-between">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchValue}
        placeholder="검색어를 검색하세요"
        className="p-2 px-6 h-full rounded outline-none"
      />
      <span onClick={searchList}>검색</span>
    </div>
  );
};

export default Search;
