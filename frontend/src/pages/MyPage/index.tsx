import { Link, Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import pencil from "/src/assets/pencil.svg";
import memo from "/src/assets/memo.svg";
import plusPerson from "/src/assets/plusPerson.svg";
import ranking from "/src/assets/rank.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getUserInfo } from "../../slices/userSlice";
import NicknameModal from "../../components/mypage/NicknameModal";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalystInfo } from "../../api/analystAPI";
import { postProfileImage } from "../../api/mypageAPI";

interface AnalystInfo {
  boardSize: number;
  follower: number;
  totalAnalystRank: number;
  reliability: number;
  reliabilityStock: [
    {
      stockName: string;
      stockSize: number;
      stockReliabilitySize: number;
      stockReliabilityValue: number;
    }
  ];
  accuracy: number;
  accuracyStock: [
    {
      stockName: string;
      stockSize: number;
      stockAccuracySize: number;
      stockAccuracyValue: number;
    }
  ];
  industry: [
    {
      industryName: string;
      industryValue: number;
    }
  ];
}

const MyPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userName, userNickName, userImagePath, loading, error } = useSelector((state: RootState) => state.user);

  const [nickName, setNickName] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [role, setRole] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(userImagePath);

  const { data: analystInfo, error: analystInfoError, isLoading: analystInfoIsLoading } = useQuery<AnalystInfo, Error>({
    queryKey: ["analystInfo", userNickName],
    queryFn: ({ queryKey }) => fetchAnalystInfo(queryKey[1] as string),
  });

  useEffect(() => {
    setRole(sessionStorage.getItem("role") || "USER");
  }, []);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    setNickName(userNickName);

  }, [userNickName]);

  if (loading || analystInfoIsLoading) {
    return <p>Loading...</p>;
  }

  if (error || analystInfoError) {
    return <p>Error: {error}</p>;
  }

  const handleClickPencil = () => {
    setIsModal(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;

      if (fileType === 'image/jpeg') {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));

        console.log(selectedFile);
        try {
          await postProfileImage(file);
          alert("프로필 이미지가 성공적으로 변경되었습니다.");
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          alert("이미지 업로드에 실패했습니다.");
        }
      } else {
        alert("JPG 파일만 업로드할 수 있습니다.");
        e.target.value = '';
      }
    }
  };

  return (
    <BasicLayout>
      <div className="flex flex-col">
        <div className="flex relative self-end w-[80%] h-[110px] mt-[3rem] border-b-black border-b-2">
          <div
            className="absolute left-[-7rem] w-[9rem] h-[9rem]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <label htmlFor="profileImage" className="cursor-pointer relative">
              <img
                className="w-full h-full rounded-full object-cover"
                src={imagePreview || userImagePath}
                alt="Profile"
              />
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="cursor-pointer text-white flex flex-col items-center">
                    <span className="text-center" onClick={() => document.getElementById('profileImage')?.click()}>
                      이미지 변경
                    </span>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div className="pl-[3rem] h-full flex items-end text-[2.25rem]">
            {role === "USER" ? nickName : userName}님, 안녕하세요!
          </div>

          <div className="flex h-full">
            <img
              className="w-[1.6rem] h-[1.6rem] ml-[1rem] mb-[1rem] self-end cursor-pointer"
              src={pencil}
              onClick={handleClickPencil}
            ></img>
            {isModal && <NicknameModal setIsModal={setIsModal} context="변경할 닉네임을 입력하세요."></NicknameModal>}
          </div>

          {role !== "USER" && (
            <div className="flex flex-1 w-[20rem] justify-end items-end gap-[2rem] ">
              <div>
                <div className="flex gap-[1rem]">
                  <img src={memo} className="w-[1.5rem] h-[1.5rem]" />
                  <span>작성글</span>
                </div>
                <span className="flex justify-end pr-[1rem]">{analystInfo?.boardSize}</span>
              </div>

              <div>
                <div className="flex gap-[1rem]">
                  <img src={plusPerson} className="w-[1.5rem] h-[1.5rem]" />
                  <span>구독자</span>
                </div>
                <span className="flex justify-end pr-[1rem]">{analystInfo?.follower}</span>
              </div>

              <div>
                <div className="flex gap-[1rem]">
                  <img src={ranking} className="w-[1.5rem] h-[1.5rem]" />
                  <span>순위</span>
                </div>
                <span className="flex justify-end pr-[0.7rem]">{analystInfo?.totalAnalystRank}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex mt-[2rem] h-[100vh]">
          <div className="w-[23rem] mr-[2rem] pr-[3rem] ">
            <div className="flex flex-col gap-[1.5rem] mx-auto w-[9rem] mt-[5rem] border-[#B4B4B4] border-y-[1px] py-[1.3rem] text-[1.25rem]">
              <div>
                <Link to={"profile"} className="cursor-pointer">
                  내 상태
                </Link>
              </div>
              {role === "ANALYST" ? <div>
                <Link to={`/analyst/${userNickName}`} className="cursor-pointer">
                  내 통계
                </Link>
              </div> : <></>}
              <div>
                <Link to={"password"} className="cursor-pointer">
                  비밀번호 수정
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full mt-[6rem]">
            <Outlet />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
