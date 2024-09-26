import { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill-new";
// import { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const WriteForm = () => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [value, setValue] = useState("");

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

  // 파일을 multipart/form-data로 업로드 (하나의 파일만 처리)
  const handleSingleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // 단일 파일만 추가

    try {
      // API 요청 (S3에 업로드하는 예시)
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData, // multipart/form-data 형식으로 전송
      // });

      // const data = await response.json();
      // const imageUrl = data.url; // 서버에서 반환된 이미지 URL
      const imageUrl = "이미지 URL 입니다."; // 서버에서 반환된 이미지 URL

      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        const cursor = editor.getSelection(true);

        if (!cursor) {
          editor.focus(); // 포커스를 다시 맞추고
          const newCursor = editor.getSelection();
          if (newCursor) {
            editor.insertEmbed(newCursor.index, "image", imageUrl);
          }
        } else {
          editor.insertEmbed(cursor.index, "image", imageUrl);
        }
      }
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
    setValue(html);
  };

  return (
    <div className="h-full">
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={handleChange}
        ref={quillRef}
        className="h-40"
      />
    </div>
  );
};

export default WriteForm;
