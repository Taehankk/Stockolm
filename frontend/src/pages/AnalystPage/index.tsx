import BasicLayout from "../../layouts/BasicLayout";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Button from "../../components/elements/Button";

import profile from "/src/assets/winter.jpg"
import follow from "/src/assets/follow.svg"

const Analyst = () => {
  const [analyst, setAnalyst] = useState("장원영");
  const [write, setWrite] = useState(0);
  const [subscribe, setSubscribe] = useState(0);
  const [rank, setRank] = useState(0);

  useEffect(() => {
    setAnalyst("장원영");
    setWrite(0);
    setSubscribe(0);
    setRank(0);
  },[])


  return (
    <BasicLayout>
      <div className="flex mt-[2rem] h-[100vh]">
        <div className="w-[23rem] mr-[2rem] pr-[3rem] border-b-black border-r">
          <div className="flex justify-center items-center pb-[0.3rem] border-b-black border-b-[0.0625rem]">
            <div>
              <img className="w-[6rem] h-[6rem] rounded-full" src={profile}></img>
            </div>
            <span className="self-end ml-[4rem] text-[1.625rem]">{analyst}</span>
          </div>
          <div className="flex justify-center gap-[2.2rem] my-[1.3rem] text-[1.25rem]">
            <div className="flex flex-col items-center">
              <span>작성글</span>
              <span>{write}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>구독자</span>
              <span>{subscribe}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>순위</span>
              <span>{rank}</span>
            </div>
          </div>
          <Button className="w-[13.8125rem] h-[3rem] flex justify-center items-center mx-auto">
            <img className="w-[1.875rem] h-[1.75rem]" src={follow} />
          </Button>
          <div className="flex flex-col items-center gap-[1.5rem] mx-auto w-[7rem] mt-[5rem] border-[#B4B4B4] border-y-[1px] py-[1.3rem] text-[1.25rem]">
            <div>
              <Link to={"statistic"} className="cursor-pointer">통계보기</Link>
            </div>
            <div>
              <Link to={"report"} className="cursor-pointer">작성글보기</Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default Analyst;
