import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

const Password = () => {

  return (
    <div className="flex flex-col gap-[5rem] justify-center items-center text-[1.8rem]">
      <div className="w-[60%] flex justify-between items-center">
        <span className="h-[2.3rem]">새 비밀번호</span>
        <Input className="w-[20rem] h-[2.5rem]"></Input>
      </div>
      <div className="flex w-[60%] justify-between items-center">
        <span className="h-[2.3rem]">비밀번호 재확인</span>
        <Input className="w-[20rem] h-[2.5rem]"></Input>
      </div>
      <Button className="flex w-[22rem] h-[4.2rem] text-[2.1rem] justify-center items-center">비밀번호 수정</Button>
    </div>
  );
};

export default Password;
