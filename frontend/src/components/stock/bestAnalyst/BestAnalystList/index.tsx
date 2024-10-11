import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Analyst } from "../../../../types/stock";
import BestAnalystListItem from "../BestAnalystListItem";

const BestAnalystList = () => {
  const bestAnalysts: Analyst[] = useSelector(
    (state: RootState) => state.stock.bestAnalysts
  );
  if (!bestAnalysts || bestAnalysts.length === 0) {
    return (
      <div className="flex-col px-5 py-2 w-[25vw] h-[33vh] border border-b-1 rounded-2xl scrollbar-hide ml-10">
        <span className="flex justify-center text-2xl mx-2 py-3 border-b-2 border-opacity-50 border-b-slate-700 ">
          Best 분석가
        </span>
        <div className="flex justify-center items-center text-gray-500 mt-20">
          해당 종목에 대한 분석자료가 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col px-5 py-2 w-[25vw] h-[50vh] border rounded-2xl overflow-y-scroll scrollbar-hide ml-10">
      <span className="flex justify-center text-2xl mx-2 py-3 border-b-2 border-opacity-50 border-b-slate-700">
        Best 분석가
      </span>
      <div>
        {bestAnalysts.map((analyst, index) => (
          <BestAnalystListItem key={index} analyst={analyst} />
        ))}
      </div>
    </div>
  );
};

export default BestAnalystList;
