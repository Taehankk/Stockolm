import { Link } from "react-router-dom";

const Report = () => {
  return (
    <>
      <div>
        <Link to={"detail"} className="bg-yellow-200">
          카드형태의 제목 클릭하는 버튼
        </Link>
      </div>
    </>
  );
};

export default Report;
