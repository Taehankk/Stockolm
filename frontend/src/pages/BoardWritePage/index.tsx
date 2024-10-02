import BasicLayout from "../../layouts/BasicLayout";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";
import WriteForm from "../../components/boardWrite/WriteForm";
import { useState } from "react";

const BoardWritePage = () => {
  const [category, setCategory] = useState(2);

  const handleCategory = (index: number) => {
    setCategory(index);
  };

  return (
    <BasicLayout>
      <div className="flex flex-col w-[80%] mt-4">
        <div className="flex gap-2 items-center">
          <span>카테고리</span>
          <div className="flex gap-2">
            <div
              onClick={() => handleCategory(0)}
              className={`border ${category === 0 ? "border-black" : "border-opacity-50"} rounded-md w-[6rem] h-[2rem] text-center content-center`}
            >
              고민상담
            </div>
            <div
              onClick={() => handleCategory(1)}
              className={`border ${category === 1 ? "border-black" : "border-opacity-50"} rounded-md w-[6rem] h-[2rem] text-center content-center`}
            >
              잡담
            </div>
            <div
              onClick={() => handleCategory(2)}
              className={`border ${category === 2 ? "border-black" : "border-opacity-50"} rounded-md w-[6rem] h-[2rem] text-center content-center`}
            >
              기타
            </div>
          </div>
        </div>
        <div className="flex"></div>
        <Input placeholder="제목을 입력해주세요" className="border-none" />

        {/* <div>글 작성 라이브러리 칸</div> */}
        <div className="h-40 mb-20">
          <WriteForm />
        </div>

        <div className="flex justify-end">
          <Button
            size="small"
            color="black"
            border="black"
            children="취소"
            className="bg-white"
          />
          <Button size="small" children="등록" />
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardWritePage;
