import type { Metadata } from "next";
import "@styles/global.css";
import ReduxStoreProvider from "@lib/utils/providers/reduxStore";
import DefaultLayout from "@modules/layouts/Default";
import Navbar from "@modules/layouts/Navbar";

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
        <ReduxStoreProvider>
          <Navbar />
          <main className="min-h-screen bg-bkg-light-secondary">
            <DefaultLayout>{children}</DefaultLayout>
          </main>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
