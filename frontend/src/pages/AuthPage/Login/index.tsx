import { useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

import { validateEmail, validatePassword } from "../../../utils/validation";

interface Props {
  handleImgLocation: (value: number) => void;
}

const Login = ({ handleImgLocation }: Props) => {
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

  const login = () => {
    console.log(emailInput, passwordInput);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-10 text-[2.4rem]">로그인</div>
      <div>
        <div className="flex mb-2 items-center">
          <span className="mr-10">이메일</span>
          <Input
            onChange={handleEmailInputChange}
            value={emailInput}
            validate={validateEmail}
          />
        </div>
        <div>
          <div className="flex mb-2 items-center">
            <span className="mr-6">비밀번호</span>
            <Input
              onChange={handlePasswordInputChange}
              value={passwordInput}
              validate={validatePassword}
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
      </div>
      <Button onClick={login} children="로그인" className="mt-10 mb-4" />

      <div className="text-sm text-center opacity-50">
        {/* <div className="flex justify-between"> */}
        {/* <span className="mr-2">비밀번호를 잊으셨나요?</span> */}
        {/* </div> */}
        <div className="flex justify-between text-sm">
          <span className="mr-3">회원이 아니신가요?</span>
          <span onClick={() => handleImgLocation(1)}>회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
