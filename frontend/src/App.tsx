import "./App.css";
import Button from "./components/elements/Button";
import Input from "./components/elements/Input";
import { useState } from "react";
import { validateNickname } from "./utils/validation";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const onClick = () => {
    console.log("버튼이 클릭되었습니다", inputValue);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (error) {
        alert("닉네임을 확인하세요.");
      } else {
        onClick();
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 닉네임 유효성 검사를 수행하고 에러 상태 업데이트
    const validationResult = validateNickname(value);
    setError(validationResult);
  };

  return (
    <>
      <div className="flex ">
        <Input
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleEnterKeyPress} // Enter 키 이벤트 처리
          validate={validateNickname}
        />
        <Button
          className="ml-10"
          size="large"
          fontSize="large"
          onClick={onClick}
          children="로그인"
        />
      </div>
    </>
  );
}

export default App;
