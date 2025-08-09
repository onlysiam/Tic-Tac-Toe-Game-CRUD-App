import React from "react";
import ProductClientPage from "@modules/product/components/client-page/ProductClientPage";
import { redirect } from "next/navigation";
import { Product } from "@resources/types/product";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const getProductBySlug = async (slug: string): Promise<Product> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    redirect("/404");
  }

  const res = await fetch(`${baseUrl}/products/slug/${encodeURIComponent(slug)}`);

  if (!res.ok) {
    redirect("/404");
  }

  const data = (await res.json()) as Product;
  return data;
};

interface ManageProductsProps {
  params: Promise<{ productSlug: string }>;
}

export async function generateMetadata({ params }: ManageProductsProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  const title = product.title;
  const description = product.description.slice(0, 160) || "";

  const imageUrl = product.images[0];

  const siteUrl = "";
  const canonical = `${siteUrl}/manage-products/${productSlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "React Assignment",
      images: [{ url: imageUrl, width: 1200, height: 628, alt: title }],
      type: "article",
      publishedTime: product.creationAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

const ManageProducts = async ({ params }: ManageProductsProps) => {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  return <ProductClientPage product={product} />;
};

export default ManageProducts;
