import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import dompurify from "dompurify";

import BasicLayout from "../../layouts/BasicLayout";
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
import { validateCommentInputLength } from "../../utils/validation";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentValue(validateCommentInputLength(value));

    // 입력할 때마다 높이 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 자동으로 맞추기 위해 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 입력된 내용에 따라 높이 조정
    }
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift + Enter인 경우 줄 바꿈 허용
        return;
      } else {
        // Enter만 누르면 댓글 등록
        e.preventDefault(); // Enter 입력에 따른 기본 동작(줄 바꿈)을 막음
        registComment(); // 댓글 등록 함수 호출
      }
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
              <span className="mr-24">
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
              <div className="flex min-w-[6rem] items-center mr-10">
                <img
                  src={boardData?.userImagePath}
                  alt="프로필사진"
                  className="w-6 h-6 mr-2 object-cover border rounded-full border-black"
                />
                {boardData?.userNickname}
              </div>
              <div className="flex mr-10">
                <div className="min-w-[10rem] mr-4">
                  <span className=" mr-2">작성일</span>
                  <span>{boardData?.createAt.split("T")[0]}</span>
                </div>
                <div className="min-w-[10rem] ">
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
                  className="flex mb-1 text-2xl cursor-pointer justify-end w-full"
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
            <div className="flex flex-col p-4 w-full justify-center mb-10">
              {token ? (
                <div className="flex w-full items-center">
                  <textarea
                    ref={textareaRef}
                    value={commentValue}
                    onChange={handleCommentValue}
                    onKeyDown={handleKeyDown} // Enter 키 감지하는 핸들러 추가
                    placeholder="댓글을 입력하세요 (Shift + Enter : 줄 바꿈)"
                    rows={1}
                    className="flex border border-black rounded-3xl w-[80%] mr-2 p-2 resize-none overflow-hidden"
                  />
                  <Button
                    onClick={registComment}
                    children="등록"
                    className="w-[15%]"
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
