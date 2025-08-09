import { ReactNode } from "react";
import useWindowDimensions from "@hooks/common/useWindowDimensions";
import Paragraph from "./typography/components/Paragraph";
import { paragraphVariants } from "@resources/types/variants";
import TransitionWrapper from "./TransitionWrapper";
import Modal from "@modules/modal/modal";
import { cn } from "@lib/utils/style";
import useComponentVisible from "@hooks/common/useComponentVisible";

interface SelectBoxBtnProps {
  isComponentVisible: boolean;
  setIsComponentVisible: (state: boolean) => void;
  selectedOptionName: string;
  disabled?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  sx?: string;
}

const SelectBoxBtn: React.FC<SelectBoxBtnProps> = ({
  isComponentVisible,
  setIsComponentVisible,
  selectedOptionName,
  disabled = false,
  children,
  isLoading = false,
  sx,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <div className={cn("relative w-full", sx)}>
      <button
        type="button"
        onClick={() => {
          if (!disabled) setIsComponentVisible(!isComponentVisible);
        }}
        className={`relative flex w-full items-center rounded-lg border border-border-light px-5 py-[10px] h-[46px] overflow-hidden ${
          disabled
            ? "cursor-default text-content-dark-secondary"
            : "hover:text-content-dark-secondary cursor-pointer"
        }`}
      >
        <div className="flex w-full items-center">
          {isLoading ? (
            <div className="skeleton-loading mr-2 h-4 w-full rounded bg-dark-pure/40" />
          ) : (
            <Paragraph
              content={selectedOptionName}
              variant={paragraphVariants.regular}
              sx="text-content-dark text-start truncate"
            />
          )}
        </div>
        <i
          className={`ic-arrow-${
            isComponentVisible ? "up" : "down"
          }-thin text-[15px] text-content-dark-secondary cursor-pointer`}
        />
      </button>

      {windowWidth! < 641 && (
        <section className="flex sm:hidden">
          <Modal open={isComponentVisible} onClose={() => setIsComponentVisible(false)}>
            {children}
          </Modal>
        </section>
      )}

      <section className="hidden sm:flex">
        <TransitionWrapper isOpen={isComponentVisible}>{children}</TransitionWrapper>
      </section>
    </div>
  );
};

export default SelectBoxBtn;
