import React, { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/hooks";
import { cn } from "@lib/utils/style";
import Image from "@modules/common/Image";
import { Product } from "@resources/types/product";
import Heading from "@modules/common/typography/components/Heading";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import Paragraph from "@modules/common/typography/components/Paragraph";
import TransitionWrapper from "@modules/common/TransitionWrapper";
import useComponentVisible from "@hooks/common/useComponentVisible";
import { useRouter } from "next/navigation";
import { deleteProduct, setCurrentProduct } from "@store/modules/product";
import Link from "next/link";
import { pagePaths } from "@resources/paths";
import Modal from "@modules/modal/modal";
import { usePopup } from "@contexts/UsePopup";

const ProductCard = ({ product }: { product: Product }) => {
  const { deleteProductPopupObj } = usePopup();
  const router = useRouter();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!products.updating && updating) {
      setUpdating(false);
    }
  }, [products]);

  const onProductEditHandler = (product: Product) => {
    dispatch(setCurrentProduct(product));
    router.push(`${pagePaths.editProduct}`);
  };

  const onProductDeleteHandler = () => {
    deleteProductPopupObj.open({
      popupAction: () => {
        setUpdating(true);
        dispatch(deleteProduct(product.id));
      },
    });
  };
  return (
    <Link
      href={`${pagePaths.manageProducts}/${product.slug}`}
      className={cn(
        "relative p-4 border border-border-light/30 bg-bkg-light rounded flex sm:flex-row flex-col items-start gap-[10px] lg:gap-5 cursor-pointer",
        {
          "card-loading pointer-events-none": updating,
        }
      )}
    >
      <Image
        className="shrink-0 h-[150px] w-full sm:w-[200px] rounded-[10px] object-cover"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="flex flex-col gap-[10px] py-2 w-full">
        <Heading variant={headingVariants.cardHeading} sx="font-semibold">
          <i className="ic-taka text-[20px]" />
          {product.price}
        </Heading>
        <Heading
          variant={headingVariants.cardHeading}
          sx="text-content-dark font-semibold line-clamp-1"
        >
          {product.title}
        </Heading>
        <div className="flex flex-col gap-[5px]">
          <Paragraph content={product.description} sx="text-content-light-secondary line-clamp-2" />
          <Paragraph
            content={product?.category?.name}
            sx="text-content-light-secondary font-semibold line-clamp-1"
          />
        </div>
      </div>
      <DropdownMenu
        product={product}
        onEdit={onProductEditHandler}
        onDelete={onProductDeleteHandler}
      />
    </Link>
  );
};

interface DropDownProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onItemClick?: () => void;
  onOpen?: (state: boolean) => void;
}

const DropdownMenu = ({ product, onEdit, onDelete, onOpen }: DropDownProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    if (onOpen) onOpen(isComponentVisible);
  }, [isComponentVisible]);
  return (
    <>
      <button
        className="absolute top-2 right-2 group bg-bkg-light sm:bg-transparent border-border-light-secondary hover:border-border-light-secondary border h-[25px] w-[25px] rounded-[5px] flex items-center justify-center sm:border-transparent duration-150 cursor-pointer"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsComponentVisible(!isComponentVisible);
        }}
      >
        <i className="ic-options text-[20px] text-content-dark-secondary group-hover:text-content-dark" />
      </button>
      <TransitionWrapper
        isOpen={isComponentVisible}
        sx={"absolute right-0 top-[35px] w-[200px] left-auto hidden sm:flex"}
      >
        <CardOptionItems
          product={product}
          onItemClick={() => setIsComponentVisible(!isComponentVisible)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TransitionWrapper>
      <div className="flex sm:hidden">
        <Modal open={isComponentVisible} onClose={() => setIsComponentVisible(false)}>
          <CardOptionItems
            product={product}
            onItemClick={() => setIsComponentVisible(!isComponentVisible)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Modal>
      </div>
    </>
  );
};

const CardOptionItems = ({ product, onEdit, onDelete, onItemClick }: DropDownProps) => {
  const items = [
    {
      label: "Edit",
      icon: "edit",
      action: () => {
        onEdit(product);
      },
    },
    {
      label: "Delete",
      icon: "trash",
      action: () => {
        onDelete(product);
      },
      style: "text-danger",
    },
  ];
  return (
    <ul className="bg-bkg-light border border-border-light-secondary flex flex-col rounded-[10px] overflow-hidden relative z-[10000] ">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <li
            key={index}
            className={cn(
              "flex items-center gap-[10px] hover:bg-dark-800 px-5 py-4 cursor-pointer last:[&>i]:!text-danger last:[&>p]:!text-danger whitespace-nowrap duration-150 group hover:bg-gray-700/10",
              item?.style
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              item?.action();
              onItemClick && onItemClick();
            }}
          >
            <i
              className={`ic-${item.icon} text-content-dark-secondary text-[18px] group-hover:text-content-light-secondary duration-150`}
            />
            <Paragraph
              variant={paragraphVariants.regular}
              content={item?.label}
              sx={"text-content-dark"}
            />
          </li>
          {index < 1 && <div className="w-full border-t border-border-light" />}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ProductCard;
