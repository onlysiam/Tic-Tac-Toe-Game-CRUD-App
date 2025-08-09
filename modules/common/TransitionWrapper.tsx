import { cn } from "@lib/utils/style";
import { useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

interface TransitionWrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
  timeout?: number;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  sx?: string | string[];
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  isOpen,
  children,
  timeout = 150,
  mountOnEnter = true,
  unmountOnExit = true,
  sx,
}) => {
  const nodeRef = useRef<HTMLElement | null>(null);

  return (
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={timeout}
    >
      {(state: TransitionStatus) => (
        <section
          ref={nodeRef}
          className={cn(
            "absolute left-0 z-[999] flex flex-col w-full gap-[5px] rounded duration-500 h-auto overflow-hidden",
            {
              "opacity-0": ["entering", "exiting", "exited", "unmounted"].includes(state),
              "opacity-100 translate-y-[10px]": state === "entered",
            },
            sx
          )}
        >
          {children}
        </section>
      )}
    </Transition>
  );
};

export default TransitionWrapper;
