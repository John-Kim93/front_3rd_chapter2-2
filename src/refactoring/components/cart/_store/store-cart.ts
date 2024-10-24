import { create } from "zustand";
import { IProduct } from "./store-product";
import {
  addQuantityInCart,
  getRemainingStock,
  updateCartItemQuantity,
} from "../_utils/cartUtils";
import { ICoupon } from "./store-coupon";

// store interface 정의
interface ICartState {
  cart: ICartItem[];
  selectedCoupon: ICoupon | null;
  addToCart: (product: IProduct) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: ICoupon) => void;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

// action 함수
const addToCartAction = (set: any, product: IProduct) => {
  set(({ cart }: ICartState) => {
    const remainingStock = getRemainingStock(cart, product);
    if (remainingStock <= 0) {
      throw Error("재고가 없습니다!!");
    }
    const newCart = addQuantityInCart(cart, product);
    return {
      cart: newCart,
    };
  });
};

const updateQuantityAction = (
  set: any,
  productId: string,
  newQuantity: number
) => {
  set(({ cart }: ICartState) => {
    return {
      cart: updateCartItemQuantity(cart, productId, newQuantity),
    };
  });
};

const removeFromCartAction = (set: any, productId: string) => {
  set(({ cart }: ICartState) => {
    return {
      cart: cart.filter((item) => item.product.id !== productId),
    };
  });
};

const applyCouponAction = (set: any, coupon: ICoupon) => {
  set(() => {
    return {
      selectedCoupon: coupon,
    };
  });
};

// store
const useCart = create<ICartState>((set) => ({
  cart: [],
  selectedCoupon: null,
  addToCart: (product: IProduct) => addToCartAction(set, product),
  updateQuantity: (productId: string, newQuantity: number) =>
    updateQuantityAction(set, productId, newQuantity),
  removeFromCart: (productId: string) => removeFromCartAction(set, productId),
  applyCoupon: (coupon: ICoupon) => applyCouponAction(set, coupon),
}));

export default useCart;
