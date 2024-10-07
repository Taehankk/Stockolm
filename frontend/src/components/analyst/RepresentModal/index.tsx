import Button from "../../elements/Button";
import close from "/src/assets/close.svg";
import watch from "/src/assets/watch.svg";
import like from "/src/assets/like.svg";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAnalystBoard } from "../../../api/analystAPI";

interface RepresentModalProps {
  size?: string;
  context?: string;
  content?: string;
  name?: string;
  file?: string;
  watch?: number;
  like?: number;
  stockNameProps?: string;
  onCloseClick?: () => void;
  onConfirmClick?: () => void;
  onFileClick?: () => void;
  onContentClick?: (id: number) => void; 
}

interface UserDataProps {
  content?: string;
  name?: string;
  file?: string;
}

interface AnalDataProps {
  content?: string;
  watch?: number;
  like?: number;
  file?: string;
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

type Props = RepresentModalProps & UserDataProps & AnalDataProps;

const RepresentModal = ({
  size = "smal",
  context = "대표글로 설정하시겠습니까  ?",
  stockNameProps,
  onCloseClick,
  onConfirmClick,
  onFileClick,
  onContentClick,
}: Props) => {
  
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9999);
  const { nickname } = useParams<{ nickname: string }>();

  useEffect(() => {
    setRole(sessionStorage.getItem("role") || "USER");
    setCurrentPage(1);
    setItemsPerPage(9999);
  },[])

  const { data: analystBoard, error: analystBoardError, isLoading: analystBoardIsLoading } = useQuery<AnalystBoard, Error>({
    queryKey: ["analystBoard", currentPage, itemsPerPage, nickname], 
    queryFn: ({ queryKey }) => fetchAnalystBoard(queryKey[1] as number - 1, queryKey[2] as number, queryKey[3] as string),
  });

  const handleClickAnalyzeStock = (analystBoardId: number) => {
    if (onContentClick) {
      onContentClick(analystBoardId);
    }
  }

  useEffect(() => {
    console.log("role:", role);
    console.log("stockNameProps:", stockNameProps);
  }, [role, stockNameProps]);

  if ( analystBoardIsLoading) {
    return <p>Loading...</p>;
  }

  if ( analystBoardError) {
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
            
              <span className="text-[1.5rem] mb-[3rem]">내가 분석한 글</span>
            
            <div className="flex flex-col w-full h-[20rem] gap-[3rem] overflow-y-auto">
              {
                analystBoard?.content?.map((item, index) => (
                  <div key={index} className="flex w-full px-[5rem] text-[1.25rem]" onClick={() => handleClickAnalyzeStock(item.analystBoardId)}>
                    <span className="w-[26rem] pr-[2rem] cursor-pointer" onClick={() => onContentClick && onContentClick(item.analystBoardId)}>{item.title}</span>
                    <div className="flex">
                      <div className="flex w-[8rem] gap-[0.5rem]">
                        <img src={watch} className="w-[1.25rem] h-[1.25rem] self-center"/>
                        <span className="h-[1.6rem] self-center">{item.viewCnt}</span>
                      </div>
                      <div className="flex w-[8rem] gap-[0.5rem]">
                        <img src={like} className="w-[1.25rem] h-[1.25rem] self-center"/>
                        <span className="h-[1.6rem] self-center">{item.likeCnt}</span>
                      </div> 
                      <span className="h-[1.6rem] self-center cursor-pointer" onClick={onFileClick}>{item.userImagePath}</span>
                    </div>
                  </div>
                  ))}
            </div>
          </div>
        </div>
      )}
  </div>);
};

export default RepresentModal;