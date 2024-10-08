import { Analyst } from "../../../../types/stock";
import { useNavigate } from "react-router-dom";

interface BestAnalystListItemProps {
  analyst: Analyst;
}

const BestAnalystListItem = ({ analyst }: BestAnalystListItemProps) => {
  const nav = useNavigate();

  const handleBestAnalystClick = () => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      nav(
        `/analyst/${analyst.analystNickname}/report/${analyst.analystBoardId}`
      );
    } else {
      alert("로그인이 필요합니다.");
      nav(`/auth`, {
        state: { imgLocation: 0 },
      });
    }
  };

  return (
    <div
      className="bg-white flex px-2 py-4 border-b border-gray-300 cursor-pointer hover:bg-slate-100"
      onClick={handleBestAnalystClick}
    >
      <div className="flex items-center">
        <div className="flex-2">
          <img
            className="w-[50px] h-[50px] rounded-full border"
            src={analyst.userImagePath}
            alt={analyst.analystName}
          />
        </div>
        <div className="flex-col flex-3 mx-5">
          <span className="block font-normal">{analyst.analystName}</span>
          <span className="text-gray-400">신뢰도 {analyst.reliability}%</span>
        </div>
        <div className="flex-3 ml-10">
          <span className="px-2 py-1 bg-red-400 rounded-lg text-white text-small ">
            {analyst.opinion}의견
          </span>
        </div>
      </div>
    </div>
  );
};

export default BestAnalystListItem;
