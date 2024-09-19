import { Link } from "react-router-dom";

const Report = () => {
  return (
    <>
      <div>카드형태의 내용이 아래에 표시 노란색 : 카드</div>

      <Link to={"/analyst/report/:id"} className="bg-yellow-200">
        버튼클릭 할 시 애널리스트 페이지의 애널리스트가 작성한 글의
        detail페이지로
      </Link>
      <div>구분선입니다</div>
      <Link to={"write"} className="bg-slate-300">
        애널리스트의 글쓰기
      </Link>
    </>
  );
};

export default Report;
