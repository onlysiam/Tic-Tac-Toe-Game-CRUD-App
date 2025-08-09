"use client";

import ActionButton from "@modules/common/ActionButton";
import Image from "@modules/common/Image";
import ReturnButton from "@modules/common/ReturnButton";
import Heading from "@modules/common/typography/components/Heading";
import Paragraph from "@modules/common/typography/components/Paragraph";
import images from "@resources/images";
import { pagePaths } from "@resources/paths";
import { buttonTypes } from "@resources/types/button";
import { Product } from "@resources/types/product";
import { headingVariants } from "@resources/types/variants";
import { useDispatch } from "@store/hooks";
import { setCurrentProduct } from "@store/modules/product";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductProps {
  product: Product;
}
const ProductClientPage: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onProductEditHandler = (product: Product) => {
    dispatch(setCurrentProduct(product));
    router.push(pagePaths.editProduct);
  };
  return (
    <section className="flex flex-col w-full max-w-[95vw] sm:max-w-[1000px] mx-auto mt-[50px] gap-5">
      <ReturnButton />

      <div className="flex sm:flex-row flex-col gap-[30px] px-5 bg-bkg-light rounded p-5 h-max">
        <ProductImages images={product.images} />
        <div className="flex flex-col gap-[30px] w-full">
          <ActionButton
            buttonType={buttonTypes.text}
            label="Edit"
            icon="edit"
            onClick={() => onProductEditHandler(product)}
            sx="w-max ml-auto"
          />
          <Heading variant={headingVariants.heading} sx="font-semibold">
            {product.title}
          </Heading>
          <Paragraph content={product.description} sx="text-content-dark-secondary" />
          <Heading variant={headingVariants.titleLg} sx="font-semibold">
            <i className="ic-taka text-[30px]" />
            {product.price}
          </Heading>

          <div className="flex flex-col gap-[5px]">
            <div className="flex gap-[5px]">
              <Paragraph content={"Created at:"} sx="text-content-dark-secondary" />
              <Paragraph
                content={dayjs(product.creationAt).format("YYYY-MM-DD")}
                sx="text-content-dark-secondary"
              />
            </div>

            <div className="flex gap-[5px]">
              <Paragraph content={"Last updated:"} sx="text-content-dark-secondary" />
              <Paragraph
                content={dayjs(product.updatedAt).format("YYYY-MM-DD")}
                sx="text-content-dark-secondary"
              />
            </div>
          </div>
          <div className="flex gap-[10px] items-center">
            {product.category?.image && (
              <Image
                src={product.category?.image}
                className="h-[100px] w-[100px] rounded-sm object-cover"
                alt="product image"
                onErrorImage={images.placeholders.image}
              />
            )}
            <Paragraph
              content={product?.category?.name}
              sx="text-content-dark-secondary font-semibold"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductImages = ({ images = [] }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  return (
    <div className="flex flex-col-reverse sm:flex-col gap-5">
      <Image
        src={selectedImage}
        className="h-[400px] shrink-0 w-full sm:w-[600px] rounded-sm object-cover"
        alt="product image"
      />
      <div className="gap-[10px] flex flex-wrap sm:grid grid-cols-3">
        {images.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            className="h-[100px] w-auto rounded-sm object-cover cursor-pointer"
            alt="product image"
            onClick={() => setSelectedImage(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductClientPage;
