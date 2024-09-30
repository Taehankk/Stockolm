import React from "react";
import RankingListItem from "../RankingListItem";

interface RankingListProps {
  items: {
    ranking: number;
    analystName: string;
    postCount: number;
    totalScore: number;
  }[];
}

const RankingList: React.FC<RankingListProps> = ({ items }) => {
  return (
    <div className="w-full min-h-[15rem] max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
      {items.map((item, index) => (
        <RankingListItem key={index} {...item} />
      ))}
    </div>
  );
};

export default RankingList;
