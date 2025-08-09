"use client";
import React from "react";
import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import { pagePaths } from "@resources/paths";
import { usePathname } from "next/navigation";
import { buttonTypes } from "@resources/types/button";

const Navbar: React.FC = () => {
  const currentPath = usePathname();

  return (
    <header
      className={cn(
        "fixed flex h-[70px] w-screen border-border-light border-b top-0 z-[1001] bg-bkg-light px-5 py-[10px]"
      )}
    >
      <div className="flex gap-[10px] max-w-[400px] mx-auto">
        <ActionButton
          icon="tic-tac-toe"
          buttonType={
            currentPath.startsWith(pagePaths.ticTacToeGame) ? buttonTypes.dark : buttonTypes.light
          }
          label="Assignment-1"
          href={pagePaths.ticTacToeGame}
        />
        <ActionButton
          icon="product-management"
          buttonType={
            currentPath.startsWith(pagePaths.manageProducts) ? buttonTypes.dark : buttonTypes.light
          }
          label="Assignment-2"
          href={pagePaths.manageProducts}
        />
      </div>
    </header>
  );
};

export default Navbar;
