import { create } from "zustand";

// store interface 정의
interface IProductState {
  products: IProduct[];
  updateProduct: (updatedProduct: IProduct) => void;
  addProduct: (newProduct: IProduct) => void;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: IDiscount[];
}

export interface IDiscount {
  quantity: number;
  rate: number;
}

// action 함수
const addProductAction = (set: any, newProduct: IProduct) => {
  set(({ products }: IProductState) => {
    const newProducts = [...products, newProduct];
    return {
      products: newProducts,
    };
  });
};

const updateProductAction = (set: any, updatedProduct: IProduct) => {
  set(({ products }: IProductState) => {
    const newProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    return {
      products: newProducts,
    };
  });
};

// 초기값
const initialProducts: IProduct[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];

// store
const useProduct = create<IProductState>((set) => ({
  products: initialProducts,
  addProduct: (newProduct: IProduct) => addProductAction(set, newProduct),
  updateProduct: (updatedProduct: IProduct) =>
    updateProductAction(set, updatedProduct),
}));

export default useProduct;