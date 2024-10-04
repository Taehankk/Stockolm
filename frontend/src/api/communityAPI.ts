import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_SUMMARY_ACCESS_TOKEN;

interface Board {
  title: string;
  content: string;
  category: string;
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

    // console.log(res);
    // return res.data.document.entities[0].mentionText;
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

    // form parser 데이터 콘솔 찍기
    // const formFields = res.data.document.entities;

    // formFields.forEach((field: any) => {
    //   console.log(`Field name: ${field.type}`);
    //   console.log(`Field value: ${field.mentionText}`);
    // });\
    console.log(res.data.document.entities[0].properties[1].mentionText);
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

    // form parser 데이터 콘솔 찍기
    // const formFields = res.data.document.entities;

    // formFields.forEach((field: any) => {
    //   console.log(`Field name: ${field.type}`);
    //   console.log(`Field value: ${field.mentionText}`);
    // });\
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
        // "Content-Type": "application/json",
      },
    }
  );

  return res.data.data.translations[0].translatedText;
};

export const getBoard = async (id: number) => {
  const res = await axios.get(`/temp/${id}`);
  return res.data;
};

export const writeBoard = async (board: Board) => {
  const res = await axios.post("/temp", { board: board });

  console.log(res);
};

export const getReport = async (id: number) => {
  const res = await axios.get(`/temp/${id}`);
  return res.data;
};
