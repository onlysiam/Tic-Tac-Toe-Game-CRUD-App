"use client";

import DeleteProductPopup from "@modules/popups/DeleteProductPopup";
import React from "react";
import GameResultPopup from "./GameResultPopup";

const Popups: React.FC = () => {
  return (
    <>
      <DeleteProductPopup />
      <GameResultPopup />
    </>
  );
};

export default Popups;
