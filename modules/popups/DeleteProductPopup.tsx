import { usePopup } from "@contexts/UsePopup";
import Modal from "@modules/modal/modal";
import Paragraph from "../common/typography/components/Paragraph";
import { paragraphVariants } from "@resources/types/variants";
import ActionButton from "../common/ActionButton";

const DeleteProductPopup = () => {
  const { deleteProductPopupObj } = usePopup();

  const { popupAction } = deleteProductPopupObj.action;
  return (
    <Modal open={deleteProductPopupObj.show} onClose={deleteProductPopupObj.close}>
      <div className="bg-bkg-light border border-border-light rounded-[10px] p-5 lg:p-10 mx-[10px] w-full max-w-[610px]">
        <div className="p-2 lg:p-5 rounded-[10px] bg-danger/10 w-fit flex items-center justify-center mb-5">
          <i className="ic-trash text-base lg:text-2xl text-danger" />
        </div>
        <Paragraph
          variant={paragraphVariants.title}
          content={"Are you sure you want to delete this product?"}
          sx={"text-start text-content-dark font-coolvetica mb-[10px] font-semibold"}
        />
        <Paragraph
          variant={paragraphVariants.regular}
          content={
            "This product will be permanently deleted along with all the contents within. All data associated with this product will also be deleted."
          }
          sx={"text-start text-content-dark-secondary"}
        />

        <div className="flex items-center gap-5 border-t border-border-light pt-5 mt-5">
          <ActionButton label={"Cancel"} onClick={deleteProductPopupObj.close} />
          <ActionButton
            label={"Delete"}
            onClick={() => {
              popupAction && popupAction();
              deleteProductPopupObj.close();
            }}
            sx={"bg-danger [&>p]:text-content-light"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductPopup;
