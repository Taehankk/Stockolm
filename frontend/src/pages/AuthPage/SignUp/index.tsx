import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import Input from "../../../components/elements/Input";
import Button from "../../../components/elements/Button";
import {
  validateEmail,
  validateMatchPassword,
  validateNickname,
  validatePassword,
} from "../../../utils/validation";
import { useState } from "react";

interface Props {
  handleImgLocation: (value: number) => void;
}

const SignUp = ({ handleImgLocation }: Props) => {
  const [nicknameInput, setNicknameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [validateNumInput, setValidateNumInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");

  const [isAnalyst, setIsAnalyst] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const handleNicknameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNicknameInput(value);
  };

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

  const sendValidateNumber = () => {
    console.log(Math.random());
  };

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodeInput(value);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value);
  };

  const checkAnalyst = () => {
    setIsAnalyst(true);
  };

  const checkCommon = () => {
    setIsAnalyst(false);
  };

  const signUp = () => {
    handleImgLocation(0);
    console.log(nicknameInput, emailInput, validateNumInput);
  };

  return (
    <div className="flex flex-col items-center w-full justify-start">
      <div className="mb-10 text-[2.4rem]">회원가입</div>

      <div className="flex-col justify-start w-full">
        {/* 닉네임 input */}
        <div className="flex mb-2 items-center justify-between">
          <span className="">닉네임</span>
          <Input
            onChange={handleNicknameInputChange}
            value={nicknameInput}
            validate={validateNickname}
          />
        </div>

        {/* 이메일 input */}
        <div className="flex-col contents-between">
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
            <Button
              size="small"
              children="확인"
              className="text-[0.8rem] w-20"
            />
          </div>
        </div>

        {/* 비밀번호 input */}
        <div className="flex mb-2 items-center justify-between">
          <span className="">비밀번호</span>
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

        {/* 애널리스트 확인 */}
        <div className="flex mb-2 items-center justify-center text-sm text-gray-500">
          <span className="mr-6">애널리스트 이신가요?</span>
          <div className="flex mr-5 items-center">
            <span>예</span>
            {/* 체크버튼 하나 */}
            <FontAwesomeIcon
              icon={faCircleCheck}
              onClick={checkAnalyst}
              className={`${isAnalyst ? "text-[#26F030]" : ""}`}
            />
          </div>
          <div className="flex items-center">
            <span>아니오</span>
            {/* 체크버튼 하나 */}
            <FontAwesomeIcon
              icon={faCircleCheck}
              onClick={checkCommon}
              className={`${isAnalyst ? "" : "text-[#26F030]"}`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isAnalyst ? "max-h-[200px]" : "max-h-0"
          }`}
        >
          <div className="transition-transform">
            <div className="flex justify-between items-center">
              <span>코드</span>
              <div className="flex items-center justify-end mb-2">
                <Input
                  size="small"
                  onChange={handleCodeInputChange}
                  value={codeInput}
                  className="mr-8 w-32"
                />
                <Button
                  size="small"
                  children="확인"
                  className="text-[0.8rem] w-20"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>이름</span>
              <Input onChange={handleNameInputChange} value={nameInput} />
            </div>
          </div>
        </div>
      </div>
      <Button onClick={signUp} children="회원가입" className="mt-10" />
    </div>
  );
};

export default SignUp;
