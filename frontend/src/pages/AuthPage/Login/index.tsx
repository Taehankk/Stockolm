import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import Cookies from "universal-cookie";

import Button from "../../../components/elements/Button";
import Input from "../../../components/elements/Input";
import axiosInstance from "../../../api/axiosInstance";

interface Props {
  handleImgLocation: (value: number) => void;
}

const Login = ({ handleImgLocation }: Props) => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // const cookies = new Cookies();

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
    axiosInstance
      .post("/user/login", {
        userEmail: emailInput, //유저 이메일
        userPassword: passwordInput,
      })
      .then((res) => {
        const accessToken = res.headers.authorization.replace("Bearer ", "");
        sessionStorage.setItem("access_token", accessToken); // 만료시간 1시간, refresh는 43200분(720시간, 30일)
        // cookies.set("refresh_token");
        const token = sessionStorage.getItem("access_token");

        const payload = token?.split(".")[1];

        if (payload) {
          const base64 = payload?.replace(/-/g, "+").replace(/_/g, "/");

          try {
            const decodedJWT = JSON.parse(
              decodeURIComponent(
                window
                  .atob(base64)
                  .split("")
                  .map(function (c) {
                    return (
                      "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                  })
                  .join("")
              )
            );

            sessionStorage.setItem("role", decodedJWT.roleType);
            console.log(decodedJWT.roleType);
          } catch (e) {
            console.log("JWT 디코딩 오류 발생 : " + e);
          }
        }

        navigate("/");
      })
      .catch((e) => {
        if (e.response) {
          alert(e.response.data);
        }
      });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-16 text-[2.4rem]">로그인</div>
      <div className="flex flex-col gap-2 w-[24vw]">
        <div className="flex items-center justify-between">
          <span className="">이메일</span>
          <Input onChange={handleEmailInputChange} value={emailInput} />
        </div>
        <div className="flex items-center justify-between">
          <span className="mr-6">비밀번호</span>
          <Input
            onChange={handlePasswordInputChange}
            value={passwordInput}
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
