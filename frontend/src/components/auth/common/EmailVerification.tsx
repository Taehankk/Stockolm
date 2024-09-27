import { useContext, useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

import { validateEmail } from "../../../utils/validation";

import { sendEmailAPI, checkValidateAPI } from "../../../api/authAPI";
import { SignUpContext } from "../../../components/auth/SignUpContext";

const EmailVerification = () => {
  const [emailInput, setEmailInput] = useState("");
  const [validateNumInput, setValidateNumInput] = useState("");

  const { emailAuthId, setEmailAuthId, setValidateNumValid } =
    useContext(SignUpContext);

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
    <div className="flex-col justify-between">
      <div className="flex mb-2 items-center justify-between">
        <span className="">이메일</span>
        <Input
          onChange={handleEmailInputChange}
          value={emailInput}
          validate={validateEmail}
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
  );
};

export default EmailVerification;
