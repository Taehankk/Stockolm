import { useContext } from "react";

import Input from "../../../../components/elements/Input";
import Button from "../../../../components/elements/Button";

import { checkAnalystCodeAPI } from "../../../../api/authAPI";
import { validateName } from "../../../../utils/validation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { SignUpContext } from "../../SignUpContext";

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
  } = useContext(SignUpContext);

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodeInput(value);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value);
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
        <div className="flex mr-5 items-center">
          <span>예</span>
          {/* 체크버튼 하나 */}
          <FontAwesomeIcon
            icon={faCircleCheck}
            onClick={checkAnalyst}
            className={`${isAnalyst ? "text-[#26F030]" : ""}`}
          />
        </div>
        <div className="flex items-center">
          <span>아니오</span>
          {/* 체크버튼 하나 */}
          <FontAwesomeIcon
            icon={faCircleCheck}
            onClick={checkCommon}
            className={`${isAnalyst ? "" : "text-[#26F030]"}`}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isAnalyst ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <div className="transition-transform">
          <div className="flex justify-between items-center">
            <span>코드</span>
            <div className="flex items-center justify-end mb-2">
              <Input
                size="small"
                onChange={handleCodeInputChange}
                value={codeInput}
                className="mr-8 w-32"
              />
              <Button
                size="small"
                onClick={checkCode}
                children="확인"
                className="text-[0.8rem] w-20"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span>이름</span>
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
