import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between gap-[2rem] mt-8 mb-6">
      <ul className="flex gap-[1rem]">
        <li className="flex text-PrimaryRed font-bold text-xl items-center">
          <Link to={"/"}>STOCKOLM</Link>
        </li>
      </ul>
      <ul className="flex gap-[1rem]">
        <li className="flex text-xl items-center">
          <Link to={"/ranking"}>분석가</Link>
        </li>
        <li className="flex text-xl items-center">
          <Link to={"/community/"}>커뮤니티</Link>
        </li>
      </ul>
      <SearchBar />
      <ul className="flex gap-[1rem]">
        <li className="flex text-xl items-center">
          <Link
            to={{
              pathname: "/auth",
            }}
            state={{
              imgLocation: 0,
            }}
          >
            로그인
          </Link>
        </li>
        <li className="flex text-xl items-center">
          <Link
            to={{
              pathname: "/auth",
            }}
            state={{
              imgLocation: 1,
            }}
          >
            회원가입
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
