"use client";
import { Transition, TransitionStatus } from "react-transition-group";
import { useEffect, useRef } from "react";
//redux
import { useDispatch, useSelector } from "@store/hooks";
//app config
import { toastDuration } from "@configs/app";
//types
import { closeToast } from "@store/modules/global/toast";
import { cn } from "@lib/utils/style";
import useWindowDimensions from "@hooks/common/useWindowDimensions";
import Heading from "./typography/components/Heading";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import Paragraph from "./typography/components/Paragraph";
import { toastPositionTypes, toastTypes } from "@resources/types/toast";

const Toast = () => {
  const dispatch = useDispatch();
  const nodeRef = useRef<HTMLElement | null>(null);

  //router
  const { toastType, toastPosition, toastHeading, toastDescription, isPersist, showToast } =
    useSelector((state) => state.global.toast);

  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (showToast && windowWidth) {
      if (toastType !== toastTypes.error && !isPersist) {
        setTimeout(() => {
          dispatch(closeToast());
        }, toastDuration);
      }
    }
  }, [showToast, windowWidth]);
  return (
    <Transition nodeRef={nodeRef} in={showToast} mountOnEnter unmountOnExit timeout={500}>
      {(state: TransitionStatus) => (
        <div
          className={cn(
            `fixed translate-y-[100%] z-[10001] flex flex-col w-[95vw] sm:w-[400px] p-5 gap-[5px] rounded duration-500 border border-border-light-secondary`,
            {
              "bg-bkg-light": toastType === toastTypes.success,
              "bg-danger [&>:is(button,i,h3,p)]:text-content-light [&>button>i]:text-content-light":
                toastType === toastTypes.error,
              "bottom-6 left-2": toastPosition === toastPositionTypes.bottomLeft,
              "right-4": toastPosition === toastPositionTypes.topRight,
              "opacity-0 translate-y-[-16px]": ["entering", "exiting", "exited"].includes(state),
              "opacity-100 translate-y-[16px]": state === "entered",
            }
          )}
        >
          <button
            className="p-4 absolute top-0 right-0 cursor-pointer"
            onClick={() => dispatch(closeToast())}
          >
            <i className="ic-cross text-[16px] text-content-light-secondary" />
          </button>
          {toastHeading && <Heading variant={headingVariants.cardHeading}>{toastHeading}</Heading>}
          {toastDescription && (
            <Paragraph
              content={toastDescription}
              variant={paragraphVariants.regular}
              sx={"text-content-dark-secondary text-start max-w-[95%]"}
            />
          )}
        </div>
      )}
    </Transition>
  );
};

export default Toast;
