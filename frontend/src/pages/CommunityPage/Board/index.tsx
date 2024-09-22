import { Link } from "react-router-dom";

const Board = () => {
  return (
    <>
      <div>자유게시판 내용</div>
      <div>
        <Link to={":id"} className="bg-rose-50">
          일반회원이 쓴 글
        </Link>
      </div>
      <Link to={"write"} className="bg-slate-300">
        일반회원의 board 글쓰기
      </Link>
    </>
  );
};

export default Board;
