export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  category?: Category;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductFormState {
  title: string;
  description: string;
  price: string;
  category: Category | null;
}
export interface ProductFormErrorState {
  title: string;
  description: string;
  price: string;
  category: string;
}

export type ProductInputKey = "title" | "description" | "price";
