import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as unlike,
  faEye,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";

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

interface Props {
  board: Board;
}

const OneBoard = ({ board }: Props) => {
  return (
    <div className="w-full border-t border-t-black-50">
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
          <div className="w-full flex justify-between mt-1 text-xs">
            <div>
              <span className="opacity-50 mr-2">{board.userNickname}</span>
              <span>{}</span>
            </div>
            <div className="flex gap-2">
              <span className="flex gap-2 mr-2">
                {board.like ? (
                  <FontAwesomeIcon icon={like} className="text-PrimaryRed" />
                ) : (
                  <FontAwesomeIcon icon={unlike} className="opacity-50" />
                )}

                {board.likeCnt}
              </span>
              <span className="opacity-50 flex gap-2 mr-2">
                <FontAwesomeIcon icon={faEye} />
                {board.viewCnt}
              </span>
              <span className="opacity-50 flex gap-2">
                <FontAwesomeIcon icon={faMessage} />
                {board.commentCnt}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OneBoard;
