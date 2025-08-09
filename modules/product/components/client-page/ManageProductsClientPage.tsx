"use client";

import Products from "../Products";
import Sidebar from "../SideBar";
import { useDispatch, useSelector } from "@store/hooks";
import { useSetProductsData } from "@modules/product/hooks/useSetProductsData";
import Heading from "@modules/common/typography/components/Heading";
import { headingVariants } from "@resources/types/variants";
import ActionButton from "@modules/common/ActionButton";
import { pagePaths } from "@resources/paths";
import Input from "@modules/common/Input";
import Categories from "@modules/category/components/Categories";
import { setCurrentProductPagination } from "@store/modules/product";
import { setCurrentCategory } from "@store/modules/category";
import Pagination from "../Pagination";

const ManageProductsClientPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const { pageData, isSearching, searchedInput, searchHandler } = useSetProductsData();

  return (
    <section className="flex gap-[30px] h-[calc(100vh-70px)] overflow-y-auto w-full overflow-x-hidden align-items-start bg-bkg-light-secondary pt-[30px]">
      <div className="flex w-full xmd:w-[60vw] mx-auto gap-[30px] px-5 align-items-start bg-bkg-light-secondary">
        <div className="flex flex-col gap-5 w-full pb-[200px]">
          <Heading variant={headingVariants.heading} sx="font-bold">
            Manage Products
          </Heading>
          <div className="flex md:flex-row flex-col-reverse justify-between items-center w-full gap-[10px]">
            <Input
              isSearch
              value={searchedInput}
              onChange={searchHandler}
              inputPlaceholder="Search here..."
              inputSx="bg-bkg-light"
              sx="w-full md:max-w-[300px]"
            />
            <ActionButton
              label="Add New"
              href={`${pagePaths.addNewProduct}`}
              sx="w-full md:max-w-[180px]"
            />
          </div>
          <Categories
            selectedCategory={categories.current}
            onCategorySelect={(category) => {
              dispatch(setCurrentProductPagination(1));
              dispatch(setCurrentCategory(category));
            }}
            sx="xmd:hidden flex overflow-y-hidden shrink-0 p-0"
          />
          <Pagination
            page={products.pagination.page}
            totalPage={
              products.data.length < products.pagination.limit
                ? products.pagination.page
                : products.pagination.page + 1
            }
            isDisabled={products.loading}
            setPage={(page) => dispatch(setCurrentProductPagination(page))}
            sx="xmd:hidden flex"
          />
          <Products products={pageData} isLoading={products.loading || isSearching} />
        </div>
      </div>
      <Sidebar />
    </section>
  );
};

export default ManageProductsClientPage;
