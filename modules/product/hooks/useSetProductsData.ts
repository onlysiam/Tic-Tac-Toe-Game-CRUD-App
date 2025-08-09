import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/hooks";
import { useSearchWithDebounce } from "@hooks/common/useSearchWithDebounce";
import { fetchLimits } from "@configs/app";
import { getProducts, resetSearchedProducts, searchProducts } from "@store/modules/product";
import { Category, Product } from "@resources/types/product";

export function useSetProductsData(): {
  pageData: Product[];
  isSearching: boolean;
  searchedInput: string;
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void;
} {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const currentCategory = useSelector((state) => state.categories.current);
  const currentPage = useSelector((state) => state.products.pagination.page);

  const [pageData, setPageData] = useState<Product[]>([]);
  const [prevCategory, setPrevCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (
      !products.loading &&
      (!products.data?.length ||
        products.pagination.skip !== (currentPage - 1) * fetchLimits.default ||
        prevCategory?.id !== currentCategory?.id)
    ) {
      setPageData([]);
      dispatch(
        getProducts({
          categoryId: currentCategory?.id,
          skip: (currentPage - 1) * fetchLimits.default,
          limit: fetchLimits.default,
        })
      );
      setPrevCategory(currentCategory);
    }
  }, [currentPage, currentCategory]);

  const [isSearching, search, setSearchQuery, searchedInput, setSearchedInput, searchHandler] =
    useSearchWithDebounce({
      loadingState: products.searching,
      searchLimit: fetchLimits.default,
      searchAction: searchProducts,
      resetSearchStateAction: resetSearchedProducts,
    });

  // Update pageData based on search or default results
  useEffect(() => {
    if (searchedInput) setPageData(products.searched);
    else setPageData(products.data);
  }, [products, searchedInput]);

  return { pageData, isSearching, searchedInput, searchHandler };
}
