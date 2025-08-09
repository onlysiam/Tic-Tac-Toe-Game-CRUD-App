import React from "react";
import { Metadata } from "next";
import ReduxStoreProvider from "@lib/utils/providers/reduxStore";

export const metadata: Metadata = {
  title: "Tic Tac Toe Game",
};
export default function TicTacToeGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReduxStoreProvider>{children}</ReduxStoreProvider>;
}
