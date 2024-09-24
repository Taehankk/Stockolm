import { useContext } from "react";

import { SignUpContext } from "../../SignUpContext";
import Input from "../../../../components/elements/Input";
import Button from "../../../../components/elements/Button";

import {
  validateNickname,
  validateEmail,
  validatePassword,
  validateMatchPassword,
} from "../../../../utils/validation";

import { sendEmailAPI, checkValidateAPI } from "../../../../api/authAPI";

const UserSignUp = () => {
  const {
    nicknameInput,
    setNicknameInput,
    emailInput,
    setEmailInput,
    validateNumInput,
    setValidateNumInput,
    passwordInput,
    setPasswordInput,
    pwCheckInput,
    setPwCheckInput,
    emailAuthId,
    setEmailAuthId,
    setNicknameValid,
    setEmailValid,
    setValidateNumValid,
    setPasswordValid,
    setPwCheckValid,
  } = useContext(SignUpContext);

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

  const sendEmail = async () => {
    const authID = await sendEmailAPI(emailInput);
    setEmailAuthId(authID);
  };

  const checkValidateNumber = async () => {
    if (!emailAuthId) {
      alert("이메일 인증이 필요합니다.");
      return;
    }

    const valid = await checkValidateAPI(emailAuthId, validateNumInput);

    if (valid) {
      setValidateNumValid(true);
    } else {
      setValidateNumValid(false);
    }
  };

  return (
    <div>
      {/* 닉네임 input */}
      <div className="flex min-h-[3.4rem] items-start justify-between">
        <span className="mt-1.5">닉네임</span>
        <Input
          onChange={handleNicknameInputChange}
          value={nicknameInput}
          validate={validateNickname}
          setValidateState={setNicknameValid}
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
            setValidateState={setEmailValid}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={sendEmail}
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
            onClick={checkValidateNumber}
            children="확인"
            className="text-[0.8rem] w-20"
          />
        </div>
      </div>

      {/* 비밀번호 input */}
      <div className="flex min-h-[3.4rem] items-start justify-between">
        <span className="mt-1.5">비밀번호</span>
        <Input
          onChange={handlePasswordInputChange}
          value={passwordInput}
          validate={validatePassword}
          setValidateState={setPasswordValid}
          type="password"
        />
      </div>

      {/* 비밀번호 확인 input */}
      <div className="flex min-h-[3.4rem] items-start justify-between">
        <span className="mt-1.5 mr-2">비밀번호 확인</span>
        <Input
          onChange={handlePwCheckInputChange}
          value={pwCheckInput}
          validate={(value) => validateMatchPassword(value, passwordInput)}
          setValidateState={setPwCheckValid}
          type="password"
        />
      </div>
    </div>
  );
};

export default UserSignUp;
