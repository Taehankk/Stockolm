import { useContext } from "react";

import Input from "../../../../components/elements/Input";
import Button from "../../../../components/elements/Button";

import { checkAnalystCodeAPI } from "../../../../api/authAPI";
import { validateName } from "../../../../utils/validation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../AuthContext";

const AnalystSignUp = () => {
  const {
    isAnalyst,
    setIsAnalyst,
    codeInput,
    setCodeInput,
    nameInput,
    setNameInput,
    setCodeValid,
    setNameValid,
  } = useContext(AuthContext);

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {  // 글자 수가 8자 이하일 때만 상태 업데이트
      setCodeInput(value);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 15) {  // 글자 수가 8자 이하일 때만 상태 업데이트
      setNameInput(value);
    }
  };

  const checkAnalyst = () => {
    setIsAnalyst(true);
  };

  const checkCommon = () => {
    setIsAnalyst(false);
  };

  const checkCode = async () => {
    const valid = await checkAnalystCodeAPI(codeInput);

    if (valid) {
      alert("코드 인증 성공");
      setCodeValid(true);
    } else {
      alert("코드 인증 실패, 코드를 확인하세요");
      setCodeValid(false);
    }
  };
  return (
    <div>
      {/* 애널리스트 확인 */}
      <div className="flex mb-2 items-center justify-center text-sm text-gray-500">
        <span className="mr-6">애널리스트 이신가요?</span>
        <div className="flex mr-5 items-center cursor-pointer" onClick={checkAnalyst}>
          <span className={`${isAnalyst ? "text-[#26F030]" : ""}`}>예</span>
          {/* 체크버튼 하나 */}
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`${isAnalyst ? "text-[#26F030]" : ""} ml-1 mb-[0.1rem]`}
          />
        </div>
        <div className="flex items-center cursor-pointer" onClick={checkCommon}>
          <span className={`${isAnalyst ? "" : "text-[#26F030]"}`}>아니오</span>
          {/* 체크버튼 하나 */}
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`${isAnalyst ? "" : "text-[#26F030]"} ml-1 mb-[0.1rem]`}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isAnalyst ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <div className="transition-transform">
          {/* <div className="flex justify-between items-center"> */}
          <div className="flex mt-2 gap-4 w-[24vw] justify-between">
            <span className="mt-1.5">코드</span>
            <div className="flex items-center justify-end mb-2">
              <Input
                size="medium"
                onChange={handleCodeInputChange}
                value={codeInput}
                className="mr-2 text-sm"
              />
              <Button
                size="small"
                onClick={checkCode}
                children="확인"
                className="text-[0.8rem] w-20 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between mb-1.5 min-h-[3.4rem]">
            <span className="mt-1.5">이름</span>
            <Input
              onChange={handleNameInputChange}
              value={nameInput}
              validate={validateName}
              setValidateState={setNameValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystSignUp;
