"use client";
import { ReactNode } from "react";
import ReduxStoreProvider from "./reduxStore";
import AppContextProvider from "./context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxStoreProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </ReduxStoreProvider>
  );
}
