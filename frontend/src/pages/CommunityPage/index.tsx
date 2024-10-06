import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  return (
    <BasicLayout>
      <div className="flex">
        <div className="mr-10 w-[20%] mt-36">
          <hr className="mb-4" />
          <div className="mb-2">
            <Link to={"report"}>주식분석게시판</Link>
          </div>
          <div>
            <Link to={"board"}>자유게시판</Link>
          </div>
          <hr className="mt-4" />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default CommunityPage;
