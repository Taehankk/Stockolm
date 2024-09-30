import { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import RankingList from "../../components/ranking/RankingList";
import RankingSearch from "../../components/ranking/RankingSearch";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/elements/Button";

const RankingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100;
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    console.log("Search for:", query);
    // 검색 로직 추가 예정
  };

  const rankingItems = [
    {
      ranking: 1,
      analystName: "김태한",
      postCount: 10,
      totalScore: 12.34,
    },
    {
      ranking: 2,
      analystName: "이상휘",
      postCount: 10,
      totalScore: 12.34,
    },
    {
      ranking: 3,
      analystName: "이름",
      postCount: 10,
      totalScore: 12.34,
    },
    {
      ranking: 4,
      analystName: "이름",
      postCount: 10,
      totalScore: 12.34,
    },
    {
      ranking: 5,
      analystName: "이름",
      postCount: 10,
      totalScore: 12.34,
    },
  ];

  return (
    <BasicLayout>
      <div>
        <div className="flex-col w-4/5 m-auto">
          <div className="flex m-auto justify-center mt-5">
            <RankingSearch onSearch={handleSearch} />
          </div>
          <div className="flex justify-end my-3">
            <Button
              size="small"
              fontSize="medium"
              color="black"
              className="bg-white"
              border="1"
            >
              종합
            </Button>
            <Button
              size="small"
              fontSize="medium"
              color="black"
              className="bg-white"
              border="1"
            >
              정확도
            </Button>
            <Button
              size="small"
              fontSize="medium"
              color="black"
              className="bg-white"
              border="1"
            >
              신뢰도
            </Button>
          </div>
          <div className="flex justify-around items-center w-full h-[4rem] border-b-black border-b-[0.1rem]">
            <span className="w-1/6 text-center">순위</span>
            <span className="w-1/6 text-center">분석가</span>
            <span className="w-1/6 text-center">분석글 개수</span>
            <span className="w-1/6 text-center">종합</span>
          </div>
          <div className="h-3/5">
            <RankingList items={rankingItems} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default RankingPage;
