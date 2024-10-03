import React from "react";
import { useNavigate } from "react-router-dom";

interface RankingListItemProps {
  userName: string;
  userNickname: string;
  userImagePath: string;
  totalAnalystRanking: number;
  totalBoardSize: number;
  reliability: number;
  accuracy: number;
}

const RankingListItem: React.FC<RankingListItemProps> = ({
  userName,
  userNickname,
  userImagePath,
  totalAnalystRanking,
  totalBoardSize,
  reliability,
  accuracy,
}) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/analyst/${userNickname}`);
  };

  return (
    <div
      className="flex justify-around items-center w-full h-[5rem] cursor-pointer hover:bg-slate-200"
      onClick={handleClick}
    >
      <span className="w-1/6 text-center">
        <span>{totalAnalystRanking}.</span>
      </span>
      <span className="w-1/6 text-center">
        <img
          src={userImagePath}
          alt={`${userName}'s profile`}
          className="w-2 h-2 rounded-full"
        />
        <span>{userName}</span>
      </span>
      <span className="w-1/6 text-center">{totalBoardSize}건</span>
      <span className="w-1/6 text-center">
        {Math.round((reliability + accuracy) / 2)}%
      </span>
    </div>
  );
};

export default RankingListItem;
