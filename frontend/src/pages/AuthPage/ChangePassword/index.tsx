import { useContext, useEffect, useState } from "react";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";

import {
  validateMatchPassword,
  validatePassword,
} from "../../../utils/validation";

import EmailVerification from "../../../components/auth/common/EmailVerification";
import { AuthContext } from "../../../components/auth/AuthContext";
import { changePasswordAPI } from "../../../api/authAPI";

interface Props {
  handleImgLocation: (value: number) => void;
}

const ChangePassword = ({ handleImgLocation }: Props) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");

  const {
    emailInput,
    isValidateNumValid,
    setValidateNumValid,
    isPasswordValid,
    setPasswordValid,
    isPwCheckValid,
    setPwCheckValid,
  } = useContext(AuthContext);

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
      if (value.length <= 20) {
        setPasswordInput(value);
      }
  };

  const handlePwCheckInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setPwCheckInput(value);
    }
  };

  const changePassword = async () => {
    if (!isValidateNumValid) {
      alert("이메일 인증을 진행해주세요");
    } else if (!isPasswordValid) {
      alert("비밀번호 형식을 확인해주세요");
    } else if (!isPwCheckValid) {
      alert("비밀번호 확인 값이 일치하지 않습니다.");
    } else {
      const res = await changePasswordAPI(emailInput, passwordInput);
      handleImgLocation(res);
    }
  };

  const backToLogin = () => {
    handleImgLocation(0);
  };

  useEffect(() => {
    setValidateNumValid(false);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-16 mb-20 text-[2.4rem]">비밀번호 변경</div>

      {/* 이메일 인증 관련 컴포넌트 */}
      <EmailVerification location={2} />
      {isValidateNumValid ? (
        <div>
          <div>
            {/* 새 비밀번호 input */}
            <div className="flex mb-2 justify-between min-h-[3.4rem]">
              <span className="mt-1.5">새 비밀번호</span>
              <Input
                onChange={handlePasswordInputChange}
                value={passwordInput}
                validate={validatePassword}
                setValidateState={setPasswordValid}
                type="password"
              />
            </div>

            {/* 비밀번호 확인 input */}
            <div className="flex mb-2 justify-between">
              <span className="mt-1.5 mr-2">비밀번호 확인</span>
              <Input
                onChange={handlePwCheckInputChange}
                value={pwCheckInput}
                validate={(value) =>
                  validateMatchPassword(value, passwordInput)
                }
                setValidateState={setPwCheckValid}
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
      ) : (
        <div className="mt-2 opacity-50">
          <span className="mr-4">비밀번호를 아신다면?</span>
          <span className="cursor-pointer" onClick={backToLogin}>로그인</span>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
