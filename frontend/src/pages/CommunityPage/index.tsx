import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  return (
    <BasicLayout>
    <div className="flex mt-[2rem] h-[100vh]">
      <div className="w-[15rem] mr-[2rem] pr-[3rem] border-b-black border-r">
        
        <div className="flex flex-col items-center gap-[1.5rem] mx-auto w-[10rem] mt-[5rem] border-[#B4B4B4] border-y-[1px] py-[1.3rem] text-[1.25rem]">
          <div>
            <Link to={"report"} className="cursor-pointer">
              주식분석게시판
            </Link>
          </div>
          <div>
            <Link to={"board"} className="cursor-pointer">
              자유게시판
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  </BasicLayout>
  );
};

export default CommunityPage;
