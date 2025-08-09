import React from "react";
import { Metadata } from "next";
import Providers from "@lib/utils/providers";
import Popups from "@modules/popups";
import Toast from "@modules/common/Toast";
import ReturnButton from "@modules/common/ReturnButton";

export const metadata: Metadata = {
  title: "Manage Products",
};
export default function ManageProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Popups />
      <Toast />
      {children}
    </Providers>
  );
}
