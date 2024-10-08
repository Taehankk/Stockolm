// 닉네임 검증: 1~8자의 한글
export const validateNickname = (value: string): string | undefined => {
  const nicknameRegex = /^[가-힣a-zA-Z]{2,8}$/;
  if (!nicknameRegex.test(value)) {
    return "닉네임은 2~8자의 글자여야 합니다.";
  }
  return undefined;
};

export const validateName = (value: string): string | undefined => {
  const nameRegex = /^[가-힣]{2,8}$/;
  if (nameRegex.test(value)) {
    return "한글 이름만 입력 가능합니다.";
  }
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

export const validateMatchPassword = (
  value: string,
  password: string
): string | undefined => {
  if (value !== password) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return undefined;
};

export const validateSearchInputLength = (value: string) => {
  if (value.length > 20) {
    alert("최대 20자 입력만 가능합니다.");
    return value.slice(0, 21);
  }
  return value;
};

export const validateCommentInputLength = (value: string) => {
  if (value.length > 100) {
    alert("최대 50자 입력만 가능합니다.");
    return value.slice(0, 51);
  }
  return value;
};

export const validateEditorInputLength = (value: string) => {
  if (value.length > 500) {
    alert("최대 300자 입력만 가능합니다.");
    return value.slice(0, 301);
  }
  return value;
};

export const validateTitleInputLength = (value: string) => {
  if (value.length > 50) {
    alert("최대 30자 입력만 가능합니다.");
    return value.slice(0, 16);
  }
  return value;
};
