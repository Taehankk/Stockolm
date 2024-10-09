import { useNavigate } from "react-router-dom";

import CommunityCard from "../../../components/common/CommunityCard";

import { useEffect, useState } from "react";
import Pagination from "../../../components/common/Pagination";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { setCurrentPage } from "../../../slices/reportSlice";
import { getReportListAPI } from "../../../api/communityAPI";
import Filter from "../../../components/community/report/Filter";
import Search from "../../../components/community/common/Search";
import { validateSearchInputLength } from "../../../utils/validation";

interface Report {
  analystBoardId: number;
  companyImagePath: string;
  createAt: string;
  filePath: string;
  like: boolean;
  likeCnt: number;
  mainContent: boolean;
  stockName: string;
  title: string;
  updateAt: string;
  userImagePath: string;
  userName: string; // 애널리스트 실명
  userNickName: string; // 애널리스트 닉네임
  viewCnt: number;
}

const Report = () => {
  const token = sessionStorage.getItem("access_token");
  const ROLE = sessionStorage.getItem("role");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [reportList, setReportList] = useState<Report[]>([]);

  const currentPage = useSelector(
    (state: RootState) => state.report.currentPage
  );
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const itemsPerPage = 6;

  const [sort, setSort] = useState("latest");
  const [searchWord, setSearchWord] = useState("");

  const toReportWrite = () => {
    if (token) {
      navigate("/community/report/write");
    } else {
      alert("로그인 후 이용가능합니다.");
    }
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(validateSearchInputLength(value));
  };

  const searchReport = () => {
    getReportList();
    dispatch(setCurrentPage(1));
  };

  const getReportList = async () => {
    const res = await getReportListAPI(
      token,
      currentPage,
      itemsPerPage,
      sort,
      searchWord
    );

    console.log(res.content);

    setTotalItems(res.totalElements);
    setReportList(res.content);
  };

  useEffect(() => {
    getReportList();
  }, [currentPage]);

  useEffect(() => {
    if (searchWord === "") {
      getReportList(); 
    }
  }, [searchWord]);

  useEffect(() => {
    getReportList();
    dispatch(setCurrentPage(1));
  }, [sort]);

  const handleClickInitSearch = async () => {
    setSearchWord("");
    dispatch(setCurrentPage(1));
  }

  return (
    <div className="w-[100%] mt-10">
      <div>
        <div className="h-[2rem] flex justify-between items-end">
          <span className="text-3xl">종목분석게시판</span>
          <span className="w-[8rem] h-[2rem] inline-flex justify-center items-center border-black border rounded-full cursor-pointer" onClick={handleClickInitSearch}>검색 초기화</span>
        </div>
        <div className="flex mt-4 mb-2 justify-between items-center">
          <Filter sort={sort} handleSort={handleSort} />
          <Search
            searchValue={searchWord}
            handleSearchValue={handleSearchValue}
            searchList={searchReport}
          />
        </div>
        <hr />
        <div className="">
          {reportList[0] ? (
            <div className="grid grid-cols-[repeat(3,minmax(0,600px))] justify-items-center inset-full my-[3rem] mx-auto gap-y-[3rem]">
              {reportList.map((report, index) => (
                <CommunityCard
                  id={report.analystBoardId}
                  imagePath={report.companyImagePath}
                  stock={report.stockName}
                  title={report.title}
                  key={index}
                  nickname={report.userNickName}
                  writer={report.userName}
                  writeTime={report.createAt.split("T")[0]}
                  represent={false}
                />
              ))}
            </div>
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

      {ROLE === "ANALYST" ? (
        <div className="flex justify-end">
          <div
            onClick={toReportWrite}
            className="w-16 h-8 mb-10 text-center content-center text-xs border border-black rounded-md"
          >
            글쓰기
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Report;
