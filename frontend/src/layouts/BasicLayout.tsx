import React from "react";
import Header from "../components/common/Header";

interface Props {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: Props) => {
  return (
    <div className="w-[90vw] mx-auto">
      <header className="flex-col border-b border-b-[#B4B4B4] border-opacity-30 ">
        <Header />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default BasicLayout;
