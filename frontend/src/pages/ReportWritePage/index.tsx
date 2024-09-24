import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import BasicLayout from "../../layouts/BasicLayout";

const ReportWritePage = () => {
  return (
    <BasicLayout>
      <div className="w-full">
        <div>
          <span>주식종목</span>
          <span>삼성전자</span>
        </div>
        <div>
          <span>파일</span>
          <span>종목분석 PDF를 업로드 해주세요</span>
        </div>
        <Input placeholder="제목을 입력해주세요" className="border-none" />

        <div>글 작성 라이브러리 칸</div>

        <div className="flex justify-end">
          <Button
            size="small"
            color="black"
            border="black"
            children="취소"
            className="bg-white"
          />
          <Button size="small" children="등록" />
        </div>
      </div>
    </BasicLayout>
  );
};

export default ReportWritePage;
