import { Product } from "@resources/types/product";
import SkeletonWrapper from "@modules/common/SkeletonWrapper";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { cn } from "@lib/utils/style";
import ProductCard from "./card/Product";
import { paragraphVariants } from "@resources/types/variants";
import Paragraph from "@modules/common/typography/components/Paragraph";

interface ProductsProps {
  products: Product[];
  isLoading: boolean;
}

const Products: React.FC<ProductsProps> = ({ products, isLoading }) => {
  return (
    <section className={cn("flex h-full w-full flex-col gap-[10px]")}>
      {isLoading || !products ? (
        <SkeletonWrapper renderTimes={10}>
          <ProductCardSkeleton />
        </SkeletonWrapper>
      ) : (
        <>
          {products && products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <Paragraph
              variant={paragraphVariants.regular}
              sx={"text-content-light-secondary"}
              content="No products found"
            />
          )}
        </>
      )}
    </section>
  );
};

export default Products;
