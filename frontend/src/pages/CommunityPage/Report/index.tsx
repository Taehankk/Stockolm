import { Link } from "react-router-dom";

import Input from "../../../components/elements/Input";
import CommunityCard from "../../../components/common/CommunityCard";

// import Samsung from "../../../assets/samsung.jpg";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Pagination from "../../../components/common/Pagination";
import axiosTokenInstance from "../../../api/axiosTokenInstance";

interface Report {
  analystBoardId: number;
  userName: string; // 애널리스트 실명
  userImagePath: string;
  roleType: string; // "SUBSCRIBER"일때만 전부 보여주기
  isLike: boolean;
  title: string;
  stockName: string;
  createTime: string;
}

const Report = () => {
  const token = sessionStorage.getItem("access_token");

  // const [reportList, setReportList] = useState<Report[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const cards = [
    { id: 1, represent: true },
    { id: 2, represent: false },
    { id: 3, represent: false },
    { id: 4, represent: false },
    { id: 5, represent: false },
    { id: 6, represent: false },
  ];

  const getReportList = async () => {
    if (token) {
      const res = await axiosTokenInstance.get("/analyst-board", {
        params: {
          page: 0,
          size: 3,
          category: "",
          sortBy: "",
          stockName: "",
          searchWord: "",
        },
      });
      console.log(res.data);
    } else {
      const res = await axiosInstance.get("/analyst-board", {
        params: {
          page: 0,
          size: 3,
          category: "",
          sortBy: "",
          stockName: "",
          searchWord: "",
        },
      });
      console.log(res.data);
    }
  };

  useEffect(() => {
    getReportList();
    setItemsPerPage(6);
  }, []);

  return (
    <>
      <div className="">
        <span>종목분석게시판</span>
        <div className="flex justify-between items-center">
          <div className="text-[0.7rem] opacity-50">
            <span className="mr-1">최신순</span>
            <span className="mr-1">조회순</span>
            <span>인기순</span>
          </div>
          <Input size="medium" className="h-[1.2rem]" />
        </div>
        <hr />
        <div className="grid grid-cols-3">
          {/* <div className="flex justify-center items-center gap-[4rem] flex-wrap mt-[3rem]"> */}
          {cards[0] ? (
            cards.map((card) => (
              <CommunityCard
                id={1}
                stock=""
                title=""
                key={card.id}
                writer=""
                writeTime=""
                represent={card.represent}
              />
            ))
          ) : (
            <span className="mt-[10rem] text-[1.5rem]">
              등록된 글이 없습니다.
            </span>
          )}
          {/* </div>   */}
          {/* <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
            <div className="w-48 h-40 shadow-sm shadow-gray-400 rounded-lg">
              <img
                src={Samsung}
                alt="로고 사진"
                className="rounded-t-lg object-cover w-full h-[60%]"
              />
              <hr />
              <div className="h-[40%] flex flex-col justify-center ml-4">
                <div className="bg-[#51E8B3] rounded-lg text-center w-14 text-[0.6rem]">
                  삼성전자
                </div>
                <div className="text-[0.8rem]">9월 월간 분석</div>
                <div className="flex justify-end mr-2 text-[0.5rem] opacity-50">
                  <span className="mr-2">장원영</span>
                  <span>20분 전</span>
                </div>
              </div>
            </div>
          </Link> */}
        </div>

        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="flex justify-end">
        <Link
          to={"/community/report/write"}
          className="w-16 h-6 text-center content-center text-xs border border-black rounded-md"
        >
          글쓰기
        </Link>
      </div>
    </>
  );
};

export default Report;
