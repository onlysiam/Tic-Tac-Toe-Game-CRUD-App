//context
import { usePopup } from "@contexts/UsePopup";
//resources
import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import Heading from "@modules/common/typography/components/Heading";
import Paragraph from "@modules/common/typography/components/Paragraph";
import Modal from "@modules/modal/modal";
import { headingVariants, paragraphVariants } from "@resources/types/variants";

const MessagePopup = () => {
  //context
  const { messagePopupObj } = usePopup();
  const { popupData } = messagePopupObj.data;

  const { description, heading, primaryBtn, secondaryBtn, cta } = popupData;

  const closeMessagePopup = () => {
    messagePopupObj.close();
  };

  const actionBtnHandler = () => {};

  return (
    <Modal open={messagePopupObj.show} onClose={closeMessagePopup}>
      <section className="flex w-[90vw] flex-col rounded bg-bkg-light sm:h-auto sm:w-[30rem] lg:w-[40rem]">
        <header
          className={cn(
            "relative flex w-full items-center justify-center border-b border-border-light-secondary",
            heading ? "p-4" : "px-4 py-0"
          )}
        >
          {heading && (
            <Heading variant={headingVariants.title} sx="!font-bold">
              {heading}
            </Heading>
          )}
          <button
            onClick={() => closeMessagePopup()}
            className="absolute right-4 top-4 items-center justify-center text-sm text-content cursor-pointer"
          >
            <i className="gng-close"></i>
          </button>
        </header>

        <div className="flex h-full min-h-[10rem] w-full flex-col items-center justify-center gap-6 p-8">
          {description && <Paragraph content={description} variant={paragraphVariants.regular} />}

          {(secondaryBtn?.label || primaryBtn?.label || cta?.action) && (
            <section className="flex w-full items-center justify-center gap-4">
              {secondaryBtn?.label && (
                <ActionButton
                  label={secondaryBtn.label}
                  onClick={() => {
                    closeMessagePopup();
                  }}
                  sx={cn("w-max py-2", secondaryBtn.style)}
                />
              )}
              {primaryBtn?.label && (
                <ActionButton
                  label={primaryBtn.label}
                  onClick={actionBtnHandler}
                  sx={cn("w-max py-2", primaryBtn.style)}
                />
              )}
              {cta?.action && (
                <ActionButton
                  label={cta.label}
                  onClick={() => {
                    cta?.action();
                    closeMessagePopup();
                  }}
                  sx={cn("w-max py-2", cta?.style)}
                />
              )}
            </section>
          )}
        </div>
      </section>
    </Modal>
  );
};

export default MessagePopup;
