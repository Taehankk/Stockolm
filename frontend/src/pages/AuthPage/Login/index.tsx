import { useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";
import { loginAPI } from "../../../api/authAPI";

interface Props {
  handleImgLocation: (value: number) => void;
}

const Login = ({ handleImgLocation }: Props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setEmailInput(value);
    }
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setPasswordInput(value);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login(); // Enter 키 입력 시 login 함수 호출
    }
  };

  const login = async () => {
    if (emailInput === "") {
      alert("이메일을 입력하세요.");
    } else if (passwordInput === "") {
      alert("비밀번호를 입력하세요.");
    } else {
      await loginAPI(emailInput, passwordInput);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-20 text-[2.4rem]">로그인</div>
      <div className="flex flex-col gap-4 w-[24vw]">
        <div className="flex items-center justify-between">
          <span className="">이메일</span>
          <Input onChange={handleEmailInputChange} value={emailInput} />
        </div>
        <div className="flex items-center justify-between">
          <span className="mr-6">비밀번호</span>
          <Input
            onChange={handlePasswordInputChange}
            onKeyUp={handleKeyUp}
            value={passwordInput}
            type="password"
          />
        </div>
        <span
          onClick={() => handleImgLocation(2)}
          className="flex justify-end text-xs opacity-50 cursor-pointer"
        >
          비밀번호 찾기
        </span>
      </div>
      <Button onClick={login} children="로그인" className="mt-8 mb-4" />

      <div className="text-sm text-center opacity-50">
        <div className="flex justify-between text-sm">
          <span className="mr-3">회원이 아니신가요?</span>
          <span className="cursor-pointer" onClick={() => handleImgLocation(1)}>회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
