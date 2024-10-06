interface Props {
  category: string;
  handleCategory: (value: string) => void;
}

const Category = ({ category, handleCategory }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <span>카테고리</span>
      <div className="flex gap-2">
        <div
          key="WORRY"
          onClick={() => handleCategory("WORRY")}
          className={`border ${category === "WORRY" ? "border-black" : "border-opacity-50"} rounded-md w-[6rem] h-[2rem] text-center content-center`}
        >
          고민상담
        </div>
        <div
          key="CHAT"
          onClick={() => handleCategory("CHAT")}
          className={`border ${category === "CHAT" ? "border-black" : "border-opacity-50"} rounded-md w-[6rem] h-[2rem] text-center content-center`}
        >
          잡담
        </div>
        <div
          key="ETC"
          onClick={() => handleCategory("ETC")}
          className={`border ${category === "ETC" ? "border-black" : "border-opacity-50"} rounded-md w-[6rem] h-[2rem] text-center content-center`}
        >
          기타
        </div>
      </div>
    </div>
  );
};

export default Category;
