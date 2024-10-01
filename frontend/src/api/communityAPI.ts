import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_SUMMARY_ACCESS_TOKEN;

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

    return res.data.document.text;
  } catch (e) {
    console.log(e);
  }
};

export const pdfFormAPI = async (file: string | undefined) => {
  try {
    const res = await axios.post(
      "https://us-documentai.googleapis.com/v1/projects/233195045634/locations/us/processors/35257d1e7d3c6d3b:process",
      //   "https://us-documentai.googleapis.com/v1/projects/stockolm/locations/us/processors/35257d1e7d3c6d3b:process",
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
    // });
    return res.data.document.text;
  } catch (e) {
    console.log(e);
  }
};
