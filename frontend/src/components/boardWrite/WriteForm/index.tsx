import { useRef, useMemo } from "react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../store";
import { setReportContent } from "../../../slices/reportSlice";
import { setBoardContent } from "../../../slices/boardSlice";

import ReactQuill from "react-quill-new";
// import { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import axiosTokenInstance from "../../../api/axiosTokenInstance";
import { validateEditorInputLength } from "../../../utils/validation";

const WriteForm = () => {
  const location = useLocation();
  const quillRef = useRef<ReactQuill | null>(null);

  const dispatch = useAppDispatch();
  const boardContent = useSelector((state: RootState) => state.board.content);
  const reportContent = useSelector((state: RootState) => state.report.content);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["code", "code-block"],
  ];

  const imageInsert = (imageUrl: string) => {
    // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
    const editor = quillRef.current?.getEditor(); // 1. 에디터 객체 가져오기

    // 2. 현재 에디터 커서 위치값을 가져온다
    const range = editor?.getSelection();
    // 가져온 위치에 이미지를 삽입한다
    editor?.insertEmbed(range!.index, "image", imageUrl);
  };

  // 파일을 multipart/form-data로 업로드 (하나의 파일만 처리)
  const handleSingleImageUpload = async (file: File) => {
    try {
      // API 요청 (S3에 업로드하는 예시)
      const res = await axiosTokenInstance.post(
        "/upload/board-image",
        {
          file: file, // multipart/form-data 형식으로 전송
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      imageInsert(res.data);
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
    }
  };

  // 파일 선택을 위한 핸들러 (단일 파일만 선택 가능)
  const singleImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", () => {
      if (input.files && input.files.length > 0) {
        handleSingleImageUpload(input.files[0]); // 첫 번째 파일만 업로드
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: singleImageHandler, // 이미지 핸들러 등록
        },
      },
    };
  }, []);

  const handleChange = (html: string) => {
    if (location.pathname === "/community/report/write") {
      dispatch(setReportContent(validateEditorInputLength(html)));
    } else if (location.pathname === "/community/board/write") {
      dispatch(setBoardContent(validateEditorInputLength(html)));
    }
  };

  return (
    <div className="w-full h-full">
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder={
          location.pathname === "/community/report/write"
            ? "PDF 파일을 업로드 하면 내용이 자동으로 작성됩니다."
            : ""
        }
        value={
          location.pathname === "/community/report/write"
            ? reportContent
            : boardContent
        }
        onChange={handleChange}
        ref={quillRef}
        className="h-60 w-full"
      />
    </div>
  );
};

export default WriteForm;
