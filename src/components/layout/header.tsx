import React from "react";
import MainHeader from "./main-navigation";
interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <MainHeader />
      {props.children}
    </>
  );
};

export default Layout;