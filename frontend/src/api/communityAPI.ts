import axios from "axios";
import axiosInstance from "./axiosInstance";
import axiosTokenInstance from "./axiosTokenInstance";

const ACCESS_TOKEN = import.meta.env.VITE_SUMMARY_ACCESS_TOKEN;

interface Board {
  title: string;
  content: string;
  category: string;
}

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

export const pdfSummaryAPI = async (file: string | undefined) => {
  try {
    const res = await axios.post(
      "https://us-documentai.googleapis.com/v1/projects/stockolm/locations/us/processors/94a076be7ff9b8fe:process",
      {
        skipHumanReview: true,
        rawDocument: {
          mimeType: "application/pdf",
          content: file,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return translateAPI(res.data.document.entities[0].mentionText);
  } catch (e) {
    console.log(e);
  }
};

export const pdfFormAPI = async (file: string | undefined) => {
  try {
    const res = await axios.post(
      "https://us-documentai.googleapis.com/v1/projects/233195045634/locations/us/processors/35257d1e7d3c6d3b:process",
      {
        skipHumanReview: true,
        rawDocument: {
          mimeType: "application/pdf",
          content: file,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data.document.text.split("\n"));

    // return res.data.document.entities[0].properties;
    return res.data.document.text.split("\n");
  } catch (e) {
    console.log(e);
  }
};

export const pdfOCRAPI = async (file: string | undefined) => {
  try {
    const res = await axios.post(
      "https://us-documentai.googleapis.com/v1/projects/233195045634/locations/us/processors/ca3038b32924e7f0:process",
      {
        skipHumanReview: true,
        rawDocument: {
          mimeType: "application/pdf",
          content: file,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
    return res.data.document;
  } catch (e) {
    console.log(e);
  }
};

export const translateAPI = async (text: string) => {
  const res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2`,
    {
      q: text,
      target: "ko",
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return res.data.data.translations[0].translatedText;
};

export const uploadPdfAPI = async (file: File) => {
  const res = await axiosTokenInstance.post(
    `/upload/report-pdf`,
    { file: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(res.data);
  return res.data;
};

export const getBoardListAPI = async (
  token: string | null,
  currentPage: number,
  itemsPerPage: number,
  sort: string,
  searchWord: string
) => {
  const axiosReq = token ? axiosTokenInstance : axiosInstance;

  const res = await axiosReq.get("/board", {
    params: {
      page: currentPage - 1,
      size: itemsPerPage,
      sort: sort,
      searchWord: searchWord,
    },
  });

  return res.data;
};

export const changeLikeStateAPI = async (boardID: string) => {
  await axiosTokenInstance.post(`/board/like/${boardID}`);
};

export const getBoardAPI = async (token: string | null, boardID: string) => {
  const axiosReq = token ? axiosTokenInstance : axiosInstance;

  const res = await axiosReq.get(`/board/${boardID}`);
  return res.data;
};

export const writeBoardAPI = async (board: Board) => {
  try {
    await axiosTokenInstance.post("/board", board);
  } catch (e) {
    console.log(e);
    alert("작성 양식을 확인해주세요");
  }
};

export const updateBoardAPI = async (boardID: string, board: Board) => {
  await axiosTokenInstance.put(`/board/${boardID}`, board);
};

export const deleteBoardAPI = async (boardID: string) => {
  await axiosTokenInstance.delete(`/board/${boardID}`);
};

export const getCommentListAPI = async (
  token: string | null,
  boardID: string
) => {
  const axiosReq = token ? axiosTokenInstance : axiosInstance;

  const res = await axiosReq.get(`/comment/${boardID}`);
  return res.data;
};

export const writeCommentAPI = async (boardID: string, comment: string) => {
  try {
    await axiosTokenInstance.post(`/comment/${boardID}`, {
      content: comment,
    });
  } catch (e) {
    console.log(e);
    console.log("댓글 등록 실패");
  }
};

export const updateCommentAPI = async (commentID: number, comment: string) => {
  await axiosTokenInstance.put(`/comment/${commentID}`, {
    content: comment,
  });
};

export const deleteCommentAPI = async (commentID: number) => {
  try {
    await axiosTokenInstance.delete(`/comment/${commentID}`);
  } catch {
    alert("댓글 삭제 실패");
  }
};

export const changeReportLikeStateAPI = async (reportID: string) => {
  await axiosTokenInstance.post(`/analyst-board/like/${reportID}`);
};

export const getReportListAPI = async (
  token: string | null,
  currentPage: number,
  itemsPerPage: number,
  sort: string,
  searchWord: string
) => {
  const axiosReq = token ? axiosTokenInstance : axiosInstance;

  const res = await axiosReq.get("/analyst-board", {
    params: {
      page: currentPage - 1,
      size: itemsPerPage,
      sort: sort,
      searchWord: searchWord,
    },
  });

  return res.data;
};

export const getReportAPI = async (reportID: string, nickname: string) => {
  try {
    const res = await axiosTokenInstance.get(`/analyst-board/${reportID}`);
    console.log(res.data);
    return res.data;
  } catch {
    window.location.href = `/analyst/${nickname}/report`;
    alert("게시글 가져오기 실패");
  }
};

export const writeReportAPI = async (report: Report) => {
  try {
    console.log(report);
    const res = await axiosTokenInstance.post("/analyst-board", {
      title: report.title,
      stockName: report.stockName,
      opinion: report.opinion,
      goalStock: Number(report.goalStock),
      currentStock: Number(report.currentStock),
      marketCapitalization: Number(report.marketCapitalization) * 1000000,
      content: report.content,
      goalDate: report.goalDate,
      filePath: report.filePath,
    });

    return res.data;
  } catch {
    alert("PDF 형식(종목명 등)이나 미입력값을 확인하세요.");
  }
};
