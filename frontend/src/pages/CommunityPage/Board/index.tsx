import { Link } from "react-router-dom";

import Input from "../../../components/elements/Input";
import Pagination from "../../../components/common/Pagination";

import { useEffect, useState } from "react";
import axiosTokenInstance from "../../../api/axiosTokenInstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as unlike,
  faEye,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../../../api/axiosInstance";

interface Board {
  userNickname: string;
  userImagePath: string;
  boardId: number;
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

  const [boardList, setBoardList] = useState<Board[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  // const [totalItems, setTotalItems] = useState(100);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 3;

  const getBoardList = async () => {
    if (token) {
      const res = await axiosTokenInstance.get("/board", {
        params: {
          searchWord: "",
          page: currentPage,
          size: itemsPerPage,
          sort: "latest",
        },
      });
      setBoardList(res.data.content);
    } else {
      const res = await axiosInstance.get("/board", {
        params: {
          searchWord: "",
          page: currentPage,
          size: itemsPerPage,
          sort: "latest",
        },
      });
      setBoardList(res.data.content);
    }
  };

  useEffect(() => {
    getBoardList();

    console.log(boardList);
    // setTotalItems();
  }, [currentPage]);

  return (
    <>
      <span>자유게시판</span>
      <div className="flex justify-between items-center">
        <div className="text-[0.7rem] opacity-50">
          <span className="mr-1">최신순</span>
          <span className="mr-1">인기순</span>
          <span className="mr-1">조회순</span>
          <span>댓글순</span>
        </div>
        <Input size="medium" className="h-[1.2rem]" />
      </div>
      {boardList.map((board, index) => (
        <div key={index} className="w-full border-t border-t-black-50">
          <Link
            to={`/community/board/${board.boardId}`}
            className="w-full flex m-2"
          >
            <img
              src={board.userImagePath}
              alt="프로필사진"
              className="w-24 h-24 object-cover border rounded-full border-black"
            />
            <div className="ml-4 w-[80%]">
              <div className="mt-2">{board.title}</div>
              <div className="text-xs mt-8">
                #
                {board?.category === "CHAT"
                  ? "잡담"
                  : board?.category === "WORRY"
                    ? "고민상담"
                    : "기타"}
              </div>
              <div className="w-full flex justify-between mt-1 opacity-50 text-xs">
                <div>
                  <span className="mr-2">{board.userNickname}</span>
                  <span>{}</span>
                </div>
                <div className="flex gap-2">
                  <span className="flex gap-2 mr-2">
                    <FontAwesomeIcon icon={unlike} />
                    {/* <FontAwesomeIcon icon={like} className="text-PrimaryRed" /> */}
                    {board.likeCnt}
                  </span>
                  <span className="flex gap-2 mr-2">
                    <FontAwesomeIcon icon={faEye} />
                    {board.viewCnt}
                  </span>
                  <span className="flex gap-2">
                    <FontAwesomeIcon icon={faMessage} />3
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
      />
      <div className="flex justify-end mt-6">
        <Link
          to={"/community/board/write"}
          className="w-16 h-6 text-center content-center text-xs border border-black rounded-md"
        >
          글쓰기
        </Link>
      </div>
    </>
  );
};

export default Board;
