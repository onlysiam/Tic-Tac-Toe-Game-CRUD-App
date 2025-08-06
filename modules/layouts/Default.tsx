import React, { ReactNode } from "react";
import Popups from "@modules/popups";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Popups />
      {children}
    </>
  );
};

export default DefaultLayout;
