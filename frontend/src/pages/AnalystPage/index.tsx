import BasicLayout from "../../layouts/BasicLayout";

import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Button from "../../components/elements/Button";

import follow from "/src/assets/follow.svg";
import unfollow from "/src/assets/unfollow.svg";

import { fetchAnalystInfo, postAnalystFollow } from "../../api/analystAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFavoriteAnalysts } from "../../api/mypageAPI";

interface Analyst {
  userName: string;
  userNickName: string;
  userImagePath: string;
  accuracy: number;
  reliability: number;
  totalAnalystRanking: number;
}

interface AnalystInfo {
  userName: string,
  boardSize: number,
  follower: number,
  totalAnalystRank: number,
  reliability: number,
  userImagePath: string,
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

const Analyst: React.FC = () => {

  const { nickname } = useParams<{ nickname: string }>();
  const [ isFollow, setIsFollow ] = useState(false);
  const queryClient = useQueryClient();

  const { data: analystInfo, error: analystInfoError, isLoading: analystInfoIsLoading } = useQuery<AnalystInfo, Error>({
    queryKey: ["analystInfo", nickname], 
    queryFn: ({ queryKey }) => fetchAnalystInfo(queryKey[1] as string)
  });

  const { data: favoriteAnalysts, error: analystError, isLoading: analystIsLoading } = useQuery<Analyst[], Error>({
    queryKey: ["favoriteAnalysts"],
    queryFn: fetchFavoriteAnalysts,
  });

  useEffect(() => {
    let flag = false;
    favoriteAnalysts?.map((analyst) => {
      if (analyst.userNickName === nickname) {
        setIsFollow(true);

        flag = true;
      }

      if (!flag) {
        setIsFollow(false);
      }

    })
  },[favoriteAnalysts])

  useEffect(() => {
  }, [nickname]);

  const handleClickFollow = async (nickname: string) => {
    try {
      await postAnalystFollow(nickname);

      setIsFollow(!isFollow);

      if (nickname) {
        queryClient.invalidateQueries({
          queryKey: ["analystInfo", nickname],
          exact: true,
        });
      }
    } catch (error) {
       console.error("팔로우 처리 중 오류 발생:", error);
    }
  };

  if (analystInfoIsLoading || analystIsLoading) {
    return <p>Loading...</p>;
  }

  if (analystError || analystInfoError) {
    return <p>Error</p>;
  }

  return (
    <BasicLayout>
      <div className="flex mt-[2rem] h-[100vh]">
        <div className="w-[23rem] mr-[2rem] pr-[3rem] border-b-black border-r">
          <div className="flex justify-center items-center pb-[0.3rem] border-b-black border-b-[0.0625rem]">
            <div>
              <img className="w-[6rem] h-[6rem] rounded-full" src={analystInfo?.userImagePath}></img>
            </div>
            <span className="self-end ml-[4rem] text-[1.625rem]">{analystInfo?.userName}</span>
          </div>
          <div className="flex justify-center gap-[2.2rem] my-[1.3rem] text-[1.25rem]">
            <div className="flex flex-col items-center">
              <span>작성글</span>
              <span>{analystInfo?.boardSize}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>구독자</span>
              <span>{analystInfo?.follower}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>순위</span>
              <span>{analystInfo?.totalAnalystRank}</span>
            </div>
          </div>
          {isFollow ?
          <Button className="w-[13.8125rem] h-[3rem] flex justify-center items-center mx-auto bg-white rounded-lg border-[1px]" border="black" onClick={() => handleClickFollow(nickname!)}>
            <img className="w-[1.875rem] h-[1.75rem]" src={unfollow} />
          </Button>:
          <Button className="w-[13.8125rem] h-[3rem] flex justify-center items-center mx-auto" onClick={() => handleClickFollow(nickname!)}>
            <img className="w-[1.875rem] h-[1.75rem]" src={follow} />
          </Button>}
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
