import { useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

import {
  validateEmail,
  validateMatchPassword,
  validatePassword,
} from "../../../utils/validation";

interface Props {
  handleImgLocation: (value: number) => void;
}

const ChangePassword = ({ handleImgLocation }: Props) => {
  const [emailInput, setEmailInput] = useState("");
  const [validateNumInput, setValidateNumInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");

  // useEffect();

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailInput(value);
  };

  const handleValidateNumInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setValidateNumInput(value);
  };

  const sendValidateNumber = () => {
    console.log(Math.random());
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordInput(value);
  };

  const handlePwCheckInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwCheckInput(value);
  };

  const changePassword = () => {
    handleImgLocation(0);
    console.log(passwordInput);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-16 mb-20 text-[2.4rem]">비밀번호 변경</div>

      {/* 이메일 input */}
      <div className="flex-col justify-between">
        <div className="flex mb-2 items-center justify-between">
          <span className="">이메일</span>
          <Input
            onChange={handleEmailInputChange}
            value={emailInput}
            validate={validateEmail}
            type="password"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={sendValidateNumber}
            children="이메일 인증"
            className="mb-2 text-[0.85rem]"
          />
        </div>
        <div className="flex items-center justify-end mb-2">
          <Input
            size="small"
            placeholder="인증 코드 입력"
            onChange={handleValidateNumInputChange}
            value={validateNumInput}
            className="mr-8 w-32 text-sm"
          />
          <Button size="small" children="확인" className="text-[0.8rem] w-20" />
        </div>
        {/* 새 비밀번호 input */}
        <div className="flex mb-2 items-center justify-between">
          <span className="">새 비밀번호</span>
          <Input
            onChange={handlePasswordInputChange}
            value={passwordInput}
            validate={validatePassword}
            type="password"
          />
        </div>

        {/* 비밀번호 확인 input */}
        <div className="flex mb-2 items-center justify-between">
          <span className="mr-2">비밀번호 확인</span>
          <Input
            onChange={handlePwCheckInputChange}
            value={pwCheckInput}
            validate={(value) => validateMatchPassword(value, passwordInput)}
            type="password"
          />
        </div>
      </div>

      <Button
        onClick={changePassword}
        children="비밀번호 변경"
        className="mt-10"
      />
    </div>
  );
};

export default ChangePassword;
