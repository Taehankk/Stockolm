import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import {
  faChevronLeft,
  faHeart as like,
} from "@fortawesome/free-solid-svg-icons";

import {
  changeLikeStateAPI,
  deleteBoardAPI,
  getBoardAPI,
  writeCommentAPI,
} from "../../api/communityAPI";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { getUserInfo } from "../../slices/userSlice";
import {
  setBoardCategory,
  setBoardContent,
  setBoardID,
  setBoardTitle,
} from "../../slices/boardSlice";
import CommentList from "../../components/community/board/CommentList";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 스크립트를 활용하여 javascript와 HTML로 악성 코드를 웹 브라우저에 심어,
  // 사용자 접속시 그 악성코드가 실행되는 것을 XSS, 보안을 위해 sanitize 추가
  const sanitizer = dompurify.sanitize;

  const token = sessionStorage.getItem("access_token");

  const [isLike, setLike] = useState(false);
  const [boardLike, setBoardLike] = useState(0);

  const nickName = useSelector((state: RootState) => state.user.userNickName);

  const [boardData, setBoardData] = useState<BoardData>();
  const [commentLength, setCommentLength] = useState(0);

  const [commentValue, setCommentValue] = useState("");

  const { id: boardID } = useParams();

  const backToBoardList = () => {
    navigate("/community/board");
  };

  const handleLike = async () => {
    if (boardData?.userNickname !== nickName) {
      try {
        setLike(!isLike);
        if (isLike) {
          setBoardLike(boardLike - 1);
        } else {
          setBoardLike(boardLike + 1);
        }
        await changeLikeStateAPI(boardID!);
      } catch {
        alert("좋아요 변경 실패");
      }
    }
  };

  const getBoard = async () => {
    try {
      const res = await getBoardAPI(token, boardID!);

      setBoardData(res);
      setLike(res.like);
      setBoardLike(res.likeCnt);
    } catch {
      alert("게시판 상세 조회 실패");
    }
  };

  const handleCommentCount = (value: number) => {
    setCommentLength(value);
  };

  const openBoardUpdate = () => {
    dispatch(setBoardID(boardID!));
    dispatch(setBoardTitle(boardData?.title || ""));
    dispatch(setBoardCategory(boardData?.category || "ETC"));
    dispatch(setBoardContent(boardData?.content || ""));
    navigate("/community/board/write");
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

  const handleCommentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentValue(value);
  };

  const registComment = async () => {
    if (commentValue !== "") {
      try {
        await writeCommentAPI(Number(boardID!), commentValue);
        alert("댓글 등록 완료");
        window.location.reload();
      } catch {
        alert("댓글 등록 실패");
      }
    } else {
      alert("댓글을 입력하세요");
    }
  };

  // onKeyDown 핸들러에서 Enter 키 감지
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      registComment(); // Enter 키 입력 시 searchList 함수 호출
    }
  };

  useEffect(() => {
    getBoard();
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token]);

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
          <div className="w-full">
            <div className="flex text-sm mt-3">
              <span className="mr-12">
                #
                {boardData?.category === "CHAT"
                  ? "잡담"
                  : boardData?.category === "WORRY"
                    ? "고민상담"
                    : "기타"}
              </span>
              <div className="flex gap-2">
                <span className="flex gap-2 mr-2">
                  <div>
                    <FontAwesomeIcon icon={unlike} />
                  </div>
                  {boardLike}
                </span>
                <span className="flex gap-2 mr-2">
                  <FontAwesomeIcon icon={faEye} />
                  {boardData?.viewCnt}
                </span>
                <span className="flex gap-2">
                  <FontAwesomeIcon icon={faMessage} />
                  {commentLength}
                </span>
              </div>
            </div>

            <div className="flex items-center my-2 w-full h-fit">
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
                    onClick={openBoardUpdate}
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
                <div
                  onClick={handleLike}
                  className="flex mb-1 text-2xl cursor-pointer"
                >
                  {isLike ? (
                    <FontAwesomeIcon icon={like} className="text-PrimaryRed" />
                  ) : (
                    <FontAwesomeIcon icon={unlike} className="text-2xl" />
                  )}
                </div>
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
                    onKeyUp={handleKeyUp} // Enter 키 감지하는 핸들러 추가
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
              <CommentList handleCommentCount={handleCommentCount} />
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardDetailPage;
