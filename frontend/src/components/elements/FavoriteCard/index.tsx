import FullHeart from "/src/assets/FullHeart.svg";
import RigthArrow from "/src/assets/RightArrow.svg";
import DonutChart from "../DonutChart";
import { useNavigate } from "react-router-dom";

interface Analyst {
  userName: string;
  userNickName: string;
  userImagePath: string;
  accuracy: number;
  reliability: number;
  totalAnalystRanking: number;
  onClickFollow: () => void;
}

const FavoriteCard = ({
  userName,
  userNickName,
  userImagePath,
  accuracy,
  reliability,
  totalAnalystRanking,
  onClickFollow,
}: Analyst) => {
  const nav = useNavigate();

  const handleClickProfile = () => {
    nav(`/analyst/${userNickName}`);
  };

  return (
    <div className="relative w-[16.5rem] h-[14rem] border-black border-[1.5px] rounded-lg">
      <div className="flex justify-between items-center h-[7rem] p-[1rem] relative">
        <img
          src={FullHeart}
          className="absolute w-[1.5rem] h-[1.5rem] top-4 right-4 cursor-pointer"
          onClick={onClickFollow}
        />
        <img src={userImagePath} className="w-[5rem] h-[5rem] rounded-full" />
        <span className="text-[1rem] self-end">{userName}</span>
      </div>
      <div className="relative flex justify-around w-full h-[5rem]">
        <div className="flex flex-col w-[6rem] h-[5rem] text-[0.8rem]">
          <span className="w-full text-center">신뢰도</span>
          <DonutChart w="6rem" h="5.8rem" textHeight="3rem" textSize="0.6rem" color="#FFF5D2" value={reliability}></DonutChart>
        </div>
        <div className="flex flex-col w-[6rem] h-[6rem] text-[0.8rem]">
          <span className="w-full text-center">정확도</span>
          <DonutChart w="6rem" h="5.8rem" textHeight="3rem" textSize="0.6rem" color="#61A9FB" value={accuracy}></DonutChart>
        </div>

        <div className="flex flex-col w-[6rem] h-[6rem] text-[0.84rem]">
          <span className="w-full text-center mb-[1rem]">순위</span>
          <span className="w-full text-center">{totalAnalystRanking}등</span>
        </div>
      </div>
      <div className="absolute flex left-[11.5rem] cursor-pointer">
        <span className="h-[1.3rem] cursor-pointer" onClick={handleClickProfile}>
          프로필
        </span>
        <img src={RigthArrow} className="w-[0.6rem] ml-[0.5rem] cursor-pointer" onClick={handleClickProfile} />
      </div>
    </div>
  );
};

export default FavoriteCard;
