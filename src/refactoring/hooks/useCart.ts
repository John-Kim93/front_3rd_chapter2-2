// useCart.ts
import { useState } from "react";
import {
  calculateCartTotal,
  findItemInCart,
  getRemainingStock,
  updateCartItemQuantity,
} from "../components/cart/_utils/cartUtils";
import { IProduct } from "../components/cart/_store/store-product";
import { ICartItem } from "../components/cart/_store/store-cart";
import { ICoupon } from "../components/cart/_store/store-coupon";

export const useCart = (): {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: ICoupon) => void;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
  selectedCoupon: ICoupon | null;
} => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  const addToCart = (product: IProduct) => {
    const remainingStock = getRemainingStock(cart, product);
    if (remainingStock <= 0) {
      throw Error("재고가 없습니다!!");
    }

    setCart((prevCart) => {
      const existingItem: ICartItem | null = findItemInCart(cart, product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };

  const applyCoupon = (coupon: ICoupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
