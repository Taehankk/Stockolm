import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import dompurify from "dompurify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as unlike,
  faEye,
  faFilePdf,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faHeart as like,
} from "@fortawesome/free-solid-svg-icons";
import {
  changeReportLikeStateAPI,
  getReportAPI,
} from "../../../api/communityAPI";
import { RootState, useAppDispatch } from "../../../store";
import { getUserInfo } from "../../../slices/userSlice";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

interface Report {
  content: string; // 요약 내용
  createAt: string;
  currentStock: number; // 현재주가
  filePath: string; // S3 서버 내 리포트 파일 경로
  goalStock: number; // 목표주가
  like: boolean;
  likeCnt: number;
  marketCapitalization: number; // 시가총액
  opinion: string; // 투자의견
  stockName: string;
  title: string;
  updateAt: string;
  userImagePath: string;
  userName: string; // 애널리스트 실명
  userNickName: string;
  viewCnt: number;
}

const ReportDetail = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 스크립트를 활용하여 javascript와 HTML로 악성 코드를 웹 브라우저에 심어,
  // 사용자 접속시 그 악성코드가 실행되는 것을 XSS, 보안을 위해 sanitize 추가
  const sanitizer = dompurify.sanitize;

  const token = sessionStorage.getItem("access_token");
  const loginUser = useSelector((state: RootState) => state.user.userNickName);

  const { nickname, id: reportID } = useParams();

  const [report, setReport] = useState<Report>();

  const [isLike, setLike] = useState(false);
  const [reportLike, setReportLike] = useState(0);

  const getReport = async () => {
    try {
      const res = await getReportAPI(reportID!, nickname!);
      setReport(res);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const backToReportList = () => {
    navigate(-1);
  };

  const handleLike = async () => {
    try {
      if (loginUser !== report?.userNickName) {
        setLike(!isLike);
        if (isLike) {
          setReportLike(reportLike - 1);
        } else {
          setReportLike(reportLike + 1);
        }
        await changeReportLikeStateAPI(reportID!);
      }
    } catch {
      alert("좋아요 변경 실패");
    }
  };

  useEffect(() => {
    getReport();
  }, [reportID]);

  useEffect(() => {
    if (report) {
      setLike(report.like);
      setReportLike(report.likeCnt);
    }

    if (report && report.userNickName && report.userNickName !== nickname) {
      navigate(`/analyst/${nickname}/report`);
      alert(
        `해당 애널리스트가 작성한 게시글이 아닙니다. ${nickname} 의 페이지로 이동합니다.`
      );
    }
  }, [report, nickname, reportID, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <div className="w-[90%] flex-col justify-center items-center">
        <div
          onClick={backToReportList}
          className="cursor-pointer text-3xl mb-8"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-4" />
          작성글보기
        </div>

        <div className="flex-col ml-4 min-h-[40rem] justify-center items-center border border-black border-opacity-10 rounded-lg p-10">
          {/* 제목 */}
          <div className="text-4xl">{report?.title}</div>

          {/* 시간, 좋아요, 조회수, pdf */}
          <div className="flex text-sm mt-3">
            <div className="flex w-full gap-2 items-center justify-between">
              <div className="flex justify-between">
                <div className="mr-20 w-full opacity-50">
                  <span className="">{report?.createAt.split("T")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex w-full gap-2 mr-2">
                    <div>
                      <FontAwesomeIcon icon={unlike} className="opacity-50" />
                    </div>
                    <span className="opacity-50">{reportLike}</span>
                  </span>
                  <span className="flex w-full gap-2 mr-2 opacity-50">
                    <FontAwesomeIcon icon={faEye} className="" />
                    {report?.viewCnt}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <a href={report?.filePath} className="cursor-pointer mr-4">
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </span>
                  <span className="opacity-50">보고서 다운로드</span>
                </a>
                {report?.userNickName !== loginUser ? (
                  <div
                    onClick={handleLike}
                    className="flex mb-1 text-2xl cursor-pointer"
                  >
                    {isLike ? (
                      <FontAwesomeIcon
                        icon={like}
                        className="text-PrimaryRed"
                      />
                    ) : (
                      <FontAwesomeIcon icon={unlike} className="text-2xl" />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <hr />

          {/* 본문글 */}
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizer(`${report?.content}`),
            }}
            className="text-lg p-4 min-h-64"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
