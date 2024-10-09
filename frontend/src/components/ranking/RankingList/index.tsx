import React from "react";
import RankingListItem from "../RankingListItem";

interface RankingListProps {
  items: {
    userName: string;
    userNickname: string;
    userImagePath: string;
    totalAnalystRanking: number;
    totalAnalystScore: number;
    totalBoardSize: number;
    reliability: number;
    accuracy: number;
  }[];
  rankValue: "accuracy" | "reliability" | "total" | null;
}

const RankingList: React.FC<RankingListProps> = ({ items, rankValue }) => {
  return (
    <div className="w-full min-h-[15rem] max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
      {items.map((item, index) => (
        <RankingListItem key={index} {...item} rankValue={rankValue} />
      ))}
    </div>
  );
};

export default RankingList;
