// import { GoogleAuth } from "google-auth-library";

import { pdfFormAPI, pdfSummaryAPI } from "../../api/communityAPI";
// import { pdfSummaryAPI } from "../../api/communityAPI";

// import { useState } from "react";

import WriteForm from "../../components/boardWrite/WriteForm";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import BasicLayout from "../../layouts/BasicLayout";
// import { RootState, useAppDispatch } from "../../store";
import { useAppDispatch } from "../../store";
import { setReportContent } from "../../slices/reportSlice";
// import { useSelector } from "react-redux";

const ReportWritePage = () => {
  const ALLOW_FILW_EXTENSION = "pdf";

  const dispatch = useAppDispatch();

  // const [summary, setSummary] = useState("");
  // const [form, setForm] = useState([]);

  // const [goalDate, setGoalDate] = useState("");

  // const currentStock = useSelector(
  //   (state: RootState) => state.report.currentStock
  // );
  // const goalStock = useSelector((state: RootState) => state.report.goalStock);
  // const createAt = useSelector((state: RootState) => state.report.createAt);

  const summaryPdfFile = async (file: string) => {
    const form = await pdfFormAPI(file);
    const value3 = form[3]?.mentionText.replace(/,/g, "") || "0"; // 기본값 0 설정
    const value4 = form[4]?.mentionText.replace(/,/g, "") || "0";

    const percent = (Number(value4) - Number(value3)) / Number(value3);

    // Document AI API 연결
    // dispatch(setReportContent("<p>" + (await pdfSummaryAPI(file)) + "</p>"));
    // console.log(Number(form[4].mentionText));

    dispatch(
      setReportContent(
        "<h2><u>📈" +
          form[5].mentionText +
          "주가 예측</h2></u><h3>현재 주가 : " +
          form[3].mentionText +
          " 원</h3><h3>목표 주가 : " +
          form[4].mentionText +
          " 원			[" +
          form[0].mentionText +
          " 대비 <span style='color: rgb(230, 0, 0);'>" +
          Number(percent.toPrecision(3)) * 100 +
          "%</span> 주가 상승 예상]</h3><p><br></p><p><br></p><h2><u>🔍 주가 예측 근거 요약</u></h2><h3>" +
          (await pdfSummaryAPI(file)) +
          "</h3>"
      )
    );
    await pdfSummaryAPI(file);
  };

  const fileUploadHandler = async (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64File = reader.result?.toString().split(",")[1]; // Base64 데이터 추출

        try {
          if (base64File) {
            summaryPdfFile(base64File);
          }
        } catch (e) {
          console.log(e);
        }
      };
    }
  };

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

      fileUploadHandler(files);
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

        {/* 글 작성 라이브러리 칸 */}
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
