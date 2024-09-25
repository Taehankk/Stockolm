import React from "react";
import Input from "../../elements/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../slices/stockSlice";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(inputValue));
  };

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
      <Input
        placeholder="종목명입력"
        value={inputValue}
        onChange={handleInputChange}
      ></Input>
      <button onClick={handleSearch}>검색</button>
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
