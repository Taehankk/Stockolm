import { useNavigate, useParams } from "react-router-dom";
import dompurify from "dompurify";

import BasicLayout from "../../layouts/BasicLayout";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as unlike,
  faEye,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import axiosTokenInstance from "../../api/axiosTokenInstance";
import {
  changeLikeStateAPI,
  deleteBoardAPI,
  deleteCommentAPI,
  writeCommentAPI,
} from "../../api/communityAPI";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";

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

interface Comment {
  commentId: number;
  userId: number; // 댓글 작성자의 id -> 이걸 활용해 사용자 = 댓글 작성자인 경우만 "수정/삭제" 버튼을 보여주기
  userNickname: string;
  userImagePath: string;
  content: string;
  createAt: string;
  updateAt: string;
}

const BoardDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 스크립트를 활용하여 javascript와 HTML로 악성 코드를 웹 브라우저에 심어,
  // 사용자 접속시 그 악성코드가 실행되는 것을 XSS, 보안을 위해 sanitize 추가
  const sanitizer = dompurify.sanitize;

  const token = sessionStorage.getItem("access_token");

  const [isLike, setLike] = useState(false);

  const nickName = useSelector((state: RootState) => state.user.userNickName);

  const [boardData, setBoardData] = useState<BoardData>();
  const [commentData, setCommentData] = useState<Comment[]>([]);

  const [commentValue, setCommentValue] = useState("");

  const { id: boardID } = useParams();

  const backToBoardList = () => {
    navigate("/community/board");
  };

  const handleLike = async () => {
    try {
      setLike(!isLike);
      await changeLikeStateAPI(boardID!);
    } catch {
      alert("좋아요 변경 실패");
    }
  };

  const getBoard = async () => {
    if (token) {
      const res = await axiosTokenInstance.get(`/board/${boardID}`);

      setBoardData(res.data);
      setLike(res.data.like);
    } else {
      const res = await axiosInstance.get(`/board/${boardID}`);

      setBoardData(res.data);
      setLike(res.data.like);
    }
  };

  const handleBoardDelete = async (id: string) => {
    try {
      await deleteBoardAPI(id);
      alert("게시글 삭제 완료");
      navigate("/community/board");
    } catch {
      alert("게시글 삭제 실패");
    }
  };

  const getComment = async () => {
    if (token) {
      const res = await axiosTokenInstance.get(`/comment/${boardID}`);
      console.log(res);
      setCommentData(res.data);
    } else {
      const res = await axiosInstance.get(`/comment/${boardID}`);
      console.log(res);
      setCommentData(res.data);
    }
  };

  const handleCommentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentValue(value);
  };

  const registComment = async () => {
    if (commentValue !== "") {
      await writeCommentAPI(boardID!, commentValue);
      alert("댓글 등록 완료");
      window.location.reload();
    } else {
      alert("댓글을 입력하세요");
    }
  };

  const openCommentInput = () => {};

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteCommentAPI(id);
      alert("댓글 삭제 완료");
      window.location.reload();
    } catch {
      alert("댓글 삭제 실패");
    }
  };

  useEffect(() => {
    getBoard();
    getComment();
    dispatch(getUserInfo());
  }, []);

  return (
    <BasicLayout>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col w-[60%]">
          <div
            onClick={backToBoardList}
            className="cursor-pointer text-3xl mb-10"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-4" />
            자유게시판
          </div>
          {/* 제목 */}
          <div className="text-4xl">{boardData?.title}</div>
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
                  <div onClick={handleLike}>
                    {isLike ? (
                      <FontAwesomeIcon
                        icon={like}
                        className="text-PrimaryRed"
                      />
                    ) : (
                      <FontAwesomeIcon icon={unlike} />
                    )}
                  </div>
                  {boardData?.likeCnt}
                </span>
                <span className="flex gap-2 mr-2">
                  <FontAwesomeIcon icon={faEye} />
                  {boardData?.viewCnt}
                </span>
                <span className="flex gap-2">
                  <FontAwesomeIcon icon={faMessage} />
                  {commentData.length}
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
                  {boardData?.updateAt ? (
                    <span>{boardData?.updateAt.split("T")[0]}</span>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              {boardData?.userNickname === nickName ? (
                <div className="flex justify-end w-full">
                  <span
                    children="수정"
                    className="cursor-pointer bg-white text-sm w-10"
                  />
                  <span
                    onClick={() => handleBoardDelete(boardID!)}
                    children="삭제"
                    className="cursor-pointer bg-white text-sm w-10"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <hr />

            <div
              dangerouslySetInnerHTML={{
                __html: sanitizer(`${boardData?.content}`),
              }}
              className="text-lg p-4 min-h-64"
            ></div>
            <hr />
            <div className="flex flex-col p-4">
              {token ? (
                <div className="flex">
                  <Input
                    value={commentValue}
                    onChange={handleCommentValue}
                    className="rounded-3xl w-[40rem] mr-2"
                  />
                  <Button
                    size="small"
                    onClick={registComment}
                    children="등록"
                  />
                </div>
              ) : (
                ""
              )}

              <div className="flex flex-col mt-4 items-center">
                {commentData[0] ? (
                  commentData.map((comment, index) => (
                    <div key={index} className="flex border-t-2 w-full p-4">
                      <div className="flex w-[20%] mr-4 items-center">
                        <img
                          className="h-[6rem] w-[6rem] object-cover rounded-full border border-black"
                          src={comment.userImagePath}
                        />
                      </div>
                      <div className="flex w-[80%] flex-col mt-2">
                        <div className="flex justify-between items-center mb-5">
                          <span className="text-2xl">
                            {comment.userNickname}
                          </span>
                          <span className="text-sm opacity-50">
                            {comment.createAt?.slice(0, 16).replace("T", " ")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg">{comment.content}</span>
                          {comment.userNickname === nickName ? (
                            <div className="flex opacity-50">
                              <span
                                onClick={openCommentInput}
                                children="수정"
                                className="cursor-pointer bg-white text-sm w-10"
                              />
                              <span
                                onClick={() =>
                                  handleDeleteComment(comment.commentId)
                                }
                                children="삭제"
                                className="cursor-pointer bg-white text-sm w-10"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-2xl mt-10">등록된 댓글이 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardDetailPage;
