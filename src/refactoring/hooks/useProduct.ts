import { useState } from "react";
import { IProduct } from "../components/cart/_store/store-product";

export const useProducts = (
  initialProducts: IProduct[]
): {
  products: IProduct[];
  updateProduct: (updatedProduct: IProduct) => void;
  addProduct: (newProduct: IProduct) => void;
} => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);

  const updateProduct = (updatedProduct: IProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const addProduct = (newProduct: IProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
