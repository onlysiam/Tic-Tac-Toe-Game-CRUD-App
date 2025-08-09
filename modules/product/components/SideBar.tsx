"use client";
import { cn } from "@lib/utils/style";
import Categories from "@modules/category/components/Categories";
import { useDispatch, useSelector } from "@store/hooks";
import { setCurrentCategory } from "@store/modules/category";
import Pagination from "./Pagination";
import { setCurrentProductPagination } from "@store/modules/product";

const Sidebar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  return (
    <section
      className={cn(
        "xmd:flex flex-col justify-between duration-300 z-[1000] h-[calc(100vh-150px)] sticky top-0 w-[320px] left-auto right-5 shrink-0 hidden"
      )}
    >
      <Categories
        selectedCategory={categories.current}
        onCategorySelect={(category) => {
          dispatch(setCurrentProductPagination(1));
          dispatch(setCurrentCategory(category));
        }}
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
      />
    </section>
  );
};
export default Sidebar;
