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
    setSearchWord(value);
  };

  const searchReport = () => {
    getReportList();
  };

  const getReportList = async () => {
    const res = await getReportListAPI(
      token,
      currentPage,
      itemsPerPage,
      sort,
      searchWord
    );

    setTotalItems(res.totalElements);
    setReportList(res.content);
  };

  useEffect(() => {
    getReportList();
  }, [currentPage, sort]);

  return (
    <div className="mt-10">
      <div>
        <span className="text-3xl">종목분석게시판</span>
        <div className="flex mt-4 mb-2 justify-between items-center">
          <Filter sort={sort} handleSort={handleSort} />
          <Search
            searchValue={searchWord}
            handleSearchValue={handleSearchValue}
            searchList={searchReport}
          />
        </div>
        <hr />
        {reportList[0] ? (
          <div className="grid grid-cols-3 mt-4 gap-y-4">
            {reportList.map((report, index) => (
              <CommunityCard
                id={index}
                stock={report.stockName}
                title={report.title}
                key={index}
                writer={report.userName}
                writeTime={report.createAt}
                represent={false}
              />
            ))}
          </div>
        ) : (
          <span className="mt-[10rem] text-[1.5rem]">
            등록된 글이 없습니다.
          </span>
        )}

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
            className="w-16 h-6 text-center content-center text-xs border border-black rounded-md"
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
