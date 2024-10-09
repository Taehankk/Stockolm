import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

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

  const token = sessionStorage.getItem("access_token");
  const { id: boardID } = useParams();
  const nickName = useSelector((state: RootState) => state.user.userNickName);

  const [commentData, setCommentData] = useState<Comment[]>([]);

  const [newCommentValue, setNewCommentValue] = useState("");

  const getCommentList = async () => {
    try {
      const res = await getCommentListAPI(token, boardID!);

      setCommentData(res);
    } catch {
      alert("댓글 조회 실패");
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

  // onKeyDown 핸들러에서 Enter 키 감지
  // const handleKeyUp = (
  //   commentID: number,
  //   e: React.KeyboardEvent<HTMLTextAreaElement>
  // ) => {
  //   if (e.key === "Enter") {
  //     updateComment(commentID); // Enter 키 입력 시 searchList 함수 호출
  //   }
  // };

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
  }, []);

  useEffect(() => {
    handleCommentCount(commentData.length);
  }, [getCommentList]);

  return (
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
              <div className="flex items-center w-full">
                {!comment.isCommentInputOpen ? (
                  <div className="flex-col w-full">
                    <div className="flex w-full items-center mb-5 justify-between">
                      <span className="text-2xl">{comment.userNickname}</span>
                      <span className="flex text-sm opacity-50">
                        {comment.createAt?.slice(0, 16).replace("T", " ")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg min-h-[2rem] w-[70%] mr-20">
                        {comment.content}
                      </span>
                      {comment.userNickname === nickName && (
                        <div className="flex opacity-50 w-[20%]">
                          <span
                            onClick={() =>
                              openCommentInput(
                                comment.commentId,
                                comment.content
                              )
                            }
                            children="수정"
                            className="flex cursor-pointer bg-white text-sm w-10"
                          />
                          <span
                            onClick={() =>
                              handleDeleteComment(comment.commentId)
                            }
                            children="삭제"
                            className="flex cursor-pointer bg-white text-sm w-10"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-col w-full min-h-[6rem] items-center border border-black border-opacity-50 rounded-md p-1">
                    <span className="flex text-2xl mb-5">
                      {comment.userNickname}
                    </span>
                    <div className="flex items-center">
                      <textarea
                        ref={textareaRef}
                        value={newCommentValue}
                        onChange={handleNewCommentValue}
                        // onKeyUp={(e) => handleKeyUp(comment.commentId, e)} // Enter 키 감지하는 핸들러 추가
                        rows={1}
                        className="flex w-[70%] max-w-[70%] focus:outline-none focus:border-none text-lg rounded-md h-full mr-20 p-1 resize-none overflow-hidden"
                      />

                      <div className="flex gap-x-2 w-[20%] items-center justify-center">
                        <span
                          onClick={() => updateComment(comment.commentId)}
                          className="flex cursor-pointer text-sm bg-red-400 rounded-md justify-center text-center items-center w-10 h-8"
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
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-2xl mt-10">등록된 댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CommentList;
