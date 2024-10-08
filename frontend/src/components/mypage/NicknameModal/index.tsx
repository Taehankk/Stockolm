import { useState } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import close from "/src/assets/close.svg";
import { patchNickname } from "../../../api/mypageAPI";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../slices/userSlice";
import { AppDispatch } from "../../../store";

interface NicknameModalProps {
  context: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NicknameModal = ({
  context,
  setIsModal,
}: NicknameModalProps) => {

  const [newNickname, setNewNickname] = useState("");
  const [error, setError] = useState("");

  const dispatch: AppDispatch = useDispatch(); 

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      setNewNickname(value);
      setError("");
      console.log(error);
    } else {
      setError("닉네임은 1~8글자로 입력해주세요.");
    }
  }
  const handleClickCloseButton = () => {
    setIsModal(false);
  }

  const handleClickConfirmButton = async () => {
    if (newNickname.length === 0) {
      alert("닉네임을 입력해주세요.");
    return;
  }
    try {
      const response = await patchNickname(newNickname);

      if (response.status === 204) {
        dispatch(getUserInfo());
        setIsModal(false);
      }
    } catch (error) {
      console.error("닉네임 변경:", error);
      alert("닉네임이 중복됩니다.");
    }
  }

  return(
    <div>
      <div className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-[0.3]">
        <div className="flex flex-col absolute top-[17rem] left-[36rem] z-100 rounded-xl bg-white w-[20rem] h-[12rem]">
          <div className="flex flex-col justify-center items-center relative w-full h-full gap-[1rem]">
            <img src={close} className="absolute w-[1rem] h-[1rem] top-[1rem] right-[1rem] self-end cursor-pointer" onClick={handleClickCloseButton} />
            <span>{context}</span>
            <div className="flex flex-col gap-[0.5rem]">
              <Input className="w-[5rem]" value={newNickname} onChange={handleChangeValue}></Input>
              <Button onClick={handleClickConfirmButton}>확인</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;