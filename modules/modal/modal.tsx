"use client";

import { Transition } from "react-transition-group";
import React, { useEffect, useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@lib/utils/style";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "close-modal" && onClose) {
      onClose();
    }
  };

  return (
    <Transition in={open} mountOnEnter unmountOnExit timeout={1} nodeRef={nodeRef}>
      {(state: string) => (
        <div
          ref={nodeRef}
          className={cn(
            `fixed top-0 left-0 z-[10000] h-screen w-screen bg-bkg-dark/10 transition-all backdrop-blur-[5px] backdrop-brightness-[100%]`,
            {
              "opacity-0": ["entering", "exiting", "exited"].includes(state),
              "opacity-100": state === "entered",
            }
          )}
          onClick={closeModal}
        >
          <div id="close-modal" className="flex justify-center items-center w-screen h-full">
            {children}
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Modal;
