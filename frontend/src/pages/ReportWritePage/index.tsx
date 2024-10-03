// import { GoogleAuth } from "google-auth-library";

// import { pdfFormAPI, pdfOCRAPI, pdfSummaryAPI } from "../../api/communityAPI";
import { pdfSummaryAPI } from "../../api/communityAPI";
import WriteForm from "../../components/boardWrite/WriteForm";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import BasicLayout from "../../layouts/BasicLayout";
import { useState } from "react";

const ReportWritePage = () => {
  const ALLOW_FILW_EXTENSION = "pdf";

  const [text, setText] = useState("");
  // const [form, setForm] = useState("");
  // const [ocr, setOcr] = useState("");

  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("fileUploadValidHandler IN");
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files) {
      const lastIndex = files.name.lastIndexOf(".");
      const extension = files.name.substring(lastIndex + 1).toLocaleLowerCase();

      if (!(ALLOW_FILW_EXTENSION.indexOf(extension) > -1)) {
        alert("PDF 만 업로드 가능합니다.");
        return;
      }

      fileUploadHandler(files);
    }
  };

  const fileUploadHandler = async (file: File) => {
    console.log("fileUploadHandler IN");
    if (file) {
      console.log("file upload success");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64File = reader.result?.toString().split(",")[1]; // Base64 데이터 추출

        try {
          // GoogleAuth로 인증 처리
          // const auth = new GoogleAuth({
          //   scopes: "https://www.googleapis.com/auth/cloud-platform",
          // });

          // const client = await auth.getClient();
          // const token = await client.getAccessToken();

          // console.log(token);
          // OCR API 연결
          setText(await pdfSummaryAPI(base64File));
          // setForm(await pdfFormAPI(base64File));
          // setOcr(await pdfOCRAPI(base64File));
        } catch (e) {
          console.log(e);
        }

        // 결과물(요약본) 리턴 받아서 에디터에 뿌리기
      };
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
          </div>
        </div>
        <Input placeholder="제목을 입력해주세요" className="border-none" />

        {/* <div>글 작성 라이브러리 칸</div> */}
        <div className="h-40 mb-20">
          <WriteForm />
        </div>
        {text}
        {/* {form} */}

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
