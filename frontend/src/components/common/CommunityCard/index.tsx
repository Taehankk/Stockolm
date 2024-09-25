import { Link } from "react-router-dom";

import Samsung from "../../../assets/samsung.jpg";

interface CommunityCardProps {
  id: number;
  represent: boolean;
  stock: string;
  title: string;
  writer: string;
  writeTime: string;
};

const CommunityCard = ({
  id = 10,
  represent = true,
  stock = "삼성전자",
  title = "9월 월간 분석",
  writer = "장원영",
  writeTime = "20분 전",
}: CommunityCardProps) => {    
    return(
      <div className="flex flex-col w-[19rem] h-[16rem] shadow-sm shadow-gray-400 rounded-[0.625rem]">
        <Link to={`/analyst/report/${id}`}>
          <div className="relative flex justify-center items-center h-[9rem] border-[#D9D9D9]] border-b-[0.0625rem]">
            {represent ? <div className="absolute w-[4rem] h-[1.375rem] top-[0.6rem] right-[0.6rem] bg-[#FF6B5A] rounded-full text-[white] text-[0.75rem] text-center leading-[1.6rem]">대표글</div> : <></>}
            <img src={Samsung} className="w-[70%] h-[70%]" />
          </div>
          <div className="flex flex-col h-[7rem] justify-evenly pt-[0.5rem] px-[1rem]">
            <span className="w-[5.625rem] h-[1.375rem] rounded-full bg-[#51E8B3] text-[white] text-center">{stock}</span>
            <span className="text-[1.25rem]">{title}</span>
            <div className="flex justify-end items-end gap-[0.6rem] text-[#B4B4B4] text-[0.875rem]">
              <span>{writer}</span>
              <span>{writeTime}</span>
            </div>
          </div>
        </Link>
      </div>
    );
};

export default CommunityCard;