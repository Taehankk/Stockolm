import face from "../../../../assets/face.jpg";
import { Analyst } from "../../../../types/stock";
import { useNavigate } from "react-router-dom";

interface BestAnalystListItemProps {
  analyst: Analyst;
}

const BestAnalystListItem = ({ analyst }: BestAnalystListItemProps) => {
  const nav = useNavigate();

  const handleBestAnalystClick = () => {
    nav(`/analyst/${analyst.analystNickname}/report/${analyst.analystBoardId}`);
  };

  return (
    <div
      className="bg-white flex px-2 py-1 border-t border-b border-gray-200 cursor-pointer hover:bg-slate-100"
      onClick={handleBestAnalystClick}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <img
            className="w-[50px] h-[50px] rounded-full border"
            src={analyst.userImagePath || face}
            alt={analyst.analystName}
          />
        </div>
        <div className="flex-col flex-4 mx-5">
          <span className="block font-normal">{analyst.analystName}</span>
          <span className="text-gray-400">신뢰도 {analyst.reliability}%</span>
        </div>
        <div className="flex-2">
          <span className="px-2 py-1 bg-red-400 rounded-lg text-white text-small">
            {analyst.opinion}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BestAnalystListItem;
