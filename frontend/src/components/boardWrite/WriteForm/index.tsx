import { useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../store";
import { setReportContent } from "../../../slices/reportSlice";
import { setBoardContent } from "../../../slices/boardSlice";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const WriteForm = () => {
  const location = useLocation();
  const quillRef = useRef<ReactQuill | null>(null);

  const dispatch = useAppDispatch();
  const boardContent = useSelector((state: RootState) => state.board.content);
  const reportContent = useSelector((state: RootState) => state.report.content);

  const MAX_LENGTH = 1000; // 최대 글자 수 제한

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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
      },
    };
  }, []);

  // 글자 수를 체크하여 초과 시 차단하는 로직
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      editor.on("text-change", () => {
        const plainText = editor.getText().trim(); // 순수 텍스트 가져오기
        if (plainText.length > MAX_LENGTH) {
          alert("최대 1000자까지 입력 가능합니다.");

          // 초과한 텍스트 삭제
          editor.deleteText(MAX_LENGTH, plainText.length);
        }
      });
    }
  }, []);

  const handleChange = (html: string) => {
    // 상태 업데이트
    if (location.pathname === "/community/report/write") {
      dispatch(setReportContent(html));
    } else if (location.pathname === "/community/board/write") {
      dispatch(setBoardContent(html));
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
