import { Link } from "react-router-dom";

import Input from "../../../components/elements/Input";

import Winter from "../../../assets/winter.jpg";

const Board = () => {
  const id = "10";
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
      <div className="w-full border-t border-t-black-50">
        <Link to={`/community/board/${id}`} className="w-full flex m-2">
          <img
            src={Winter}
            alt="프로필사진"
            className="w-24 h-24 object-cover border rounded-full border-black"
          />
          <div className="ml-4 w-[80%]">
            <div className="mt-2">자유게시판 글 제목입니다.</div>
            <div className="text-xs mt-8">#태그</div>
            <div className="w-full flex justify-between mt-1 opacity-50 text-xs">
              <div>
                <span className="mr-2">작성자</span>
                <span>1시간 전</span>
              </div>
              <div>
                <span className="mr-2">좋아요</span>
                <span className="mr-2">조회수</span>
                <span>댓글수</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="w-full border-t border-t-black-50">
        <Link to={`/community/board/${id}`} className="w-full flex m-2">
          <img
            src={Winter}
            alt="프로필사진"
            className="w-24 h-24 object-cover border rounded-full border-black"
          />
          <div className="ml-4 w-[80%]">
            <div className="mt-2">자유게시판 글 제목입니다.</div>
            <div className="text-xs mt-8">#태그</div>
            <div className="w-full flex justify-between mt-1 opacity-50 text-xs">
              <div>
                <span className="mr-2">작성자</span>
                <span>1시간 전</span>
              </div>
              <div>
                <span className="mr-2">좋아요</span>
                <span className="mr-2">조회수</span>
                <span>댓글수</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="w-full border-t border-t-black-50">
        <Link to={`/community/board/${id}`} className="w-full flex m-2">
          <img
            src={Winter}
            alt="프로필사진"
            className="w-24 h-24 object-cover border rounded-full border-black"
          />
          <div className="ml-4 w-[80%]">
            <div className="mt-2">자유게시판 글 제목입니다.</div>
            <div className="text-xs mt-8">#태그</div>
            <div className="w-full flex justify-between mt-1 opacity-50 text-xs">
              <div>
                <span className="mr-2">작성자</span>
                <span>1시간 전</span>
              </div>
              <div>
                <span className="mr-2">좋아요</span>
                <span className="mr-2">조회수</span>
                <span>댓글수</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
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
