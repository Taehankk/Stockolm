import { useParams } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as unlike,
  faEye,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
// import { faHeart as like } from "@fortawesome/free-solid-svg-icons";

import Winter from "../../assets/winter.jpg";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import axiosTokenInstance from "../../api/axiosTokenInstance";

interface BoardData {
  userNickname: string;
  userImagePath: string;
  title: string;
  content: string;
  likeCnt: number;
  viewCnt: number;
  category: string;
  createAt: string;
  updateAt: string;
  isLike: boolean;
}

const BoardDetailPage = () => {
  const token = sessionStorage.getItem("access_token");

  const [boardData, setBoardData] = useState<BoardData>();

  const { id: boardID } = useParams();

  const getBoard = async () => {
    if (token) {
      const res = await axiosTokenInstance.get(`/board/${boardID}`);

      setBoardData(res.data);
    } else {
      const res = await axiosInstance.get(`/board/${boardID}`);
      setBoardData(res.data);
    }
  };

  const getComment = async () => {
    if (token) {
      const res = await axiosTokenInstance.get(`/comment/${boardID}`);
      console.log(res.data);
    } else {
      const res = await axiosInstance.get(`/comment/${boardID}`);
      console.log(res.data);
    }
  };

  useEffect(() => {
    getBoard();
    getComment();
  }, []);

  return (
    <BasicLayout>
      <div className="flex justify-center">
        <div className="flex flex-col w-[80%]">
          {/* 제목 */}
          <div className="text-[2rem]">{boardData?.title}</div>
          {/* 제목 밑 파트 */}
          {/* 시간, 좋아요, 조회수 */}
          <div className="text-xs w-full">
            <div className="flex text-sm mt-3">
              <span className="text-xs mr-12">
                #
                {boardData?.category === "CHAT"
                  ? "잡담"
                  : boardData?.category === "WORRY"
                    ? "고민상담"
                    : "기타"}
              </span>
              <div className="flex gap-2">
                <span className="flex gap-2 mr-2">
                  <FontAwesomeIcon icon={unlike} />
                  {/* <FontAwesomeIcon icon={like} className="text-PrimaryRed" /> */}
                  {boardData?.likeCnt}
                </span>
                <span className="flex gap-2 mr-2">
                  <FontAwesomeIcon icon={faEye} />
                  {boardData?.viewCnt}
                </span>
                <span className="flex gap-2">
                  <FontAwesomeIcon icon={faMessage} />
                </span>
              </div>
            </div>

            <div className="flex items-center my-2 w-full">
              <div className="flex items-center w-full">
                <img
                  src={boardData?.userImagePath}
                  alt="프로필사진"
                  className="w-6 h-6 mr-2 object-cover border rounded-full border-black"
                />
                {boardData?.userNickname}
              </div>
              <div className="flex w-full">
                <div className="mr-4">
                  <span className="mr-2">작성일</span>
                  <span>{boardData?.createAt.split("T")[0]}</span>
                </div>
                <div>
                  <span className="mr-2">수정일</span>
                  <span>{boardData?.updateAt.split("T")[0]}</span>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <span children="수정" className="bg-white text-sm w-10" />
                <span children="삭제" className="bg-white text-sm w-10" />
              </div>
            </div>

            <hr />

            <div className="text-lg p-4 min-h-64">{boardData?.content}</div>
            <hr />
            <div className="flex flex-col p-4">
              <div className="flex">
                <Input className="w-72 mr-2" />
                <Button size="small" children="등록" />
              </div>
              <div className="flex flex-col mt-4">
                {/* 댓글 하나 */}
                <div className="flex border-t-2 w-full p-4">
                  <div className="flex w-[20%] mr-4 items-center">
                    <img
                      className="h-[6rem] w-[6rem] object-cover rounded-full border border-black"
                      src={Winter}
                    />
                  </div>
                  <div className="flex w-[80%] flex-col text-base justify-between">
                    <span className="mb-4">작성자</span>
                    <span>
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다{" "}
                    </span>
                  </div>
                </div>
                {/* 댓글 하나 */}
                <div className="flex border-t-2 w-full p-4">
                  <div className="flex w-[20%] mr-4 items-center">
                    <img
                      className="h-[6rem] w-[6rem] object-cover rounded-full border border-black"
                      src={Winter}
                    />
                  </div>
                  <div className="flex w-[80%] flex-col text-base justify-between">
                    <span className="mb-4">작성자</span>
                    <span>
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다{" "}
                    </span>
                  </div>
                </div>
                {/* 댓글 하나 */}
                <div className="flex border-t-2 w-full p-4">
                  <div className="flex w-[20%] mr-4 items-center">
                    <img
                      className="h-[6rem] w-[6rem] object-cover rounded-full border border-black"
                      src={Winter}
                    />
                  </div>
                  <div className="flex w-[80%] flex-col text-base justify-between">
                    <span className="mb-4">작성자</span>
                    <span>
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다
                      댓글 내용을 여기다 띄울겁니다 댓글 내용을 여기다
                      띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글 내용을
                      여기다 띄울겁니다 댓글 내용을 여기다 띄울겁니다 댓글
                      내용을 여기다 띄울겁니다{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardDetailPage;
