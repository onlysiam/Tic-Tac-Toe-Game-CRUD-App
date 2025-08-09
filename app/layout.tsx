import type { Metadata } from "next";
import "@styles/globals.css";
import "@public/iconfonts/style.css";
import DefaultLayout from "@modules/layouts/Default";
import Navbar from "@modules/layouts/Navbar";
import Sidebar from "@modules/product/components/SideBar";

export const metadata: Metadata = {
  title: "React Developer Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex min-h-screen bg-bkg-light-secondary overflow-hidden pt-[70px]">
          <DefaultLayout>{children}</DefaultLayout>
        </main>
      </body>
    </html>
  );
}
