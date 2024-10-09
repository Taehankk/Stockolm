import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { getRankings } from "../../slices/rankingSlice";
import BasicLayout from "../../layouts/BasicLayout";
import RankingList from "../../components/ranking/RankingList";
import RankingSearch from "../../components/ranking/RankingSearch";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/elements/Button";
import RedUp from "../../assets/RedUp.webp";

const RankingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { rankings, totalPages } = useSelector(
    (state: RootState) => state.rankings
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rankValue, setRankValue] = useState<
    "accuracy" | "reliability" | "total" | null
  >("total");
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(
      getRankings({
        rankValue: rankValue === "total" ? null : rankValue,
        page: currentPage,
        size: 5,
        sort: null,
        analystName: searchQuery,
      })
    );
  }, [dispatch, currentPage, rankValue, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleShowAll = () => {
    setSearchQuery(undefined);
  };

  const getRankText = () => {
    if (rankValue === "accuracy") return "정확도";
    if (rankValue === "reliability") return "신뢰도";
    return "종합";
  };

  return (
    <BasicLayout>
      <div>
        <div className="flex-col w-4/5 m-auto">
          <div className="flex items-center">
            <div className="flex w-5/6 h-1/2 justify-center mt-5 ml-24">
              <RankingSearch onSearch={handleSearch} />
            </div>
            <div className="relative mr-24">
              <img
                src={RedUp}
                alt={`투자상승이`}
                className="size-[8rem] ml-[3rem] mt-3 rounded-full"
              />
              <div className="tooltip absolute left-1/2 transform -translate-x-1/3 mt-2 px-6 bg-gray-800 text-white text-lg rounded-lg py-2 px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span>최고의 애널리스트를 만나보세요!</span>
                <br />
                <span>
                  신뢰도와 정확도를 바탕으로 저희 애널리스트를 소개합니다!
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end my-3 gap-3 relative">
            <div className="relative group">
              <Button
                size="large"
                fontSize="medium"
                color="black"
                className="bg-white mr-[35rem] py-2 flex items-center justify-center"
                border="1"
                onClick={handleShowAll}
              >
                전체순위보기
              </Button>
            </div>
            <div className="relative group">
              <Button
                size="small"
                fontSize="medium"
                color="black"
                border="1"
                className={
                  rankValue === "total"
                    ? "bg-white border-slate-700"
                    : "bg-white"
                }
                onClick={() => setRankValue("total")}
              >
                종합
              </Button>
              <div className="tooltip-content bg-gray-700 min-w-[23rem] text-white text-sm rounded-lg py-2 px-3 absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                종합 점수는 정확도와 신뢰도를 반영한 Rating이에요!
              </div>
            </div>
            <div className="relative group">
              <Button
                size="small"
                fontSize="medium"
                color="black"
                border="1"
                className={
                  rankValue === "accuracy"
                    ? "bg-white border-slate-700"
                    : "bg-white"
                }
                onClick={() => setRankValue("accuracy")}
              >
                정확도
              </Button>
              <div className="tooltip-content bg-gray-700 min-w-[23rem] text-white text-sm rounded-lg py-2 px-3 absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                예측값과 실제값 사이에 수치차이를 기반으로 산출돼요!
              </div>
            </div>
            <div className="relative group">
              <Button
                size="small"
                fontSize="medium"
                color="black"
                border="1"
                className={
                  rankValue === "reliability"
                    ? "bg-white border-slate-700"
                    : "bg-white"
                }
                onClick={() => setRankValue("reliability")}
              >
                신뢰도
              </Button>
              <div className="tooltip-content bg-gray-700 min-w-[15rem] whitespace-nowrap text-white text-sm rounded-lg py-2 px-3 absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                상승과 하락에 대한 예측 신뢰도에요!
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center w-full h-[4rem] border-b-black border-b-[0.1rem]">
            <span className="w-1/6 text-center">순위</span>
            <span className="w-1/6 text-center">분석가</span>
            <span className="w-1/6 text-center">분석글 개수</span>
            <span className="w-1/6 text-center">{getRankText()}</span>
          </div>
          <div className="h-3/5">
            <RankingList items={rankings} rankValue={rankValue} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalPages * 5}
            onPageChange={handlePageChange}
            itemsPerPage={5}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default RankingPage;
