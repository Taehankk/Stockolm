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
  const getOpinionColor = (opinion: string) => {
    switch (opinion) {
      case "매수":
        return "bg-red-400"; // 매수: 진한 빨강색
      case "매도":
        return "bg-blue-400"; // 매도: 푸른색
      case "유지":
        return "bg-green-300"; // 유지: 연두색
      default:
        return "bg-green-300"; // 그 외: 연두색
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
          <span
            className={`px-2 py-1 rounded-lg text-white text-small ${getOpinionColor(
              analyst.opinion
            )}`}
          >
            {analyst.opinion} 의견
          </span>
        </div>
      </div>
    </div>
  );
};

export default BestAnalystListItem;
