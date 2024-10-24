import { create } from "zustand";

// store interface 정의
interface IProductState {
  products: IProduct[];
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

// 초기값 생성
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

// store 생성
const useProduct = create<IProductState>((set) => ({
  products: initialProducts,
}));

export default useProduct;
