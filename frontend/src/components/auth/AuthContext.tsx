import { ReactNode, createContext, useState } from "react";

interface Context {
  nicknameInput: string;
  setNicknameInput: (value: string) => void;
  emailInput: string;
  setEmailInput: (value: string) => void;
  validateNumInput: string;
  setValidateNumInput: (value: string) => void;
  passwordInput: string;
  setPasswordInput: (value: string) => void;
  pwCheckInput: string;
  setPwCheckInput: (value: string) => void;
  emailAuthId: number;
  setEmailAuthId: (value: number) => void;

  isAnalyst: boolean;
  setIsAnalyst: (value: boolean) => void;
  codeInput: string;
  setCodeInput: (value: string) => void;
  nameInput: string;
  setNameInput: (value: string) => void;

  isNicknameValid: boolean;
  setNicknameValid: (value: boolean) => void;
  isEmailValid: boolean;
  setEmailValid: (value: boolean) => void;
  isValidateNumValid: boolean;
  setValidateNumValid: (value: boolean) => void;
  isPasswordValid: boolean;
  setPasswordValid: (value: boolean) => void;
  isPwCheckValid: boolean;
  setPwCheckValid: (value: boolean) => void;
  isCodeValid: boolean;
  setCodeValid: (value: boolean) => void;
  isNameValid: boolean;
  setNameValid: (value: boolean) => void;
}

const AuthContext = createContext<Context>({
  nicknameInput: "",
  setNicknameInput: () => {},
  emailInput: "",
  setEmailInput: () => {},
  validateNumInput: "",
  setValidateNumInput: () => {},
  passwordInput: "",
  setPasswordInput: () => {},
  pwCheckInput: "",
  setPwCheckInput: () => {},
  emailAuthId: 0,
  setEmailAuthId: () => {},

  isAnalyst: false,
  setIsAnalyst: () => {},
  codeInput: "",
  setCodeInput: () => {},
  nameInput: "",
  setNameInput: () => {},

  isNicknameValid: false,
  setNicknameValid: () => {},
  isEmailValid: false,
  setEmailValid: () => {},
  isValidateNumValid: false,
  setValidateNumValid: () => {},
  isPasswordValid: false,
  setPasswordValid: () => {},
  isPwCheckValid: false,
  setPwCheckValid: () => {},
  isCodeValid: false,
  setCodeValid: () => {},
  isNameValid: false,
  setNameValid: () => {},
});

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [nicknameInput, setNicknameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [validateNumInput, setValidateNumInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");
  const [emailAuthId, setEmailAuthId] = useState(0);

  const [isAnalyst, setIsAnalyst] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [isNicknameValid, setNicknameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isValidateNumValid, setValidateNumValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPwCheckValid, setPwCheckValid] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);
  const [isNameValid, setNameValid] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        nicknameInput,
        setNicknameInput,
        emailInput,
        setEmailInput,
        validateNumInput,
        setValidateNumInput,
        passwordInput,
        setPasswordInput,
        pwCheckInput,
        setPwCheckInput,
        emailAuthId,
        setEmailAuthId,

        isAnalyst,
        setIsAnalyst,
        codeInput,
        setCodeInput,
        nameInput,
        setNameInput,

        isNicknameValid,
        setNicknameValid,
        isEmailValid,
        setEmailValid,
        isValidateNumValid,
        setValidateNumValid,
        isPasswordValid,
        setPasswordValid,
        isPwCheckValid,
        setPwCheckValid,
        isCodeValid,
        setCodeValid,
        isNameValid,
        setNameValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
