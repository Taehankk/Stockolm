import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";

import Pagination from "../../../components/common/Pagination";

import { useEffect, useState } from "react";

import {
  setBoardCategory,
  setBoardContent,
  setBoardID,
  setBoardTitle,
  setCurrentPage,
} from "../../../slices/boardSlice";
import { getBoardListAPI } from "../../../api/communityAPI";
import Filter from "../../../components/community/board/Filter";
import Search from "../../../components/community/common/Search";
import OneBoard from "../../../components/community/board/OneBoard";
import { validateSearchInputLength } from "../../../utils/validation";

interface Board {
  userNickname: string;
  userImagePath: string;
  boardId: string;
  title: string;
  category: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  createAt: Date;
  updateAt: Date;
  like: boolean; // 좋아요 여부
}

const Board = () => {
  const token = sessionStorage.getItem("access_token");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [boardList, setBoardList] = useState<Board[]>([]);

  const currentPage = useSelector(
    (state: RootState) => state.board.currentPage
  );
  const [totalItems, setTotalItems] = useState(0);

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const itemsPerPage = 3;

  const [sort, setSort] = useState("latest");
  const [searchWord, setSearchWord] = useState("");

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(validateSearchInputLength(value));
  };

  const searchBoard = () => {
    getBoardList();
    dispatch(setCurrentPage(1));
  };

  const getBoardList = async () => {
    const res = await getBoardListAPI(
      token,
      currentPage,
      itemsPerPage,
      sort,
      searchWord
    );

    setTotalItems(res.totalElements);
    setBoardList(res.content);
  };

  const toBoardWrite = () => {
    if (token) {
      dispatch(setBoardID("-1"));
      dispatch(setBoardCategory(""));
      dispatch(setBoardTitle(""));
      dispatch(setBoardContent(""));

      navigate("/community/board/write");
    } else {
      alert("로그인 후 이용가능합니다.");
    }
  };

  useEffect(() => {
    getBoardList();
  }, [currentPage]);

  useEffect(() => {
    getBoardList();
    dispatch(setCurrentPage(1));
  }, [sort]);

  useEffect(() => {
    if (searchWord === "") {
      getBoardList(); 
    }
  }, [searchWord]);

  const handleClickInitSearch = async () => {
    setSearchWord("");
    dispatch(setCurrentPage(1));
  }

  return (
    <div className="w-[100%] mt-10">
      <div>
        <div className="h-[2rem] flex justify-between items-end">
          <span className="text-3xl">자유게시판</span>
          <span className="w-[8rem] h-[2rem] inline-flex justify-center items-center border-black border rounded-full cursor-pointer" onClick={handleClickInitSearch}>검색 초기화</span>
        </div>
        <div className="flex mt-4 mb-2 justify-between items-center">
          <Filter sort={sort} handleSort={handleSort} />
          <Search
            searchValue={searchWord}
            handleSearchValue={handleSearchValue}
            searchList={searchBoard}
          />
        </div>

        {boardList[0] ? (
          boardList.map((board, index) => (
            <OneBoard key={index} board={board} />
          ))
        ) : (
          <span className="mt-[10rem] text-[1.5rem]">
            등록된 글이 없습니다.
          </span>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
        />
        <div className="flex justify-end mt-6">
          <div
            onClick={toBoardWrite}
            className="w-16 h-8 mb-10 text-center content-center text-md border border-black rounded-md cursor-pointer"
          >
            글쓰기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
