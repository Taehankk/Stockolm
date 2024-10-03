import { Link, Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

// import profile from "/src/assets/winter.jpg"
import pencil from "/src/assets/pencil.svg"
import memo from "/src/assets/memo.svg"
import plusPerson from "/src/assets/plusPerson.svg"
import ranking from "/src/assets/rank.svg"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getUserInfo } from "../../slices/userSlice";
import NicknameModal from "../../components/mypage/NicknameModal";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalystInfo } from "../../api/analystAPI";

interface AnalystInfo {
  boardSize: number,
  follower: number,
  totalAnalystRank: number,
  reliability: number,
  reliabilityStock: [
    {
      stockName: string,
      stockSize: number,
      stockReliabilitySize: number
      stockReliabilityValue: number
    },
  ],
  accuracy: number
  accuracyStock: [
    {
      stockName: string,
      stockSize: number,
      stockAccuracySize: number
      stockAccuracyValue: number 
    },
  ],	
  industry: [
    {
      industryName: string,
      industryValue: number
    },
  ]
}

const MyPage: React.FC = () => {

  const dispatch: AppDispatch = useDispatch(); 
  const { userName, userNickName, userImagePath, loading, error } = useSelector((state: RootState) => state.user);

  const [nickName, setNickName] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [role, setRole] = useState("");

  const { data: analystInfo, error: analystInfoError, isLoading: analystInfoIsLoading } = useQuery<AnalystInfo, Error>({
    queryKey: ["analystInfo", userNickName], 
    queryFn: ({ queryKey }) => fetchAnalystInfo(queryKey[1] as string)
  });

  useEffect(() => {
    setRole(sessionStorage.getItem("ROLE") || "USER");
  },[])

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    setNickName(userNickName);
  },[userNickName])

  if (loading || analystInfoIsLoading) {
    return <p>Loading...</p>;
  }

  if (error || analystInfoError) {
    return <p>Error: {error}</p>;
  }

  const handleClickPencil = () => {
    setIsModal(true);
  }

  return(
    <BasicLayout>
      <div className="flex flex-col">
        <div className="flex relative self-end w-[80%] h-[110px] mt-[3rem] border-b-black border-b-2">
          <img className="absolute left-[-7rem] w-[9rem] h-[9rem] rounded-full" src={userImagePath}></img>
          <div className="pl-[3rem] h-full flex items-end text-[2.25rem]">{role === "USER" ? nickName : userName}님, 안녕하세요!</div>
          <div className="flex h-full">
            <img className="w-[1.6rem] h-[1.6rem] ml-[1rem] mb-[1rem] self-end cursor-pointer" src={pencil} onClick={handleClickPencil}></img>
            {isModal && <NicknameModal setIsModal={setIsModal} context="변경할 닉네임을 입력하세요."></NicknameModal>}
          </div>
          {role !== "USER" ? <div className="flex flex-1 w-[20rem] justify-end items-end gap-[2rem] ">
            <div>
              <div className="flex gap-[1rem]">
                <img src={memo} className="w-[1.5rem] h-[1.5rem]"></img>
                <span>작성글</span>
              </div>
              <span className="flex justify-end pr-[1rem]">{analystInfo?.boardSize}</span>
            </div>
            
            <div>
              <div className="flex gap-[1rem]">
                <img src={plusPerson} className="w-[1.5rem] h-[1.5rem]"></img>
                <span>구독자</span>
              </div>
              <span className="flex justify-end pr-[1rem]">{analystInfo?.follower}</span>
            </div>

            <div>
              <div className="flex gap-[1rem]">
                <img src={ranking} className="w-[1.5rem] h-[1.5rem]"></img>
                <span>순위</span>
              </div>
              <span className="flex justify-end pr-[0.7rem]">{analystInfo?.totalAnalystRank}</span>
            </div>
          </div> :
          <></>}
          
        </div>

        <div className="flex mt-[2rem] h-[100vh]">
          
          <div className="w-[23rem] mr-[2rem] pr-[3rem] ">
            <div className="flex flex-col gap-[1.5rem] mx-auto w-[9rem] mt-[5rem] border-[#B4B4B4] border-y-[1px] py-[1.3rem] text-[1.25rem]">
              <div>
                <Link to={"profile"} className="cursor-pointer">내상태</Link>
              </div>
              <div>
                <Link to={"password"} className="cursor-pointer">비밀번호 수정</Link>
              </div>
            </div>
          </div>
          <div className="w-full mt-[6rem]">
            <Outlet />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
