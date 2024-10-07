import React from "react";
import { useNavigate } from "react-router-dom";
import Rank1 from "../../../assets/Rank1.svg";
import Rank2 from "../../../assets/Rank2.svg";
import Rank3 from "../../../assets/Rank3.svg";

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

  const getRankImage = () => {
    if (totalAnalystRanking === 1) return Rank1;
    if (totalAnalystRanking === 2) return Rank2;
    if (totalAnalystRanking === 3) return Rank3;
  };

  return (
    <div
      className="flex justify-around items-center w-full h-[5rem] cursor-pointer hover:bg-slate-200"
      onClick={handleClick}
    >
      <span className="w-1/6 text-center">
        {getRankImage() ? (
          <div className="flex justify-center mr-7">
            <img
              src={getRankImage()}
              alt={`Rank ${totalAnalystRanking}`}
              className="w-6 h-6 mr-2 "
            />
            <span className="mt-[0.17rem]">{totalAnalystRanking}.</span>
          </div>
        ) : (
          <span>{totalAnalystRanking}.</span>
        )}
      </span>
      <span className="w-1/6 flex text-center items-center justify-center gap-3">
        <img
          src={userImagePath}
          alt={`${userName}'s profile`}
          className="w-11 h-11 rounded-full"
        />
        <span className="items-center justify-center">{userName}</span>
      </span>
      <span className="w-1/6 text-center">{totalBoardSize}건</span>
      <span className="w-1/6 text-center">
        {Math.round((reliability + accuracy) / 2)}%
      </span>
    </div>
  );
};

export default RankingListItem;
