import React from "react";
import { Metadata } from "next";
import Popups from "@modules/popups";
import Providers from "@lib/utils/providers";

export const metadata: Metadata = {
  title: "Tic Tac Toe Game",
};
export default function TicTacToeGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Popups />
      {children}
    </Providers>
  );
}
