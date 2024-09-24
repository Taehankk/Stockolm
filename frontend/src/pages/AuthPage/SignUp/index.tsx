import { useContext } from "react";

import Button from "../../../components/elements/Button";

import { signUpAPI } from "../../../api/authAPI";
import UserSignUp from "../../../components/auth/signup/UserSignup";
import AnalystSignUp from "../../../components/auth/signup/AnalystSignup";
import { SignUpContext } from "../../../components/auth/SignUpContext";

interface Props {
  handleImgLocation: (value: number) => void;
}

const SignUp = ({ handleImgLocation }: Props) => {
  const {
    emailInput,
    passwordInput,
    nameInput,
    nicknameInput,
    emailAuthId,
    isNicknameValid,
    isEmailValid,
    isValidateNumValid,
    isPasswordValid,
    isPwCheckValid,
    isAnalyst,
    isCodeValid,
    isNameValid,
  } = useContext(SignUpContext);

  const signUp = async () => {
    if (!isNicknameValid) {
      alert("닉네임 입력값을 확인하세요.");
    } else if (!isEmailValid) {
      alert("이메일 입력값을 확인하세요.");
    } else if (!isValidateNumValid) {
      alert("이메일 인증을 진행해주세요.");
    } else if (!isPasswordValid) {
      alert("비밀번호 입력값을 확인하세요.");
    } else if (!isPwCheckValid) {
      alert("비밀번호 확인 값이 일치하지 않습니다.");
    } else if (isAnalyst) {
      if (!isCodeValid) {
        alert("코드 인증을 확인해주세요.");
      } else if (!isNameValid) {
        alert("이름을 확인해주세요.");
      } else {
        const res = await signUpAPI(
          emailInput,
          passwordInput,
          nameInput,
          nicknameInput,
          "ANALYST",
          emailAuthId
        );
        handleImgLocation(res);
      }
    } else {
      const res = await signUpAPI(
        emailInput,
        passwordInput,
        "",
        nicknameInput,
        "USER",
        emailAuthId
      );
      handleImgLocation(res);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-10 text-[2.4rem]">회원가입</div>

      <div className="flex flex-col">
        <UserSignUp />
        <AnalystSignUp />
      </div>
      <Button onClick={signUp} children="회원가입" className="mt-8" />
    </div>
  );
};

export default SignUp;
