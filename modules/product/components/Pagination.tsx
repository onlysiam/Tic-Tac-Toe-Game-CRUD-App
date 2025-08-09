import React from "react";
import { cn } from "@lib/utils/style";
import Paragraph from "@modules/common/typography/components/Paragraph";
import { paragraphVariants } from "@resources/types/variants";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  isDisabled?: boolean;
  totalPage: number;
  maxButtons?: number;
  sx?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  isDisabled = false,
  maxButtons = 5,
  totalPage,
  sx,
}) => {
  const pages = getPageRangeNoTotal(page, maxButtons);

  return (
    <div className={cn("flex items-center justify-between", sx)}>
      <button
        className={cn("flex items-center gap-2 py-[.6rem] cursor-pointer", {
          "cursor-default opacity-30": page <= 1 || isDisabled,
        })}
        onClick={() => page > 1 && !isDisabled && setPage(page - 1)}
        aria-disabled={page <= 1}
      >
        <i
          className={cn("ic-arrow-left-thin text-[10px] text-content-dark-secondary", {
            "opacity-30": page <= 1 || isDisabled,
          })}
        />
        <Paragraph content="Prev" variant={paragraphVariants.regular} />
      </button>

      <div className="flex w-fit items-center gap-1">
        {pages.map((p) => (
          <div
            key={p}
            className={cn(
              `rounded-sm flex items-center justify-center text-xs text-content-dark-secondary lg:text-sm duration-150`,
              {
                "border-b border-border-light-secondary bg-bkg-dark-800 text-content-dark bg-bkg-light":
                  page === p,
                "hover:bg-bkg-light/80": !isDisabled && (page < totalPage || p < page),
                "cursor-default": isDisabled || (page === totalPage && p > page),
              }
            )}
          >
            <button
              key={p}
              className={cn("h-8 w-8", {
                "cursor-pointer": !isDisabled && (page < totalPage || p < page),
              })}
              disabled={isDisabled || (page === totalPage && p > page)}
              onClick={() => {
                if (p !== page) {
                  setPage(p);
                }
              }}
            >
              {p}
            </button>
          </div>
        ))}
      </div>

      <button
        className={cn("flex items-center gap-2 py-[.6rem] cursor-pointer", {
          "cursor-default": isDisabled || page === totalPage,
        })}
        onClick={() => !isDisabled && page < totalPage && setPage(page + 1)}
      >
        <Paragraph
          content="Next"
          variant={paragraphVariants.meta}
          sx={cn({ "opacity-30": isDisabled || page === totalPage })}
        />
        <i
          className={cn("ic-arrow-right-thin text-[10px] text-content-dark-secondary", {
            "opacity-30": isDisabled || page === totalPage,
          })}
        />
      </button>
    </div>
  );
};

const getPageRangeNoTotal = (current: number, maxButtons = 5): number[] => {
  const clamped = Math.max(1, Math.floor(current));
  const buttons = Math.max(1, maxButtons);

  let start = 1;
  if (clamped > 4) {
    start = clamped - 3;
  }

  return Array.from({ length: buttons }, (_, i) => start + i);
};

export default Pagination;
