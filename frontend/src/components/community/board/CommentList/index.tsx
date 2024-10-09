import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

import dompurify from "dompurify";

import {
  getCommentListAPI,
  updateCommentAPI,
  deleteCommentAPI,
} from "../../../../api/communityAPI";
import { validateCommentInputLength } from "../../../../utils/validation";

interface Comment {
  commentId: number;
  userId: number; // 댓글 작성자의 id -> 이걸 활용해 사용자 = 댓글 작성자인 경우만 "수정/삭제" 버튼을 보여주기
  userNickname: string;
  userImagePath: string;
  content: string;
  createAt: string;
  updateAt: string;
  isCommentInputOpen: boolean;
}

interface Props {
  handleCommentCount: (value: number) => void;
}
const CommentList = ({ handleCommentCount }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 스크립트를 활용하여 javascript와 HTML로 악성 코드를 웹 브라우저에 심어,
  // 사용자 접속시 그 악성코드가 실행되는 것을 XSS, 보안을 위해 sanitize 추가
  const sanitizer = dompurify.sanitize;

  const token = sessionStorage.getItem("access_token");
  const { id: boardID } = useParams();
  const nickName = useSelector((state: RootState) => state.user.userNickName);

  const [commentData, setCommentData] = useState<Comment[]>([]);

  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [newCommentValue, setNewCommentValue] = useState("");

  const getCommentList = async () => {
    try {
      const res = await getCommentListAPI(token, boardID!);

      setCommentData(res);
    } catch {
      alert("댓글 조회 실패");
    }
  };

  const toggleExpand = (commentID: number) => {
    if (expandedComments.includes(commentID)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentID)); // 더보기 상태 해제
    } else {
      setExpandedComments([...expandedComments, commentID]); // 더보기 상태 추가
    }
  };

  const handleNewCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewCommentValue(validateCommentInputLength(value));

    // 입력할 때마다 높이 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 자동으로 맞추기 위해 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 입력된 내용에 따라 높이 조정
    }
  };

  const openCommentInput = (commentID: number, comment: string) => {
    setCommentData((prevComments) =>
      prevComments.map((item) =>
        item.commentId === commentID
          ? { ...item, isCommentInputOpen: true }
          : { ...item, isCommentInputOpen: false }
      )
    );
    setNewCommentValue(comment);
  };

  const updateComment = async (commentID: number) => {
    if (newCommentValue !== "") {
      try {
        await updateCommentAPI(commentID, newCommentValue);
        setCommentData((prevComments) =>
          prevComments.map((item) =>
            item.commentId === commentID
              ? { ...item, isCommentInputOpen: false }
              : item
          )
        );
        alert("댓글 수정 완료");
        window.location.reload();
      } catch {
        alert("댓글 수정 실패");
      }
    } else {
      alert("댓글을 입력해주세요");
    }
  };

  // 핸들러에서 Enter 키 감지
  // const handleKeyUp = (
  //   commentID: number,
  //   e: React.KeyboardEvent<HTMLTextAreaElement>
  // ) => {
  //   if (e.key === "Enter") {
  //     updateComment(commentID); // Enter 키 입력 시 searchList 함수 호출
  //   }
  // };

  // onKeyDown 핸들러에서 Enter 키 감지
  const handleKeyDown = (
    commentID: number,
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift + Enter인 경우 줄 바꿈 허용
        return;
      } else {
        // Enter만 누르면 댓글 등록
        e.preventDefault(); // Enter 입력에 따른 기본 동작(줄 바꿈)을 막음
        updateComment(commentID); // 댓글 등록 함수 호출
      }
    }
  };

  const cancelUpdateComment = async (commentID: number, comment: string) => {
    setCommentData((prevComments) =>
      prevComments.map((item) =>
        item.commentId === commentID
          ? { ...item, isCommentInputOpen: false }
          : item
      )
    );
    setNewCommentValue(comment);
  };

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
    getCommentList();
    console.log(CommentList);
  }, []);

  useEffect(() => {
    handleCommentCount(commentData.length);
  }, [getCommentList]);

  return (
    <div className="flex flex-col w-full mt-4 items-center">
      {commentData[0] ? (
        commentData.map((comment, index) => {
          const isExpanded = expandedComments.includes(comment.commentId);
          return (
            <div key={index} className="flex-col border-t-2 w-full p-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    className="h-[4rem] w-[4rem] object-cover rounded-full border-black"
                    src={comment.userImagePath}
                  />
                </div>
                <div className="flex-col items-center justify-between">
                  <span className="flex text-2xl mb-2">
                    {comment.userNickname}
                  </span>
                  <span className="flex text-sm opacity-50">
                    {comment.createAt?.slice(0, 16).replace("T", " ")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full mt-4">
                {!comment.isCommentInputOpen ? (
                  <div className="flex items-start w-full">
                    <div className="flex flex-col w-[80%]">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizer(
                            comment?.content.replace(/\n/g, "<br>")
                          ), // \n을 <br>로 변환
                        }}
                        className={`text-lg min-h-[2rem] w-[80%] mr-20 whitespace-pre-wrap word-break break-all ${
                          !isExpanded ? "line-clamp-3 overflow-hidden" : ""
                        }`}
                      ></span>
                      {comment.content.split("\n").length > 3 && ( // 3줄 이상인 경우에만 더보기/간략히 버튼 보여줌
                        <div
                          className="flex w-[20%] cursor-pointer text-blue-500 mt-2"
                          onClick={() => toggleExpand(comment.commentId)}
                        >
                          {isExpanded ? "간략히" : "더보기"}
                        </div>
                      )}
                    </div>

                    {comment.userNickname === nickName && (
                      <div className="flex w-[20%] opacity-50">
                        <span
                          onClick={() =>
                            openCommentInput(comment.commentId, comment.content)
                          }
                          children="수정"
                          className="flex cursor-pointer bg-white text-sm w-10"
                        />
                        <span
                          onClick={() => handleDeleteComment(comment.commentId)}
                          children="삭제"
                          className="flex cursor-pointer bg-white text-sm w-10"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex-col w-full min-h-[6rem] max-h-[6rem] items-center border border-black border-opacity-50 rounded-md p-1">
                      <div className="flex w-full h-full items-center">
                        <textarea
                          ref={textareaRef}
                          value={newCommentValue}
                          onChange={handleNewCommentValue}
                          onKeyDown={(e) => handleKeyDown(comment.commentId, e)} // Enter 키 감지하는 핸들러 추가
                          rows={3}
                          className="flex w-full h-full min-h-[5rem] max-h-[5rem] focus:outline-none focus:border-none text-lg rounded-md p-1 resize-none overflow-auto scrollbar-hide"
                        />
                      </div>
                    </div>
                    <div className="flex gap-x-2 mt-2 justify-end">
                      <span
                        onClick={() => updateComment(comment.commentId)}
                        className="flex cursor-pointer text-sm text-white bg-red-400 rounded-md justify-center text-center items-center w-10 h-8"
                      >
                        수정
                      </span>
                      <span
                        onClick={() =>
                          cancelUpdateComment(
                            comment.commentId,
                            comment.content
                          )
                        }
                        className="flex cursor-pointer text-sm w-10 h-8 justify-center text-center items-center"
                      >
                        취소
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-2xl mt-10">등록된 댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CommentList;
