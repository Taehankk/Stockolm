import axiosInstance from "./axiosInstance";
import { CustomAxiosRequestConfig } from "./axiosInstance";

export const checkNicknameDuplicateAPI = async (nickname: string) => {
  try {
    await axiosInstance.post(
      "/user/nickname",
      {
        userNickname: nickname,
      },
      {
        headers: {},
        authRequired: false,
      } as CustomAxiosRequestConfig
    );
  } catch (e: any) {
    if (e.response && e.response.status === 409) {
      return e.response.data;
    }
  }
};

export const sendEmailAPI = async (email: string) => {
  try {
    const res = await axiosInstance.post(
      "/user/send-mail",
      {
        userEmail: email,
      },
      {
        headers: {},
        authRequired: false,
      } as CustomAxiosRequestConfig
    );

    alert("이메일에서 인증코드를 확인해주세요.");
    return res.data.emailAuthId;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      alert("이미 가입한 이메일입니다.");
      return "";
    }
  }
};

export const checkValidateAPI = async (
  emailAuthId: number,
  validateNum: string
) => {
  try {
    await axiosInstance.post(
      "/user/send-mail/validation",
      {
        emailAuthId: emailAuthId,
        randomKey: validateNum,
      },
      {
        headers: {},
        authRequired: false,
      } as CustomAxiosRequestConfig
    );

    alert("이메일 인증 성공");

    return true;
  } catch (e: any) {
    if (e.response) {
      console.log(e.response);
      alert("인증번호를 확인해주세요");
      return false;
    }
  }
};

export const checkAnalystCodeAPI = async (code: string) => {
  try {
    await axiosInstance.post(
      "/user/auth-code",
      {
        codeNumber: code,
      },
      {
        headers: {},
        authRequired: false,
      } as CustomAxiosRequestConfig
    );

    return true;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      alert("인증코드를 확인하세요");
      return false;
    }
  }
};

export const signUpAPI = async (
  email: string,
  password: string,
  name: string,
  nickname: string,
  role: string,
  emailAuthId: number
) => {
  try {
    await axiosInstance.post(
      "/user/sign-up",
      {
        userEmail: email, //유저 이메일
        userPassword: password, //유저 패스워드
        userName: name, //애널리스트 실명
        userNickname: nickname, //일반 유저 닉네임
        roleType: role, //역할 [유저, 애널리스트, 구독자]
        emailAuthId: emailAuthId,
      },
      {
        headers: {},
        authRequired: false,
      } as CustomAxiosRequestConfig
    );

    alert("회원가입이 정상적으로 완료되었습니다.");
    return 0;
  } catch (e: any) {
    if (e.response) {
      alert("입력정보를 확인해주세요");
    }
    return 1;
  }
};
