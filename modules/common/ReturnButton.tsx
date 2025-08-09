"use client";

import { useRouter } from "next/navigation";
import Paragraph from "./typography/components/Paragraph";

const ReturnButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex gap-2 items-center w-max cursor-pointer duration-150 rounded hover:bg-bkg-light hover:px-2 py-2"
      onClick={() => router.back()}
    >
      <div className="h-6 w-6 rounded-full bg-bkg-light flex items-center justify-center">
        <i className="ic-arrow-left text-[16px] text-content-dark" />
      </div>
      <Paragraph content={"Return"} />
    </button>
  );
};

export default ReturnButton;
