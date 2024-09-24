import BasicLayout from "../../layouts/BasicLayout";
import Button from "../../components/elements/Button";

import Winter from "../../assets/winter.jpg";

const BoardDetailPage = () => {
  return (
    <BasicLayout>
      {/* 제목 */}
      <div className="text-xl">자유게시판 글 제목입니다.</div>
      {/* 제목 밑 파트 */}
      {/* 시간, 좋아요, 조회수 */}
      <div className="text-xs w-full">
        <div className="flex opacity-50 text-sm mt-3">
          <span className="text-xs mr-12">#태그</span>
          <div className="">
            <span className="mr-2">좋아요</span>
            <span className="mr-2">조회수</span>
            <span>댓글수</span>
          </div>
        </div>

        <div className="flex items-center mt-3">
          <div className="flex mr-12">
            <img
              src={Winter}
              alt="프로필사진"
              className="w-6 h-6 object-cover border rounded-full border-black"
            />
          </div>
          작성자
          <div className="flex">
            <div className="mr-4">
              <span className="mr-2">작성일</span>
              <span>24.09.08</span>
            </div>
            <div>
              <span className="mr-2">수정일</span>
              <span>24.09.12</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="small"
              color="black"
              children="수정"
              className="bg-white text-sm w-10"
            />
            <Button
              size="small"
              color="black"
              children="삭제"
              className="bg-white text-sm w-10"
            />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardDetailPage;
