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
  content: string;
  stockName: string;
  opinion: string;
  goalStock: number;
  currentStock: number;
  marketCapitalization: number;
  goalDate: Date;
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

    return res.data.document.entities[0].properties;
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

export const deleteCommentAPI = async (commentID: number) => {
  try {
    await axiosTokenInstance.delete(`/comment/${commentID}`);
  } catch {
    alert("댓글 삭제 실패");
  }
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
export const getReportAPI = async () => {
  const res = await axios.get(`/analyst-board`);
  return res.data;
};

export const writeReportAPI = async (report: Report) => {
  try {
    const res = await axiosTokenInstance.post("/analyst-board", {
      title: report.title,
      content: report.content,
      stockName: report.stockName,
      opinion: report.opinion,
      goalStock: report.goalStock,
      currentStock: report.currentStock,
      marketCapitalization: report.marketCapitalization * 1000000,
      goalDate: report.goalDate,
    });

    console.log(res.data);
    return res.data;
  } catch {
    alert("PDF 형식이나 미입력값을 확인하세요.");
  }
};
