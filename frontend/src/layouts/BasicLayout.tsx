import React from "react";
import Header from "../components/common/Header";

interface Props {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: Props) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
};

export default BasicLayout;
