import { useEffect, useState } from "react";
import FavoriteCard from "../../elements/FavoriteCard";
import { useQueryClient } from "@tanstack/react-query";
import { postAnalystFollow } from "../../../api/analystAPI";

import CardArrow from "/src/assets/cardArrow.svg";
import CardArrowReverse from "/src/assets/cardArrowReverse.svg";

interface Analyst {
  userName: string;
  userNickName: string;
  userImagePath: string;
  accuracy: number;
  reliability: number;
  totalAnalystRanking: number;
}

interface FavoriteCardProps {
  dataProps: Analyst[];
}

const FavoriteCardList = ({
  dataProps,
}: FavoriteCardProps) => {
  const queryClient = useQueryClient();
  const [dataList, setDataList] = useState<Analyst[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const startIdx = currentPage * itemsPerPage;
  const paginatedData = dataList.slice(startIdx, startIdx + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (startIdx + itemsPerPage < dataList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchData = (dataProps: Analyst[]) => {
    let updatedData = [...dataProps];

    const remainder = updatedData.length % itemsPerPage;
    if (remainder !== 0) {
      const emptySlots = itemsPerPage - remainder;
      updatedData = [...updatedData, ...Array(emptySlots).fill(null)];
    }

    setDataList(updatedData);
  };

  const handleClickFollow = async (nickname: string) => {
    try {
      await postAnalystFollow(nickname);

      setDataList((prevData) => {
        const updatedData = prevData.filter(
          (analyst) => analyst && analyst.userNickName !== nickname
        );

        if (updatedData.length === 0 && currentPage > 0) {
          setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
        }

        const remainder = updatedData.length % itemsPerPage;
        if (remainder !== 0) {
          const emptySlots = itemsPerPage - remainder;
          return [...updatedData, ...Array(emptySlots).fill(null)];
        }

        return updatedData;
      });

      await queryClient.invalidateQueries({ queryKey: ["favoriteAnalysts"] });

      await queryClient.refetchQueries({ queryKey: ["favoriteAnalysts"], exact: true });

    } catch (error) {
      console.error("팔로우 처리 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (dataProps.length > 0) {
      fetchData(dataProps);
    }
  }, [dataProps]);

  useEffect(() => {
    if (paginatedData.length === 0 && currentPage > 0) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  }, [paginatedData, currentPage]);

  return (
    <div className="flex justify-center items-center gap-[4rem] w-full mt-[3rem]">
      {dataList.length > 4 && (
        <img src={CardArrow} className="cursor-pointer" onClick={handlePrevPage} />
      )}
      <div className="flex justify-start items-center gap-[3rem]">
        {paginatedData.length > 0 ? paginatedData.map((data, index) => (
          data ? (
            <FavoriteCard
              key={index}
              userNickName={data.userNickName}
              userImagePath={data.userImagePath}
              userName={data.userName}
              reliability={data.reliability}
              accuracy={data.accuracy}
              totalAnalystRanking={data.totalAnalystRanking}
              onClickFollow={() => handleClickFollow(data.userNickName)}
            />
          ) : (
            <div key={index} className="w-[16.5rem] h-[200px]"></div>
          )
        )) : (
          <span className="mt-[5rem] text-[1.5rem]">좋아하는 분석가가 없습니다.</span>
        )}
      </div>
      {dataList.length > 4 && (
        <img src={CardArrowReverse} className="cursor-pointer" onClick={handleNextPage} />
      )}
    </div>
  );
};

export default FavoriteCardList;
