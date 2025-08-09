import SkeletonWrapper from "@modules/common/SkeletonWrapper";
import { cn } from "@lib/utils/style";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import Paragraph from "@modules/common/typography/components/Paragraph";
import { useDispatch, useSelector } from "@store/hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { getProductCategories } from "@store/modules/category";
import Heading from "@modules/common/typography/components/Heading";
import { Category } from "@resources/types/product";

interface CategoriesProps {
  selectedCategory: Category | null;
  onCategorySelect: (category: Category | null) => void;
  sx?: string;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onCategorySelect, sx }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (
      !categories.loading &&
      (!categories.lastFetched || dayjs().diff(categories.lastFetched, "m") > 30)
    ) {
      dispatch(getProductCategories());
    }
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 w-full h-auto max-h-[70vh] overflow-auto bg-bkg-light border-r border-border-light px-2 py-5 rounded",
        sx
      )}
    >
      <Heading variant={headingVariants.cardHeading} sx="font-semibold px-4 hidden xmd:flex">
        Category
      </Heading>
      <>
        {categories.loading || !categories?.data ? (
          <SkeletonWrapper renderTimes={5}>
            <div
              className={cn(
                "flex items-center gap-[10px] hover:bg-dark-800 px-4 py-1 rounded-sm cursor-pointer duration-150 group hover:bg-action/10 whitespace-nowrap xmd:whitespace-normal"
              )}
            >
              <div className="skeleton-loading h-5 w-full rounded-sm bg-bkg-dark-secondary/20" />
            </div>
          </SkeletonWrapper>
        ) : (
          <>
            {categories.data && categories.data.length > 0 ? (
              <ul className="flex xmd:flex-col">
                <li
                  className={cn(
                    "flex items-center gap-[10px] hover:bg-dark-800 px-4 py-2 rounded-sm cursor-pointer duration-150 group hover:bg-action/10",
                    { "bg-action/12": !selectedCategory?.id }
                  )}
                  onClick={() => onCategorySelect(null)}
                >
                  <Paragraph content={"All"} />
                </li>
                {categories.data.map((category, index) => (
                  <li
                    key={index}
                    className={cn(
                      "flex items-center gap-[10px] hover:bg-dark-800 px-4 py-2 rounded-sm cursor-pointer duration-150 group hover:bg-action/10 whitespace-nowrap xmd:whitespace-normal",
                      { "bg-action/12": selectedCategory?.id === category.id }
                    )}
                    onClick={() => onCategorySelect(category)}
                  >
                    <Paragraph content={category.name} sx="truncate" />
                  </li>
                ))}
              </ul>
            ) : (
              <Paragraph
                variant={paragraphVariants.regular}
                sx={"text-content-light-secondary"}
                content="No categories found px-4"
              />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Categories;
