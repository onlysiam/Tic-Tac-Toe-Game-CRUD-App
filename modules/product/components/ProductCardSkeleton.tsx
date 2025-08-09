const ProductCardSkeleton = () => {
  return (
    <div className="relative p-4 border border-border-light/30 bg-bkg-light rounded flex sm:flex-row flex-col items-start gap-[10px] lg:gap-5 cursor-pointer">
      <div className="skeleton-loading flex shrink-0 h-[150px] w-full sm:w-[200px] rounded-[10px] bg-bkg-dark-secondary/20" />
      <div className="flex flex-col gap-[10px] py-2 w-full">
        <div className="skeleton-loading h-5 w-[20%] rounded-sm bg-bkg-dark-secondary/20" />
        <div className="skeleton-loading h-5 w-[80%] rounded-sm bg-bkg-dark-secondary/20" />
        <div className="flex flex-col gap-[5px]">
          <div className="skeleton-loading h-5 w-full rounded-sm bg-bkg-dark-secondary/20" />
          <div className="skeleton-loading h-5 w-[80%] rounded-sm bg-bkg-dark-secondary/20" />
          <div className="skeleton-loading h-5 w-[30%] rounded-sm bg-bkg-dark-secondary/20" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
