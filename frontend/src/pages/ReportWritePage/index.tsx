import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  pdfFormAPI,
  pdfSummaryAPI,
  uploadPdfAPI,
  writeReportAPI,
} from "../../api/communityAPI";

import WriteForm from "../../components/boardWrite/WriteForm";
import Button from "../../components/elements/Button";
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
  setFilePath,
} from "../../slices/reportSlice";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { validateTitleInputLength } from "../../utils/validation";

interface Report {
  title: string;
  stockName: string;
  opinion: string;
  goalStock: number;
  currentStock: number;
  marketCapitalization: number;
  content: string;
  goalDate: Date;
  filePath: string;
}

const ReportWritePage = () => {
  const ALLOW_FILW_EXTENSION = "pdf";

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [fileName, setFileName] = useState(
    "STOCKOLM 에서 제공한 PDF를 작성하여 업로드 해주세요."
  );

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
  const filePath = useSelector((state: RootState) => state.report.filePath);

  const [predictDate, setPredictDate] = useState("");

  const backToReportList = () => {
    navigate("/community/report");
  };

  const uploadPdfFile = async (file: File) => {
    try {
      const res = await uploadPdfAPI(file);
      dispatch(setFilePath(res));
    } catch (e) {
      console.log(e);
      alert("파일 업로드 실패");
    }
  };

  const summaryPdfFile = async (file: string) => {
    try {
      const form = await pdfFormAPI(file);
      dispatch(setStockName(form[1].mentionText || ""));
      dispatch(setGoalDate(form[5].mentionText || ""));
      dispatch(setCurrentStock(form[3]?.mentionText.replace(/,/g, "") || 0));
      dispatch(setGoalStock(form[4]?.mentionText.replace(/,/g, "") || 0));
      dispatch(setOpinion(form[6].mentionText) || "");
      dispatch(
        setMarketCapitalization(form[2]?.mentionText.replace(/,/g, "") || 0)
      );
      setPredictDate(form[0].mentionText || "");
      // dispatch(setStockName(form[5]));
      // if (form[13].includes("24")) {
      //   console.log(form[13]);
      //   dispatch(setGoalDate(form[13])); // form[14]가 '투자'일 경우 form[13] 값을 사용
      // } else if (form[14].includes("24")) {
      //   console.log(form[14]);
      //   dispatch(setGoalDate(form[14])); // 그렇지 않으면 원래 form[14] 값을 사용
      // }
      // dispatch(setCurrentStock(form[9]?.replace(/,/g, "")));
      // dispatch(setGoalStock(form[11]?.replace(/,/g, "")));
      // dispatch(setOpinion(form[15]));
      // dispatch(setMarketCapitalization(form[7]?.replace(/,/g, "")));
      // setPredictDate(form[4]);
    } catch {
      alert("STOCKOLM 제공 파일 양식인지 확인해주세요");
    }
  };

  const fileUploadHandler = async (file: File) => {
    if (file) {
      await uploadPdfFile(file);
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
        e.target.value = "";
        alert("PDF 만 업로드 가능합니다.");
        return;
      } else {
        setFileName(e.target.value);
        fileUploadHandler(files);
      }
    }
  };

  const handleReportTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setReportTitle(validateTitleInputLength(value)));
  };

  const writeReport = async () => {
    if (!filePath) {
      alert("PDF 를 업로드 해주세요.");
    } else if (reportTitle === "") {
      alert("제목을 입력해주세요.");
    } else if (reportContent === "" || stockName === "") {
      alert("PDF 업로드를 확인해주세요.");
    } else {
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
          filePath: filePath,
        };

        await writeReportAPI(report);
        console.log(report);
        // console.log(marketCapitalization);

        dispatch(setReportTitle(""));
        dispatch(setStockName("PDF 업로드 시 자동 업데이트"));
        dispatch(setGoalDate(""));
        dispatch(setCurrentStock(0));
        dispatch(setGoalStock(0));
        dispatch(setOpinion(""));
        dispatch(setMarketCapitalization(0));
        dispatch(setFilePath(""));
        dispatch(setReportContent(""));
        setFileName("STOCKOLM 에서 제공한 PDF를 작성하여 업로드 해주세요.");

        navigate("/community/report");
      } catch {
        console.log("게시글 등록 실패");
        alert("게시글 등록 실패");
      }
    }
  };

  const cancelReportWrite = () => {
    dispatch(setReportTitle(""));
    dispatch(setStockName("PDF 업로드 시 자동 업데이트"));
    dispatch(setGoalDate(""));
    dispatch(setCurrentStock(0));
    dispatch(setGoalStock(0));
    dispatch(setOpinion(""));
    dispatch(setMarketCapitalization(0));
    dispatch(setFilePath(""));
    dispatch(setReportContent(""));
    setFileName("STOCKOLM 에서 제공한 PDF를 작성하여 업로드 해주세요.");

    navigate("/community/report");
  };

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
            (Number(percentValue) * 100).toFixed(2) +
            "%</span> 주가" +
            `${percentValue < 0 ? "하락" : "상승"}` +
            "예상]</h3><p><br></p><p><br></p><h2><u>🔍 주가 예측 근거 요약</u></h2><h3>" +
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
      <div className="w-[60%] mx-auto flex justify-center content-center mt-10">
        <div className="w-full flex flex-col">
          <div
            onClick={backToReportList}
            className="cursor-pointer text-3xl mb-10 items-center"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-4" />
            종목분석게시판
          </div>
          <span className="text-lg opacity-90 mb-5 text-red-600">
            ※ PDF 파일 업로드 후 내용을 확인해주세요.
          </span>
          <div className="flex mb-4 items-center">
            <span className="mr-4">주식종목</span>
            <input
              type="text"
              value={stockName}
              onChange={(e) => dispatch(setStockName(e.target.value))}
              className="text-[0.8rem] text-center content-center rounded-lg border border-black px-4 min-w-[4rem] min-h-[2rem]"
            />
          </div>
          <div className="flex mb-4 items-center">
            <span className="mr-12">파일</span>
            <div className="flex">
              <label
                htmlFor="pdfUpload"
                className="cursor-pointer text-[0.9rem] text-center content-center p-2 min-h-[2rem] border border-black border-opacity-50 rounded-md opacity-50"
              >
                {fileName}
              </label>
              <input
                type="file"
                id="pdfUpload"
                onChange={fileUploadValidHandler}
                className="hidden"
              />
            </div>
          </div>
          <input
            type="text"
            value={reportTitle}
            onChange={handleReportTitle}
            placeholder="제목을 입력해주세요"
            className="flex text-lg border-b  border-black border-opacity-2 0 w-full min-h-[3rem] p-2 mb-4"
          />

          {/* FORM 데이터 */}
          <div className="flex flex-col border border-black border-opacity-20 rounded-md p-4 mb-4">
            {/* 시가총액 */}
            <div className="flex w-full mb-2">
              <div className="flex w-full text-sm justify-between mr-8">
                <div className="flex-col w-full mr-2">
                  <span className="flex w-full">시가 총액</span>
                  <span className="flex w-full">(단위 : 백만원)</span>
                </div>
                <input
                  type="text"
                  value={marketCapitalization}
                  onChange={(e) =>
                    dispatch(setMarketCapitalization(Number(e.target.value)))
                  }
                  className="border border-black border-opacity-50 p-2"
                />
              </div>

              {/* 투자 의견 */}
              <div className="flex w-full text-sm justify-between">
                <div className="flex w-full flex-col mr-2">
                  <span className="flex w-full">투자 의견</span>
                  <span className="flex w-full">(매수/매도/중립)</span>
                </div>
                <input
                  type="text"
                  value={opinion}
                  onChange={(e) => dispatch(setOpinion(e.target.value))}
                  className="border border-black border-opacity-50 p-2"
                />
              </div>
            </div>

            <div className="flex w-full mb-2">
              {/* 현재 주가 */}
              <div className="flex w-full text-sm justify-between mr-8">
                <div className="flex-col w-full mr-2">
                  <span className="flex w-full">현재 주가</span>
                  <span className="flex w-full">(단위 : 원)</span>
                </div>
                <input
                  type="text"
                  value={currentStock}
                  onChange={(e) =>
                    dispatch(setCurrentStock(Number(e.target.value)))
                  }
                  className="border border-black border-opacity-50 p-2"
                />
              </div>

              {/* 목표 주가 */}
              <div className="flex w-full text-sm justify-between">
                <div className="flex-col w-full mr-2">
                  <span className="flex w-full">목표 주가</span>
                  <span className="flex w-full">(단위 : 원)</span>
                </div>
                <input
                  type="number"
                  value={goalStock}
                  onChange={(e) =>
                    dispatch(setGoalStock(Number(e.target.value)))
                  }
                  className="border border-black border-opacity-50 p-2"
                />
              </div>
            </div>

            <div className="flex w-full">
              {/* 오늘 날짜 */}
              <div className="flex w-full text-sm justify-between mr-8">
                <div className="flex-col w-full mr-2">
                  <span className="flex w-full">오늘 날짜</span>
                  <span className="flex w-full">(YY.MM.DD)</span>
                </div>
                <input
                  type="text"
                  value={predictDate}
                  onChange={(e) => setPredictDate(e.target.value)}
                  className="border border-black border-opacity-50 p-2"
                />
              </div>

              {/* 목표 일정 */}
              <div className="flex w-full text-sm justify-between">
                <div className="flex-col w-full mr-2">
                  <span className="flex w-full">목표 일정</span>
                  <span className="flex w-full">(YY.MM.DD)</span>
                </div>
                <input
                  type="text"
                  value={goalDate}
                  onChange={(e) => dispatch(setGoalDate(e.target.value))}
                  className="border border-black border-opacity-50 p-2"
                />
              </div>
            </div>
          </div>

          {/* 글 작성 라이브러리 칸 */}
          <div className="h-40 mb-48 w-full">
            <WriteForm />
          </div>

          <div className="flex justify-end mb-10">
            <Button
              onClick={cancelReportWrite}
              size="small"
              color="black"
              border="black"
              children="취소"
              className="bg-white mr-2"
            />
            <Button size="small" children="등록" onClick={writeReport} />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ReportWritePage;
