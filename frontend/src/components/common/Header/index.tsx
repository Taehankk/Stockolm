import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <nav className="flex justify-between gap-[1.8rem] mt-8 mb-6 items-center">
      <ul className="flex gap-[1rem]">
        <li className="flex text-PrimaryRed font-bold text-xl items-center">
          <Link to={"/"}>STOCKOLM</Link>
        </li>
      </ul>
      <ul className="flex gap-[1.2rem]">
        <li className="flex text-xl items-center">
          <Link to={"/ranking"}>분석가</Link>
        </li>
        <li className="flex text-xl items-center">
          <Link to={"/community/"}>커뮤니티</Link>
        </li>
      </ul>
      <SearchBar />
      {isLogin ? (
        <div className="relative">
          <FontAwesomeIcon
            icon={faBars}
            onClick={handleMenuOpen}
            className="text-2xl text-center"
          />
          {isMenuOpen && (
            <div className="absolute flex flex-col gap-2 justify-center top-[100%] right-0 mt-2 border border-black rounded-lg w-[8rem] h-[6rem] bg-white">
              <Link to="/mypage" className="ml-1 p-1 cursor-pointer z-10">
                마이페이지
              </Link>
              <div
                onClick={handleLogout}
                className="ml-1 p-1 cursor-pointer z-10"
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      ) : (
        <ul className="flex gap-[1rem] justify-end">
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
      )}
    </nav>
  );
};

export default Header;
