import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import Cookies from "universal-cookie";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";
import { loginAPI } from "../../../api/authAPI";

interface Props {
  handleImgLocation: (value: number) => void;
}

const Login = ({ handleImgLocation }: Props) => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailInput(value);
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordInput(value);
  };

  const login = async () => {
    await loginAPI(emailInput, passwordInput);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-16 text-[2.4rem]">로그인</div>
      <div className="flex flex-col gap-2 w-[24vw]">
        <div className="flex items-center justify-between">
          <span className="">이메일</span>
          <Input onChange={handleEmailInputChange} value={emailInput} />
        </div>
        <div className="flex items-center justify-between">
          <span className="mr-6">비밀번호</span>
          <Input
            onChange={handlePasswordInputChange}
            value={passwordInput}
            type="password"
          />
        </div>
        <span
          onClick={() => handleImgLocation(2)}
          className="flex justify-end text-xs opacity-50"
        >
          비밀번호 찾기
        </span>
      </div>
      <Button onClick={login} children="로그인" className="mt-10 mb-4" />

      <div className="text-sm text-center opacity-50">
        <div className="flex justify-between text-sm">
          <span className="mr-3">회원이 아니신가요?</span>
          <span onClick={() => handleImgLocation(1)}>회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
