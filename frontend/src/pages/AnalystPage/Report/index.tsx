  import { useEffect, useState } from "react";
  import CommunityCard from "../../../components/common/CommunityCard";
  import Pagination from "../../../components/common/Pagination";
  import { useQuery } from "@tanstack/react-query";
  import { fetchAnalystBoard, fetchAnalystInfo, patchRepresentWrite } from "../../../api/analystAPI";
  import { useParams } from "react-router-dom";
import RepresentModal from "../../../components/analyst/RepresentModal";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../slices/userSlice";

  interface AnalystBoard {
    content: {
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
    pageable: {
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
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  }

  interface AnalystInfo {
    userName: string,
    userNickName: string,
    boardSize: number,
    follower: number,
    totalAnalystRank: number,
    reliability: number,
    reliabilityStock: [
      {
        stockName: string,
        stockSize: number,
        stockReliabilitySize: number
        stockReliabilityValue: number
      },
    ],
    accuracy: number
    accuracyStock: [
      {
        stockName: string,
        stockSize: number,
        stockAccuracySize: number
        stockAccuracyValue: number 
      },
    ],	
    industry: [
      {
        industryName: string,
        industryValue: number
      },
    ]
  }

  const Report = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isModal, setIsModal] = useState(false);
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [role, setRole] = useState("");
    const { nickname } = useParams<{ nickname: string }>();
    const [analystBoardId, setAnalystBoardId] = useState(-1);
    const [currentCard, setCurrentCard] = useState<AnalystBoard["content"]>([]);
    const [currentCards, setCurrentCards] = useState<AnalystBoard["content"]>([]);

      const dispatch: AppDispatch = useDispatch();
      const { userNickName } = useSelector((state: RootState) => state.user);

    useEffect(() => {
      setRole(sessionStorage.getItem("role") || "USER");
      setItemsPerPage(6);
    },[])

    useEffect(() => {
      dispatch(getUserInfo());
    }, [dispatch]);

    const onPageChange = (page: number) => {
      console.log(role)
      console.log(currentCard)
      console.log(analystInfo)
      setCurrentPage(page); 
    };

    const { data: analystInfo, error: analystInfoError, isLoading: analystInfoIsLoading } = useQuery<AnalystInfo, Error>({
      queryKey: ["analystInfo", nickname], 
      queryFn: ({ queryKey }) => fetchAnalystInfo(queryKey[1] as string)
    });

    const { data: analystBoard, error: analystBoardError, isLoading: analystBoardIsLoading,  refetch: refetchAnalystBoard, } = useQuery<AnalystBoard, Error>({
      queryKey: ["analystBoard", currentPage, itemsPerPage, nickname], 
      queryFn: ({ queryKey }) => fetchAnalystBoard(queryKey[1] as number - 1, queryKey[2] as number, queryKey[3] as string),
    });
    
    useEffect(() => {
      if (analystBoard && analystBoard.content) {
        setCurrentCard(analystBoard.content);
      }
    }, [analystBoard]);

    useEffect(() => {
      let updatedData: AnalystBoard["content"] = analystBoard?.content ? [...analystBoard.content] : [];
    
      if (updatedData.length < itemsPerPage) {
        const remainder = updatedData.length % itemsPerPage;
    
        if (remainder !== 0) {
          if (remainder === 3) {
            updatedData = [...updatedData];
          } else if (remainder > 3) {
            const emptySlots = itemsPerPage - remainder;
            updatedData = [...updatedData, ...Array(emptySlots).fill(null)];
          } else {
            const emptySlots = itemsPerPage - remainder - 3;
            updatedData = [...updatedData, ...Array(emptySlots).fill(null)];
          }
        }
      }
    
      setCurrentCards(updatedData);
    }, [analystBoard, itemsPerPage]); 

    if ( analystInfoIsLoading || analystBoardIsLoading) {
      return <p>Loading...</p>;
    }

    if ( analystInfoError || analystBoardError) {
      return <p>Error</p>;
    }

    const handleClickRepresentWrite = () => {
      setIsModal(true);
    }

    const handleClickClose = () => {
      setIsModal(false);
    }

    const handleClickCentent = (id: number) => {
      setAnalystBoardId(id);
      setIsConfirmModal(true); 
    };

    const handleClickConfirm = async () => {
      if (analystBoardId !== -1) {
        await patchRepresentWrite(analystBoardId);
        await refetchAnalystBoard();
        setIsConfirmModal(false);
      } else {
        console.error("Invalid analystBoardId");
      }
    };

    return (
      <div className="w-full">
        <div className="flex h-[3rem] justify-between w-full border-b-black border-b-[0.0625rem]">
          <span className="text-[2rem]">작성글보기</span>
          {userNickName === nickname && <span className="h-full flex items-end cursor-pointer" onClick={handleClickRepresentWrite}>대표글 설정</span>}
          {isModal && <RepresentModal onCloseClick={handleClickClose} onContentClick={handleClickCentent} />}
          {isConfirmModal && <RepresentModal size="small" onConfirmClick={handleClickConfirm} />}
        </div>
        <div className="mx-[4rem]"></div>
        <div>
          <div className="flex justify-center items-center gap-[4rem] flex-wrap my-[3rem]">
          {currentCards && currentCards.length > 0 
          ? currentCards.map((item, index) => 
            item ? (
              <CommunityCard
                key={item.analystBoardId || index}
                id={item.analystBoardId}
                imagePath={item.companyImagePath}
                nickname={item.userNickName}
                stock={item.stockName}
                title={item.title}
                writer={item.userName}
                writeTime={new Date(item.createAt).toLocaleDateString()}
                represent={item.mainContent}
              />
            ) : (
              <div key={index} className="invisible w-[17rem] h-[16rem]"></div> // null인 경우 비어있는 div로 공간 채우기
            )
          ) 
          : <span className="mt-[10rem] text-[1.5rem]">등록된 글이 없습니다.</span>
        }
          </div>
        </div>
        <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            totalItems={analystBoard?.totalElements || 0}
          />
      </div>
    );
  };

  export default Report;
