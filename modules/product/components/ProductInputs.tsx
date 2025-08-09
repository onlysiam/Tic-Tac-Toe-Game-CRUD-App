"use client";

import useComponentVisible from "@hooks/common/useComponentVisible";
import { cn } from "@lib/utils/style";
import Input from "@modules/common/Input";
import Loader from "@modules/common/Loader";
import SelectBoxBtn from "@modules/common/SelectBoxBtn";
import TextArea from "@modules/common/TextArea";
import Heading from "@modules/common/typography/components/Heading";
import Paragraph from "@modules/common/typography/components/Paragraph";
import {
  Category,
  ProductFormErrorState,
  ProductFormState,
  ProductInputKey,
} from "@resources/types/product";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import { useSelector } from "@store/hooks";

interface ProductInputsProps {
  productStates: ProductFormState;
  productStateErrors: ProductFormErrorState;
  setProductStates: (value: string, key: ProductInputKey) => void;
  setProductCategory: (value: Category) => void;
  categories: Category[];
  isLoading?: boolean;
}
const ProductInputs: React.FC<ProductInputsProps> = ({
  productStates,
  productStateErrors,
  setProductStates,
  setProductCategory,
  isLoading,
  categories,
}) => {
  const { isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  return (
    <div className="flex flex-col bg-bkg-light rounded w-full p-5 gap-5">
      {isLoading && <Loader />}
      <div className="flex flex-col gap-[10px]">
        <Heading variant={headingVariants.cardHeading} sx="font-bold">
          Title
        </Heading>
        <Input
          value={productStates.title}
          onChange={(e) => setProductStates((e.target as HTMLInputElement).value, "title")}
          error={productStateErrors.title}
        />
      </div>

      <TextArea
        value={productStates.description}
        onChange={(e) => setProductStates(e.target.value, "description")}
        wordLimit={50}
        error={productStateErrors.description}
      />

      <div className="flex flex-col gap-[10px]">
        <Heading variant={headingVariants.cardHeading} sx="font-bold">
          Price
        </Heading>
        <Input
          value={productStates.price}
          type="number"
          inputIcon="taka"
          onChange={(e) => setProductStates((e.target as HTMLInputElement).value, "price")}
          error={productStateErrors.price}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Heading variant={headingVariants.cardHeading} sx="font-bold">
          Categories
        </Heading>

        <SelectBoxBtn
          selectedOptionName={(productStates.category as Category)?.name}
          isComponentVisible={isComponentVisible}
          setIsComponentVisible={setIsComponentVisible}
          isLoading={!categories}
        >
          <ul className="flex xmd:flex-col bg-bkg-light border border-border-light-secondary rounded max-h-[300px] overflow-auto">
            {categories.map((category, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-[10px] hover:bg-dark-800 px-4 py-2 rounded-sm cursor-pointer duration-150 group hover:bg-action/10 whitespace-nowrap xmd:whitespace-normal"
                )}
                onClick={() => {
                  setProductCategory(category);
                  setIsComponentVisible(false);
                }}
              >
                <Paragraph content={category.name} sx="text-start" />
              </li>
            ))}
          </ul>
        </SelectBoxBtn>
        {productStateErrors.category && (
          <Paragraph
            content={productStateErrors.category}
            variant={paragraphVariants.meta}
            sx="text-sm text-danger whitespace-nowrap text-start"
          />
        )}
      </div>
    </div>
  );
};

export default ProductInputs;
