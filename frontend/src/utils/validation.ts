// 닉네임 검증: 1~8자의 한글
export const validateNickname = (value: string): string | undefined => {
  const nicknameRegex = /^[가-힣a-zA-Z]{2,8}$/;
  if (!nicknameRegex.test(value)) {
    return "닉네임은 2~8자의 글자여야 합니다.";
  }
  return undefined;
};

// 비밀번호 검증: 6~20글자 이내의 문자
export const validatePassword = (value: string): string | undefined => {
  if (value.length < 6 || value.length > 20) {
    return "비밀번호는 6~20자 사이여야 합니다.";
  }
  return undefined;
};

// 이메일 검증: 유효한 이메일 형식
export const validateEmail = (value: string): string | undefined => {
  const emailRegex = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,3}$/;
  if (!emailRegex.test(value)) {
    return "유효한 이메일 주소를 입력하세요.";
  }
  return undefined;
};
