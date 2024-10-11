import Button from "../../elements/Button";
import close from "/src/assets/close.svg";
import watch from "/src/assets/watch.svg";
import like from "/src/assets/like.svg";
import pdf from "/src/assets/pdf.svg"

import { fetchFavoriteBoard } from "../../../api/mypageAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalystKeywordBoard } from "../../../api/analystAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ModalProps {
  size?: string;
  context?: string;
  content?: string;
  name?: string;
  userNickName?: string;
  file?: string;
  watch?: number;
  like?: number;
  stockNameProps?: string;
  onCloseClick?: () => void;
  onConfirmClick?: () => void;
  onFileClick?: () => void;
  onContentClick?: () => void; 
}

interface UserDataProps {
  conten?: string;
  name?: string;
  file?: string;
}

interface AnalDataProps {
  content?: string;
  watch?: number;
  like?: number;
  file?: string;
}

interface FavoriteBoard {
  analystBoardId?: number; 
	stockName?: string;
	title?: string;
	userName?: string;
	userNickName?: string;
	goal_stock?: number;
	userImagePath?: string;
}

interface AnalystBoard {
  content?: {
    userName: string;
    userNickName: string;
    userImagePath: string;

    stockName: string;
    companyImagePath: string;

    analystBoardId: number;
    mainContent: boolean;
    title: string;
    likeCnt: number;
    viewCnt: number;
    createAt: string;
    updateAt: string;
    like: boolean;
    filePath: string;
  }[];
  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  size?: number;
  number?: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements?: number;
  empty?: boolean;
}

type Props = ModalProps & UserDataProps & AnalDataProps;

const Modal = ({
  size = "smal",
  context = "비밀번호를 변경하시겠습니까?",
  stockNameProps,
  onCloseClick,
  onConfirmClick,
}: Props) => {
  
  const [role, setRole] = useState("");
  const [keywordCurrentPage, setKeywordCurrentPage] = useState(1);
  const [keywordItemsPerPage, setKeywordItemsPerPage] = useState(9999);
  const { userNickName } = useSelector((state: RootState) => state.user);

  const nav = useNavigate();

  useEffect(() => {
    setRole(sessionStorage.getItem("role") || "USER");
    setKeywordCurrentPage(1);
    setKeywordItemsPerPage(9999);
  },[])

  const handleClickFavoriteStock = (userNickName?: string, analystBoardId?: number) => {
  if (userNickName && analystBoardId) {
    nav(`/analyst/${userNickName}/report/${analystBoardId}`);
  }
};

  const handleClickAnalyzeStock = (userNickName: string, analystBoardId: number) => {
    nav(`/analyst/${userNickName}/report/${analystBoardId}`);
  }

  const { data: favoriteBoard, error: analystBoardError, isLoading: analystBoardIsLoading } = useQuery<FavoriteBoard[], Error>({
    queryKey: ["favoriteBoard", stockNameProps], 
    queryFn: ({ queryKey }) => fetchFavoriteBoard(queryKey[1] as string),
    enabled: role === "USER" && !!stockNameProps,
  });

  const { data: analystKeywordBoard, error: analystKeywordBoardError, isLoading: analystKeywordBoardIsLoading } = useQuery<AnalystBoard, Error>({
    queryKey: ["analystKeywordBoard", keywordCurrentPage, keywordItemsPerPage, stockNameProps, userNickName], 
    queryFn: ({ queryKey }) => fetchAnalystKeywordBoard(queryKey[1] as number - 1, queryKey[2] as number, queryKey[3] as string, queryKey[4] as string),
    enabled: role === "ANALYST" && !!stockNameProps,
  });

  useEffect(() => {
    console.log("role:", role);
    console.log("stockNameProps:", stockNameProps);
    console.log("analystKeywordBoard:", analystKeywordBoard)
  }, [role, stockNameProps]);

  useEffect(() => {
    console.log(stockNameProps)
    console.log([favoriteBoard])
  },[favoriteBoard])

  useEffect(() => {
  }, [analystKeywordBoard, analystKeywordBoardError]);


  if ( analystKeywordBoardIsLoading || analystBoardIsLoading) {
    return <p>Loading...</p>;
  }

  if ( analystKeywordBoardError || analystBoardError) {
    return <p>Error</p>;
  }

  return (
    <div>
      {size === "small" ? (
        <div className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-[0.3]">
          <div className="flex flex-col justify-center items-center gap-[1.5rem] absolute top-[17rem] left-[36rem] z-100 rounded-xl bg-white w-[20rem] h-[10rem]">
            <span>{context}</span>
            <Button className="w-[4rem] h-[2rem]" onClick={onConfirmClick}>확인</Button>
          </div>
        </div>
      ) : (
        <div className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-[0.3]">
          <div className="flex flex-col items-center absolute top-[5rem] left-[16rem] z-100 rounded-xl bg-white w-[60rem] h-[36rem]">
            <img src={close} className="self-end pr-[2rem] pt-[2rem] mb-[2rem] cursor-pointer" onClick={onCloseClick} />
            {role === "USER" ? (
              <span className="text-[1.5rem] mb-[3rem]">내가 좋아한 글</span>
            ) : (
              <span className="text-[1.5rem] mb-[3rem]">내가 분석한 글</span>
            )}
            <div className="flex flex-col w-full h-[20rem] gap-[3rem] overflow-y-auto">
              {role === "USER" ? (
                favoriteBoard && favoriteBoard.length > 0 ? (
                  [favoriteBoard].flat().map((item, index) => (
                    <div key={index} className="flex w-full px-[5rem] text-[1.25rem]">
                      <span className="w-[33rem] cursor-pointer" onClick={() => handleClickFavoriteStock(item?.userNickName, item?.analystBoardId)}>
                        {item?.title}
                      </span>
                      <div className="flex">
                        <span className="w-[10rem]">{item?.userName}</span>
                        <a href={item?.userImagePath} className="cursor-pointer">
                          <span className="mr-2 flex items-center">
                            <img src={pdf} className="w-[1rem] h-[1rem] mt-[0.2rem]" />
                          </span>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-[20rem]">
                    <span className="text-center text-[1.5rem]">해당 종목 관련 좋아한 분석글이 없습니다.</span>
                  </div>
                )
              ) : (
                analystKeywordBoard?.content?.map((item, index) => (
                  <div key={index} className="flex w-full px-[5rem] text-[1.25rem]">
                    <span className="w-[26rem] pr-[2rem] cursor-pointer" onClick={() => handleClickAnalyzeStock(item.userNickName, item.analystBoardId)}>
                      {item.title}
                    </span>
                    <div className="flex">
                      <div className="flex w-[8rem] gap-[0.5rem]">
                        <img src={watch} className="w-[1.25rem] h-[1.25rem] self-center" />
                        <span className="h-[1.6rem] self-center">{item.viewCnt}</span>
                      </div>
                      <div className="flex w-[8rem] gap-[0.5rem]">
                        <img src={like} className="w-[1.25rem] h-[1.25rem] self-center" />
                        <span className="h-[1.6rem] self-center">{item.likeCnt}</span>
                      </div>
                      <a href={item?.filePath} className="cursor-pointer">
                        <span className="mr-2 flex items-center">
                          <img src={pdf} className="w-[1.5rem] h-[1.5rem] mt-[0.2rem]" />
                        </span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>);
};

export default Modal;