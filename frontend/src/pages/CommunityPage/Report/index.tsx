import { Link } from "react-router-dom";

import Input from "../../../components/elements/Input";
import CommunityCard from "../../../components/common/CommunityCard";

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
  createAt: string;
}

const Report = () => {
  const token = sessionStorage.getItem("access_token");

  const [reportList, setReportList] = useState<Report[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(10);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 6;

  const [sort, setSort] = useState("latest");
  const [searchWord, setSearchWord] = useState("");

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(value);
  };

  const getReportList = async () => {
    if (token) {
      const res = await axiosTokenInstance.get("/analyst-board", {
        params: {
          page: currentPage,
          size: itemsPerPage,
          sort: sort,
          searchWord: searchWord,
        },
      });
      console.log(res.data);
      setTotalItems(res.data.totalElements);
      setReportList(res.data.content);
    } else {
      const res = await axiosInstance.get("/analyst-board", {
        params: {
          page: currentPage,
          size: itemsPerPage,
          sort: "latest",
          searchWord: "",
        },
      });
      console.log(res.data);
      setTotalItems(res.data.totalElements);
      setReportList(res.data.content);
    }
  };

  useEffect(() => {
    getReportList();
    console.log(reportList);
  }, [currentPage, sort]);

  return (
    <>
      <div className="">
        <span>종목분석게시판</span>
        <div className="flex justify-between items-center">
          <div className="text-[0.7rem]">
            <span
              key="latest"
              onClick={() => handleSort("latest")}
              className={`cursor-pointer mr-1 ${sort === "latest" ? "" : "opacity-50"}`}
            >
              최신순
            </span>
            <span
              key="view"
              onClick={() => handleSort("view")}
              className={`cursor-pointer mr-1 ${sort === "view" ? "" : "opacity-50"}`}
            >
              조회순
            </span>
            <span
              key="like"
              onClick={() => handleSort("like")}
              className={`cursor-pointer ${sort === "like" ? "" : "opacity-50"}`}
            >
              인기순
            </span>
          </div>
          <Input
            value={searchWord}
            onChange={handleSearchValue}
            size="medium"
            className="h-[1.2rem]"
          />
        </div>
        <hr />
        <div className="grid grid-cols-3">
          {/* <div className="flex justify-center items-center gap-[4rem] flex-wrap mt-[3rem]"> */}
          {reportList[0] ? (
            reportList.map((report, index) => (
              <CommunityCard
                id={index}
                stock={report.stockName}
                title={report.title}
                key={index}
                writer={report.userName}
                writeTime={report.createAt}
                represent={false}
              />
            ))
          ) : (
            <span className="mt-[10rem] text-[1.5rem]">
              등록된 글이 없습니다.
            </span>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
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
