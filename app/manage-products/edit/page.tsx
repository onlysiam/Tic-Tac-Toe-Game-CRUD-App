"use client";

import ActionButton from "@modules/common/ActionButton";
import ReturnButton from "@modules/common/ReturnButton";
import Heading from "@modules/common/typography/components/Heading";
import ProductInputs from "@modules/product/components/ProductInputs";
import useSetProductInputData from "@modules/product/hooks/useSetProductInputData";
import { pagePaths } from "@resources/paths";
import { Product } from "@resources/types/product";
import { headingVariants } from "@resources/types/variants";
import { useSelector } from "@store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EditProduct: React.FC = () => {
  const router = useRouter();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (!products?.current?.id) router.push(pagePaths.manageProducts);
  }, [products?.current]);

  const {
    productStates,
    setProductStates,
    setProductCategory,
    updateProductHandler,
    productStateErrors,
    updating,
  } = useSetProductInputData(products.current);

  useEffect(() => {
    if (products.updated && !products.updating && updating) {
      router.push(`${pagePaths.manageProducts}/${products.updated.slug}`);
    }
  }, [products, updating]);

  return (
    <section className="flex h-[calc(110vh)] overflow-y-auto w-full overflow-x-hidden align-items-start bg-bkg-light-secondary pt-[30px]">
      <div className="flex flex-col gap-[30px] w-full max-w-[95vw] sm:max-w-[740px] mx-auto">
        <ReturnButton />
        <Heading variant={headingVariants.heading} sx="font-bold">
          Edit Product
        </Heading>

        <ProductInputs
          productStates={productStates}
          productStateErrors={productStateErrors}
          setProductStates={setProductStates}
          setProductCategory={setProductCategory}
          categories={categories.data}
          isLoading={products.updating}
        />

        <ActionButton label="Update" onClick={updateProductHandler} sx="ml-auto sm:w-max" />
      </div>
    </section>
  );
};

export default EditProduct;
