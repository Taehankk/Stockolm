import React from "react";

interface RankingListItemProps {
  ranking: number;
  analystName: string;
  postCount: number;
  totalScore: number;
}

const RankingListItem: React.FC<RankingListItemProps> = ({
  ranking,
  analystName,
  postCount,
  totalScore,
}) => {
  return (
    <div className="flex justify-around items-center w-full h-[5rem]">
      <span className="w-1/6 text-center">
        <span>랭킹이미지 </span>
        <span>{ranking}.</span>
      </span>
      <span className="w-1/6 text-center">
        <span>분석가이미지 </span>
        <span>{analystName}</span>
      </span>
      <span className="w-1/6 text-center">{postCount}건</span>
      <span className="w-1/6 text-center">{totalScore}%</span>
    </div>
  );
};

export default RankingListItem;
