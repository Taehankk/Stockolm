import { useState } from "react";

import { RootState } from "../../store";
import { useSelector } from "react-redux";

import BasicLayout from "../../layouts/BasicLayout";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";
import WriteForm from "../../components/boardWrite/WriteForm";
import { writeBoardAPI } from "../../api/communityAPI";
import { useNavigate } from "react-router-dom";
import Category from "../../components/boardWrite/Category";

interface Board {
  title: string;
  content: string;
  category: string;
}

const BoardWritePage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("ETC");
  const [title, setTitle] = useState("");
  const boardContent = useSelector((state: RootState) => state.board.content);

  const handleCategory = (value: string) => {
    setCategory(value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const writeBoard = async () => {
    const board: Board = {
      title: title,
      content: boardContent,
      category: category,
    };

    if (title === "") {
      alert("제목을 입력해주세요");
    } else if (boardContent === "") {
      alert("내용을 입력해주세요");
    } else {
      console.log(boardContent);
      try {
        await writeBoardAPI(board);
        alert("글이 등록되었습니다.");
        navigate("/community/board");
      } catch {
        alert("글 등록 실패");
      }
    }
  };

  return (
    <BasicLayout>
      <div className="flex flex-col w-[80%] mt-4">
        <Category category={category} handleCategory={handleCategory} />

        <Input
          value={title}
          onChange={handleTitle}
          placeholder="제목을 입력해주세요"
          className="border-none"
        />

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
          <Button onClick={writeBoard} size="small" children="등록" />
        </div>
      </div>
    </BasicLayout>
  );
};

export default BoardWritePage;
