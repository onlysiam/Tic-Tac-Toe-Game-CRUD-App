"use client";

import ReturnButton from "@modules/common/ReturnButton";
import SkeletonWrapper from "@modules/common/SkeletonWrapper";

const ProductClientPageLoadingSkeleton = () => {
  return (
    <section className="flex flex-col w-full max-w-[95vw] sm:max-w-[1000px] mx-auto mt-[50px] gap-5">
      <ReturnButton />

      <div className="flex sm:flex-row flex-col gap-[30px] px-5 bg-bkg-light rounded p-5 h-max">
        <div className="flex flex-col-reverse sm:flex-col gap-5">
          <div className="h-[300px] shrink-0 w-full sm:w-[300px] rounded-sm bg-bkg-dark-secondary/20" />

          <div className="gap-[10px] flex flex-wrap sm:grid grid-cols-3">
            <SkeletonWrapper renderTimes={3}>
              <div className="h-[100px] w-auto rounded-sm bg-bkg-dark-secondary/20" />
            </SkeletonWrapper>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] w-full">
          <div className="h-[16px] w-[36px] rounded-sm ml-auto bg-bkg-dark-secondary/20" />
          <div className="h-8 w-[80%] rounded-sm bg-bkg-dark-secondary/20" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 rounded-sm w-full bg-bkg-dark-secondary/20" />
            <div className="h-4 rounded-sm w-full bg-bkg-dark-secondary/20" />
            <div className="h-4 rounded-sm w-full bg-bkg-dark-secondary/20" />
            <div className="h-4 rounded-sm w-[40%] bg-bkg-dark-secondary/20" />
          </div>
          <div className="h-8 rounded-sm w-[60px] bg-bkg-dark-secondary/20" />

          <div className="flex flex-col gap-[5px]">
            <div className="h-4 w-[200px] bg-bkg-dark-secondary/20" />
            <div className="h-4 w-[200px] bg-bkg-dark-secondary/20" />
          </div>
          <div className="flex gap-[10px] items-center">
            <div className="h-[100px] w-[100px] rounded-sm bg-bkg-dark-secondary/20" />
            <div className="h-4 w-[200px] bg-bkg-dark-secondary/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductClientPageLoadingSkeleton;
