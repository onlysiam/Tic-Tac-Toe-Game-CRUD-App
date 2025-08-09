"use client";

import ActionButton from "@modules/common/ActionButton";
import ReturnButton from "@modules/common/ReturnButton";
import Heading from "@modules/common/typography/components/Heading";
import ProductInputs from "@modules/product/components/ProductInputs";
import useSetProductInputData from "@modules/product/hooks/useSetProductInputData";
import { pagePaths } from "@resources/paths";
import { headingVariants } from "@resources/types/variants";
import { useDispatch, useSelector } from "@store/hooks";
import { getProductCategories } from "@store/modules/category";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateProduct: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (
      !categories.loading &&
      (!categories.lastFetched || dayjs().diff(categories.lastFetched, "m") > 30)
    ) {
      dispatch(getProductCategories());
    }
  }, []);

  const {
    creating,
    productStates,
    setProductStates,
    setProductCategory,
    createProductHandler,
    productStateErrors,
  } = useSetProductInputData(products.current);

  useEffect(() => {
    if (products.created && !products.creating && creating) {
      router.push(`${pagePaths.manageProducts}/${products.created.slug}`);
    }
  }, [products, creating]);

  return (
    <section className="flex h-[calc(100vh-70px)] overflow-y-auto w-full overflow-x-hidden align-items-start bg-bkg-light-secondary pt-[30px]">
      <div className="flex flex-col gap-[30px] w-full max-w-[95vw] sm:max-w-[740px] mx-auto">
        <ReturnButton />
        <Heading variant={headingVariants.heading} sx="font-bold">
          Create Product
        </Heading>

        <ProductInputs
          productStates={productStates}
          productStateErrors={productStateErrors}
          setProductStates={setProductStates}
          setProductCategory={setProductCategory}
          categories={categories.data}
          isLoading={products.creating}
        />

        <ActionButton label="Create" onClick={createProductHandler} sx="ml-auto w-max" />
      </div>
    </section>
  );
};

export default CreateProduct;
