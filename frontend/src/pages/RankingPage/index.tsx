import { useState } from "react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { getRankings } from "../../slices/rankingSlice";
import BasicLayout from "../../layouts/BasicLayout";
import RankingList from "../../components/ranking/RankingList";
import RankingSearch from "../../components/ranking/RankingSearch";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/elements/Button";

const RankingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { rankings, totalPages } = useSelector(
    (state: RootState) => state.rankings
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rankValue, setRankValue] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      getRankings({ rankValue, page: currentPage, size: 5, sort: null })
    );
  }, [dispatch, currentPage, rankValue]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    console.log(query);
  };

  // rankValue에 따른 텍스트 값 설정
  const getRankText = () => {
    if (rankValue === "accuracy") return "정확도";
    if (rankValue === "reliability") return "신뢰도";
    return "종합";
  };

  return (
    <BasicLayout>
      <div>
        <div className="flex-col w-4/5 m-auto">
          <div className="flex m-auto justify-center mt-5">
            <RankingSearch onSearch={handleSearch} />
          </div>
          <div className="flex justify-end my-3 gap-3">
            <Button
              size="small"
              fontSize="medium"
              color="black"
              border="1"
              className={
                rankValue === null ? "bg-white border-slate-700" : "bg-white"
              }
              onClick={() => setRankValue(null)}
            >
              종합
            </Button>
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
          </div>
          <div className="flex justify-around items-center w-full h-[4rem] border-b-black border-b-[0.1rem]">
            <span className="w-1/6 text-center">순위</span>
            <span className="w-1/6 text-center">분석가</span>
            <span className="w-1/6 text-center">분석글 개수</span>
            <span className="w-1/6 text-center">{getRankText()}</span>
          </div>
          <div className="h-3/5">
            <RankingList items={rankings} />
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
