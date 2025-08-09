"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/hooks";
import {
  Category,
  Product,
  ProductFormErrorState,
  ProductFormState,
  ProductInputKey,
} from "@resources/types/product";
import { createProduct, updateProduct } from "@store/modules/product";

const useSetProductInputData = (initial: Product | null) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const [form, setForm] = useState<ProductFormState>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    price: initial?.price != null ? String(initial.price) : "",
    category: initial?.category ? initial?.category : null,
  });
  const [formErrors, setFormErrors] = useState<ProductFormErrorState>({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [creating, setCreating] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    setForm({
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      price: initial?.price != null ? String(initial.price) : "",
      category: initial?.category ? initial?.category : null,
    });
  }, [initial]);

  const setProductStates = (value: string, key: ProductInputKey) => {
    setForm((s) => ({ ...s, [key]: value }));
    setFormErrors((s) => ({ ...s, [key]: "" }));
  };
  const setProductCategory = (value: Category) => {
    setForm((s) => ({ ...s, category: value }));
    setFormErrors((s) => ({ ...s, category: "" }));
  };
  const createProductHandler = () => {
    const title = form.title.trim();
    const price = parseFloat(form.price);
    if (!title) return setFormErrors((state) => ({ ...state, title: "Title required" }));
    if (isNaN(price) || price < 0)
      return setFormErrors((state) => ({ ...state, price: "Invalid price" }));
    if (!form.category)
      return setFormErrors((state) => ({ ...state, category: "Category required" }));

    if (!products.creating && form.category?.id) {
      setCreating(true);
      dispatch(
        createProduct({
          title,
          price,
          description: form?.description,
          categoryId: form.category.id,
        })
      );
    }
  };

  const updateProductHandler = () => {
    const title = form.title.trim();
    const price = parseFloat(form.price);

    if (!title) return setFormErrors((state) => ({ ...state, title: "Title required" }));
    if (isNaN(price) || price < 0)
      return setFormErrors((state) => ({ ...state, price: "Invalid price" }));
    if (!form.category)
      return setFormErrors((state) => ({ ...state, category: "Category required" }));

    if (!products.updating && initial?.id) {
      setUpdating(true);
      dispatch(
        updateProduct({
          productId: initial?.id,
          title,
          price,
          description: form?.description,
          categoryId: form.category.id,
        })
      );
    }
  };

  return {
    creating,
    updating,
    productStates: form,
    productStateErrors: formErrors,
    setProductStates,
    setProductCategory,
    createProductHandler,
    updateProductHandler,
  } as const;
};

export default useSetProductInputData;
