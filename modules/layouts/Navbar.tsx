import React from "react";
import { cn } from "@lib/utils/style";

const Navbar: React.FC = () => {
  return (
    <header
      className={cn(
        "fixed flex h-[70px] w-screen border-border-light border-b top-0 z-[1001] bg-bkg-light px-5 py-[10px]"
      )}
    ></header>
  );
};

export default Navbar;
