import { useContext, useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

import { validateEmail } from "../../../utils/validation";

import { sendEmailAPI, checkValidateAPI } from "../../../api/authAPI";
import { AuthContext } from "../AuthContext";

interface Props {
  location: number;
}
const EmailVerification = ({ location }: Props) => {
  const [validateNumInput, setValidateNumInput] = useState("");

  const {
    emailInput,
    setEmailInput,
    emailAuthId,
    setEmailAuthId,
    setValidateNumValid,
  } = useContext(AuthContext);

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
    const authID = await sendEmailAPI(location, emailInput);
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
    <div className="flex-col">
      <div className="flex mb-2 w-full justify-between">
        <span className="w-full">이메일</span>
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
          className="mr-12 w-32 text-sm"
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
