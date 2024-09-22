import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";

const Analyst = () => {
  return (
    <BasicLayout>
      <div className="flex">
        <div className="mr-10">
          <h1>Analyst Page</h1>
          <div>
            <Link to={"statistic"}>통계보기</Link>
          </div>
          <div>
            <Link to={"report"}>작성글보기</Link>
          </div>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Analyst;
