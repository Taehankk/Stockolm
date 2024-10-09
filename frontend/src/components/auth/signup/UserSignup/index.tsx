import { useContext } from "react";

import { AuthContext } from "../../AuthContext";
import Input from "../../../../components/elements/Input";

import {
  validateNickname,
  validatePassword,
  validateMatchPassword,
} from "../../../../utils/validation";

import { checkNicknameDuplicateAPI } from "../../../../api/authAPI";

import EmailVerification from "../../common/EmailVerification";

const UserSignUp = () => {
  const {
    nicknameInput,
    setNicknameInput,
    passwordInput,
    setPasswordInput,
    pwCheckInput,
    setPwCheckInput,
    setNicknameValid,
    setPasswordValid,
    setPwCheckValid,
  } = useContext(AuthContext);

  const handleNicknameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setNicknameInput(value);
    }
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length < 20) {
      setPasswordInput(value);
    }
  };

  const handlePwCheckInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 20) {
      setPwCheckInput(value);
    }
  };

  const checkNicknameValidation = async (nickname: string) => {

    const formatError = validateNickname(nickname);
    if (formatError) {
      return formatError; // 형식 검증 실패 시 바로 리턴
    }

    const duplicateError: string | undefined =
      await checkNicknameDuplicateAPI(nickname);
    if (duplicateError) {
      return duplicateError; // 중복 체크 실패 시 리턴
    }

    return undefined;
  };

  return (
    <div>
      {/* 닉네임 input */}
      <div className="flex mb-1.5 w-[24vw] justify-between min-h-[3.4rem]">
        <span className="mt-1.5">닉네임</span>
        <Input
          onChange={handleNicknameInputChange}
          value={nicknameInput}
          validate={checkNicknameValidation}
          setValidateState={setNicknameValid}
        />
      </div>

      {/* 이메일 input */}
      <EmailVerification location={1} />

      {/* 비밀번호 input */}
      <div className="flex mt-5 mb-1.5 justify-between min-h-[3.4rem]">
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
