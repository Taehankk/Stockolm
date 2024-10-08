import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

import Input from "../../../elements/Input";

import {
  getCommentListAPI,
  updateCommentAPI,
  deleteCommentAPI,
} from "../../../../api/communityAPI";

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

  const handleNewCommentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewCommentValue(value);
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
  const handleKeyUp = (
    commentID: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      updateComment(commentID); // Enter 키 입력 시 searchList 함수 호출
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
              <div className="flex justify-between items-center mb-5">
                <span className="text-2xl">{comment.userNickname}</span>
                <span className="text-sm opacity-50">
                  {comment.createAt?.slice(0, 16).replace("T", " ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                {!comment.isCommentInputOpen ? (
                  <span className="text-lg">{comment.content}</span>
                ) : (
                  <div className="flex w-[80%] justify-between items-center">
                    <Input
                      size="large"
                      value={newCommentValue}
                      onChange={handleNewCommentValue}
                      onKeyUp={(e) => handleKeyUp(comment.commentId, e)} // Enter 키 감지하는 핸들러 추가
                    />
                    <div className="flex gap-x-2">
                      <span
                        onClick={() => updateComment(comment.commentId)}
                        className="cursor-pointer w-10"
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
                        className="cursor-pointer w-10"
                      >
                        취소
                      </span>
                    </div>
                  </div>
                )}
                {comment.userNickname === nickName &&
                !comment.isCommentInputOpen ? (
                  <div className="flex opacity-50">
                    <span
                      onClick={() =>
                        openCommentInput(comment.commentId, comment.content)
                      }
                      children="수정"
                      className="cursor-pointer bg-white text-sm w-10"
                    />
                    <span
                      onClick={() => handleDeleteComment(comment.commentId)}
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
  );
};

export default CommentList;
