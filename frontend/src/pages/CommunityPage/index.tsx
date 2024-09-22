import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  return (
    <BasicLayout>
      <div className="flex">
        <div className="mr-10">
          <div>
            <Link to={"report"}>주식분석게시판</Link>
          </div>
          <div>
            <Link to={"board"}>자유게시판</Link>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default CommunityPage;
