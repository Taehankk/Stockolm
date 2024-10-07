interface Props {
  sort: string;
  handleSort: (value: string) => void;
}

const Filter = ({ sort, handleSort }: Props) => {
  return (
    <div className="flex gap-3 text-xl">
      <span
        key="latest"
        onClick={() => handleSort("latest")}
        className={`cursor-pointer ${sort === "latest" ? "" : "opacity-50"}`}
      >
        최신순
      </span>
      <span
        key="view"
        onClick={() => handleSort("view")}
        className={`cursor-pointer ${sort === "view" ? "" : "opacity-50"}`}
      >
        조회순
      </span>
      <span
        key="like"
        onClick={() => handleSort("like")}
        className={`cursor-pointer ${sort === "like" ? "" : "opacity-50"}`}
      >
        인기순
      </span>
    </div>
  );
};

export default Filter;
