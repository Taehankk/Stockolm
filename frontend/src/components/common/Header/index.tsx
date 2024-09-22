import React from "react";
import Input from "../../elements/Input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between gap-[2rem] mt-8 mb-6">
      <ul className="flex gap-[1rem]">
        <li className="text-PrimaryRed font-bold text-xl">
          <Link to={"/"}>STOCKOLM</Link>
        </li>
      </ul>
      <ul className="flex gap-[1rem]">
        <li className="text-xl">
          <Link to={"/ranking"}>분석가</Link>
        </li>
        <li className=" text-xl">
          <Link to={"/community/"}>커뮤니티</Link>
        </li>
      </ul>
      <Input placeholder="종목명입력"></Input>
      <ul className="flex gap-[1rem]">
        <li className="text-xl">
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
        <li className="text-xl">
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
