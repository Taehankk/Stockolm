import { useContext, useEffect, useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

import {
  validateMatchPassword,
  validatePassword,
} from "../../../utils/validation";

import EmailVerification from "../../../components/auth/common/EmailVerification";
import { AuthContext } from "../../../components/auth/AuthContext";

interface Props {
  handleImgLocation: (value: number) => void;
}

const ChangePassword = ({ handleImgLocation }: Props) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");

  const { isValidateNumValid, setValidateNumValid } = useContext(AuthContext);

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
  // useEffect(() => {
  //   setValidateNumValid(true);
  // }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-16 mb-20 text-[2.4rem]">비밀번호 변경</div>

      <div className="flex-col justify-between w-[24vw]">
        {/* 이메일 인증 관련 컴포넌트 */}
        <EmailVerification />

        {isValidateNumValid && (
          <div>
            <div>
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
                  validate={(value) =>
                    validateMatchPassword(value, passwordInput)
                  }
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
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
