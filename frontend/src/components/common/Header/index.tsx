import React from "react";
import Input from "../../elements/Input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul className="flex w-full mt-10 mb-10 justify-center ">
        <li className="text-PrimaryRed mr-10 font-bold text-xl">
          <Link to={"/"}>STOCKALM</Link>
        </li>
        <li className="mr-5 text-xl">
          <Link to={"/ranking"}>분석가</Link>
        </li>
        <li className="mr-5 text-xl">
          <Link to={"/community/"}>커뮤니티</Link>
        </li>
        <Input className="mr-20" placeholder="종목명입력"></Input>
        <li className="ml-20 mr-5 text-xl">
          <Link to={"/auth"}>로그인</Link>
        </li>
        <li className="flex-1 text-xl">
          <Link to={"/auth"}>회원가입</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
