import { Link } from "react-router-dom";

import Input from "../../../components/elements/Input";

import Samsung from "../../../assets/samsung.jpg";

const Report = () => {
  const nickname = "nickname";
  const id = "10";
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
          <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
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
          </Link>
          <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
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
          </Link>
          <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
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
          </Link>
          <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
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
          </Link>
          <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
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
          </Link>
          <Link to={`/analyst/${nickname}/report/${id}`} className="m-5">
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
          </Link>
        </div>
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
