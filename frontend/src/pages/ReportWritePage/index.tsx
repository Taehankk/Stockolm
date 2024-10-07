import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  pdfFormAPI,
  pdfSummaryAPI,
  writeReportAPI,
} from "../../api/communityAPI";

import WriteForm from "../../components/boardWrite/WriteForm";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import BasicLayout from "../../layouts/BasicLayout";

import { RootState, useAppDispatch } from "../../store";
import {
  setStockName,
  setCurrentStock,
  setGoalDate,
  setGoalStock,
  setReportContent,
  setReportTitle,
  setOpinion,
  setMarketCapitalization,
} from "../../slices/reportSlice";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface Report {
  title: string;
  content: string;
  stockName: string;
  opinion: string;
  goalStock: number;
  currentStock: number;
  marketCapitalization: number;
  goalDate: Date;
}

const ReportWritePage = () => {
  const ALLOW_FILW_EXTENSION = "pdf";

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [base64File, setBase64File] = useState("");

  const stockName = useSelector((state: RootState) => state.report.stockName);
  const reportTitle = useSelector((state: RootState) => state.report.title);
  const goalDate = useSelector((state: RootState) => state.report.goalDate);
  const currentStock = useSelector(
    (state: RootState) => state.report.currentStock
  );
  const goalStock = useSelector((state: RootState) => state.report.goalStock);
  const opinion = useSelector((state: RootState) => state.report.opinion);
  const marketCapitalization = useSelector(
    (state: RootState) => state.report.marketCapitalization
  );
  const reportContent = useSelector((state: RootState) => state.report.content);

  const [predictDate, setPredictDate] = useState("");

  const backToBoardList = () => {
    navigate("/community/board");
  };

  const summaryPdfFile = async (file: string) => {
    try {
      const form = await pdfFormAPI(file);

      dispatch(setStockName(form[1].mentionText));
      dispatch(setGoalDate(form[5].mentionText));
      dispatch(setCurrentStock(form[3]?.mentionText.replace(/,/g, "")));
      dispatch(setGoalStock(form[4]?.mentionText.replace(/,/g, "")));
      dispatch(setOpinion(form[6].mentionText));
      dispatch(setMarketCapitalization(form[2]?.mentionText.replace(/,/g, "")));
      setPredictDate(form[0].mentionText);
    } catch {
      alert("STOCKOLM 제공 파일 양식인지 확인해주세요");
    }
  };

  const fileUploadHandler = async (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const result = reader.result?.toString().split(",")[1] || "";
        setBase64File(result);
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

  const handleReportTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setReportTitle(value));
  };

  const writeReport = async () => {
    try {
      const report: Report = {
        title: reportTitle,
        content: reportContent,
        stockName: stockName,
        opinion: opinion,
        goalStock: goalStock,
        currentStock: currentStock,
        marketCapitalization: marketCapitalization,
        goalDate: new Date("20" + goalDate.replace(/\./g, "-")),
      };

      await writeReportAPI(report);

      dispatch(setReportTitle(""));
      dispatch(setStockName(""));
      dispatch(setGoalDate(""));
      dispatch(setCurrentStock(0));
      dispatch(setGoalStock(0));
      dispatch(setOpinion(""));
      dispatch(setMarketCapitalization(0));

      navigate("/community/report");
    } catch {
      console.log("게시글 등록 실패");
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (base64File) {
      summaryPdfFile(base64File); // base64File이 업데이트된 후 실행
    }
  }, [base64File]);

  // 상태가 업데이트된 후에 추가 작업 수행
  useEffect(() => {
    // 비동기 함수를 useEffect 내부에서 선언
    const fetchSummaryContent = async () => {
      if (goalStock !== 0 && currentStock !== 0) {
        // goalStock과 currentStock이 업데이트된 후에만 실행
        const percentValue =
          (Number(goalStock) - Number(currentStock)) / Number(currentStock);
        const percentStyle =
          percentValue < 0 ? "rgb(0, 0, 255)" : "rgb(230, 0, 0)";

        try {
          const summaryContent = await pdfSummaryAPI(base64File); // 비동기 호출

          const content =
            "<h2><u>📈" +
            goalDate +
            "주가 예측</u></h2><h3>현재 주가 : " +
            currentStock +
            " 원</h3><h3>목표 주가 : " +
            goalStock +
            " 원 [" +
            predictDate +
            " 대비 <span style='color: " +
            percentStyle +
            ";'>" +
            Number(percentValue.toPrecision(3)) * 100 +
            "%</span> 주가 상승 예상]</h3><p><br></p><p><br></p><h2><u>🔍 주가 예측 근거 요약</u></h2><h3>" +
            summaryContent +
            "</h3>";

          dispatch(setReportContent(content)); // 상태 업데이트
        } catch (error) {
          console.log("에러 발생:", error);
        }
      }
    };

    // 선언된 비동기 함수 호출
    fetchSummaryContent();
  }, [goalStock, currentStock]); // 상태가 변경될 때만 실행

  return (
    <BasicLayout>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col">
          <div
            onClick={backToBoardList}
            className="cursor-pointer text-3xl mb-10"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-4" />
            자유게시판
          </div>
          <div className="w-full">
            <span className="mr-2">주식종목</span>
            <span className="rounded-full border border-black">
              {stockName}
            </span>
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
          <Input
            value={reportTitle}
            onChange={handleReportTitle}
            placeholder="제목을 입력해주세요"
            className="border-none"
          />

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
            <Button size="small" children="등록" onClick={writeReport} />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ReportWritePage;
