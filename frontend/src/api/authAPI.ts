import axiosInstance from "./axiosInstance";
import axiosTokenInstance from "./axiosTokenInstance";

export const checkNicknameDuplicateAPI = async (nickname: string) => {
  try {
    await axiosInstance.post("/user/nickname", {
      userNickname: nickname,
    });
  } catch (e: any) {
    if (e.response && e.response.status === 409) {
      return e.response.data;
    }
  }
};

export const sendEmailAPI = async (location: number, email: string) => {
  try {
    if (location === 1) {
      const res = await axiosInstance.post("/user/send-mail", {
        userEmail: email,
      });
      alert("이메일에서 인증코드를 확인해주세요.");
      return res.data.emailAuthId;
    } else {
      const res = await axiosInstance.post("/user/find-password/send-mail", {
        userEmail: email,
      });
      alert("이메일에서 인증코드를 확인해주세요.");
      return res.data.emailAuthId;
    }
  } catch (e: any) {
    if (location === 1 && e.response && e.response.status === 400) {
      alert("이미 가입한 이메일입니다.");
    } else if (location === 2 && e.response && e.response.status === 404) {
      alert("이메일을 확인해주세요");
    }
    return "";
  }
};

export const checkValidateAPI = async (
  emailAuthId: number,
  validateNum: string
) => {
  try {
    await axiosInstance.post("/user/send-mail/validation", {
      emailAuthId: emailAuthId,
      randomKey: validateNum,
    });

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
    await axiosInstance.post("/user/auth-code", {
      codeNumber: code,
    });

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
    await axiosInstance.post("/user/sign-up", {
      userEmail: email, //유저 이메일
      userPassword: password, //유저 패스워드
      userName: name, //애널리스트 실명
      userNickname: nickname, //일반 유저 닉네임
      roleType: role, //역할 [유저, 애널리스트, 구독자]
      emailAuthId: emailAuthId,
    });

    alert("회원가입이 정상적으로 완료되었습니다.");
    return 0;
  } catch (e: any) {
    if (e.response) {
      alert("입력정보를 확인해주세요");
    }
    return 1;
  }
};

export const loginAPI = async (email: string, password: string) => {
  await axiosInstance
    .post("/user/login", {
      userEmail: email, //유저 이메일
      userPassword: password,
    })
    .then((res) => {
      const accessToken = res.headers.authorization.replace("Bearer ", "");
      sessionStorage.setItem("access_token", accessToken); // 만료시간 1시간, refresh는 43200분(720시간, 30일)

      const token = sessionStorage.getItem("access_token");

      updateAccessToken(decodeToken(token!));
    })
    .catch((e) => {
      if (e.response) {
        alert(e.response.data);
      }
    });
};

export const updateAccessToken = async (expTime: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const refreshTime = expTime - currentTime - 300;

  if (refreshTime > 0) {
    setTimeout(async () => {
      try {
        const res = await axiosTokenInstance.post("/refresh-token");

        const newAccessToken = res.headers.authorization.replace("Bearer ", "");
        sessionStorage.setItem("access_token", newAccessToken);

        updateAccessToken(decodeToken(newAccessToken!));
      } catch {
        alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
        sessionStorage.clear();
        window.location.href = "/auth ";
      }
    }, refreshTime * 1000);
  }
};

export const decodeToken = (token: string) => {
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
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
      console.log(decodedJWT);

      sessionStorage.setItem("role", decodedJWT.roleType);
      return decodedJWT.exp;
    } catch (e) {
      console.log("JWT 디코딩 오류 발생 : " + e);
    }
  }
};

export const changePasswordAPI = async (email: string, password: string) => {
  try {
    await axiosInstance.patch("/user/password", {
      userEmail: email, //유저 이메일
      newPassword: password,
    });
    alert("비밀번호 변경 완료");
    return 0;
  } catch {
    alert("비밀번호 변경 실패, 입력값을 확인하세요");
    return 2;
  }
};

export const logoutAPI = async () => {
  await axiosTokenInstance.post("/user/logout");
};
