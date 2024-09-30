import { useState } from "react";

import WriteForm from "../../components/boardWrite/WriteForm";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import BasicLayout from "../../layouts/BasicLayout";

const ReportWritePage = () => {
  const [file, setFile] = useState<File>();

  const ALLOW_FILW_EXTENSION = "pdf";

  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files) {
      const lastIndex = files.name.lastIndexOf(".");
      const extension = files.name.substring(lastIndex + 1).toLocaleLowerCase();

      if (!(ALLOW_FILW_EXTENSION.indexOf(extension) > -1)) {
        alert("PDF 만 업로드 가능합니다.");
        return;
      }

      setFile(files);
      fileUploadHandler();
    }
  };

  const fileUploadHandler = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // OCR API 연결
      //

      // 결과물(요약본) 리턴 받아서 에디터에 뿌리기
    }
  };

  return (
    <BasicLayout>
      <div className="flex flex-col w-full">
        <div>
          <span>주식종목</span>
          <span>삼성전자</span>
        </div>
        <div className="flex">
          <span>파일</span>
          <div>
            <Input
              type="file"
              onChange={fileUploadValidHandler}
              className="w-96"
            />
            <span>{file?.name}</span>
          </div>
        </div>
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

export default ReportWritePage;
