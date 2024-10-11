import { useState } from "react";
import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";
import { patchPassword } from "../../../api/mypageAPI";
import { useNavigate } from "react-router-dom";

const Password = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

 
  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleClickButton = async  () => {
    if (newPassword === confirmPassword) {      
      try {
        console.log(newPassword)
        const response = await patchPassword(newPassword);
        
        if (response.status === 204) {
          alert("비밀번호가 성공적으로 수정되었습니다.");
          nav("/mypage/profile", { replace: true });
          
        }
      } catch (error) {
        console.error("비밀번호 수정 오류:", error);
        alert("비밀번호 수정에 실패했습니다.");
      }
     
    } else {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-[5rem] justify-center items-center text-[1.8rem]">
      <div className="w-[60%] flex justify-between items-center">
        <span className="h-[2.3rem]">새 비밀번호</span>
        <Input
          className="w-[20rem] h-[2.5rem]"
          value={newPassword}
          onChange={handleChangeNewPassword}
          type="password">
        </Input>
      </div>
      <div className="flex w-[60%] justify-between items-center">
        <span className="h-[2.3rem]">비밀번호 재확인</span>
        <Input
          className="w-[20rem] h-[2.5rem]"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          type="password">
        </Input>
      </div>
      <Button
        className="flex w-[22rem] h-[4.2rem] text-[2.1rem] justify-center items-center"
        onClick={handleClickButton}
      >
        비밀번호 수정
      </Button>
    </div>
  );
};

export default Password;
