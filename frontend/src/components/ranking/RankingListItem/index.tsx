import React from "react";

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
  userImagePath,
  totalAnalystRanking,
  totalBoardSize,
  reliability,
  accuracy,
}) => {
  return (
    <div className="flex justify-around items-center w-full h-[5rem]">
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
