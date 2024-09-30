import Button from "../../elements/Button";
import close from "/src/assets/close.svg";
import watch from "/src/assets/watch.svg";
import like from "/src/assets/like.svg";

interface ModalProps {
  size?: string;
  context?: string;
  content?: string;
  name?: string;
  file?: string;
  onCloseClick?: () => void;
  onConfirmClick?: () => void;
  onFileClick?: () => void;
  onContentClick?: () => void; 
}

const Modal = ({
  size = "smal",
  context = "비밀번호를 변경하시겠습니까?",
  onCloseClick,
  onConfirmClick,
  onFileClick,
  onContentClick,
}: ModalProps) => {
  
  const role: string = "USER";

  const userData = [
    {
      content: "1. [삼성전자] 3분기 분석 결과",
      name: "장원영",
      file: "file1.pdf",
    },
    {
      content: "2. [LG전자] 3분기 분석 결과",
      name: "아이유",
      file: "file2.pdf",
    },
    {
      content: "3. [현대차] 3분기 분석 결과",
      name: "이찬원",
      file: "file3.pdf",
    },
    {
      content: "4. [카카오] 3분기 분석 결과",
      name: "장범준",
      file: "file4.pdf",
    },
    {
      content: "5. [네이버] 3분기 분석 결과",
      name: "이영지",
      file: "file5.pdf",
    },
    {
      content: "6. [SK하이닉스] 3분기 분석 결과",
      name: "이효리",
      file: "file6.pdf",
    },
    {
      content: "7. [포스코] 3분기 분석 결과",
      name: "윤아",
      file: "file7.pdf",
    },
    {
      content: "8. [KT] 3분기 분석 결과",
      name: "김연아",
      file: "file8.pdf",
    },
    {
      content: "9. [LG화학] 3분기 분석 결과",
      name: "박지성",
      file: "file9.pdf",
    },
    {
      content: "10. [현대모비스] 3분기 분석 결과",
      name: "손흥민",
      file: "file10.pdf",
    }
  ];

  const analData = [
    {
      content: "1. [삼성전자] 3분기 분석 결과",
      watch: 1,
      like: 1,
      file: "file1.pdf"
    },
    {
      content: "2. [LG전자] 3분기 분석 결과",
      watch: 2,
      like: 3,
      file: "file2.pdf"
    },
    {
      content: "3. [현대차] 3분기 분석 결과",
      watch: 5,
      like: 2,
      file: "file3.pdf"
    },
    {
      content: "4. [카카오] 3분기 분석 결과",
      watch: 7,
      like: 4,
      file: "file4.pdf"
    },
    {
      content: "5. [네이버] 3분기 분석 결과",
      watch: 4,
      like: 5,
      file: "file5.pdf"
    },
    {
      content: "6. [SK하이닉스] 3분기 분석 결과",
      watch: 8,
      like: 6,
      file: "file6.pdf"
    },
    {
      content: "7. [포스코] 3분기 분석 결과",
      watch: 9,
      like: 8,
      file: "file7.pdf"
    },
    {
      content: "8. [KT] 3분기 분석 결과",
      watch: 11,
      like: 9,
      file: "file8.pdf"
    },
    {
      content: "9. [LG화학] 3분기 분석 결과",
      watch: 6,
      like: 7,
      file: "file9.pdf"
    },
    {
      content: "10. [현대모비스] 3분기 분석 결과",
      watch: 12,
      like: 10,
      file: "file10.pdf"
    }
  ];

  return (
    <div>
      {size === "small" ? (
        <div className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-[0.3]">
          <div className="flex flex-col justify-center items-center gap-[1.5rem] absolute top-[17rem] left-[36rem] z-100 rounded-xl bg-white w-[20rem] h-[10rem]">
            <span>{context}</span>
            <Button className="w-[4rem] h-[2rem]" onClick={onConfirmClick}>확인</Button>
          </div>
        </div>
      ) : (
        <div className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-[0.3]">
          <div className="flex flex-col items-center absolute top-[5rem] left-[16rem] z-100 rounded-xl bg-white w-[60rem] h-[36rem]">
            <img src={close} className="self-end pr-[2rem] pt-[2rem] mb-[2rem] cursor-pointer" onClick={onCloseClick} />
            {role === "USER" ? (
              <span className="text-[1.5rem] mb-[3rem]">내가 좋아한 글</span>
            ) : (
              <span className="text-[1.5rem] mb-[3rem]">내가 분석한 글</span>
            )}
            <div className="flex flex-col w-full h-[20rem] gap-[3rem] overflow-y-auto">
              {role === "USER" ? userData.map((item, index) => (
                <div key={index} className="flex w-full px-[5rem] text-[1.25rem]">
                  <span className="w-[33rem] cursor-pointer" onClick={onContentClick}>{item.content}</span>
                  <div className="flex">
                    <span className="w-[10rem]">{item.name}</span>
                    <span className="cursor-pointer" onClick={onFileClick}>{item.file}</span>
                  </div>
                </div>)) :
                analData.map((item, index) => (
                  <div key={index} className="flex w-full px-[5rem] text-[1.25rem]">
                    <span className="w-[26rem] pr-[2rem] cursor-pointer" onClick={onContentClick}>{item.content}</span>
                    <div className="flex">
                      <div className="flex w-[8rem] gap-[0.5rem]">
                        <img src={watch} className="w-[1.25rem] h-[1.25rem] self-center"/>
                        <span className="h-[1.6rem] self-center">{item.watch}</span>
                      </div>
                      <div className="flex w-[8rem] gap-[0.5rem]">
                        <img src={like} className="w-[1.25rem] h-[1.25rem] self-center"/>
                        <span className="h-[1.6rem] self-center">{item.like}</span>
                      </div> 
                      <span className="h-[1.6rem] self-center cursor-pointer" onClick={onFileClick}>{item.file}</span>
                    </div>
                  </div>
                  ))}
            </div>
          </div>
        </div>
      )}
  </div>);
};

export default Modal;