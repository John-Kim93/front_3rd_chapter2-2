import { ICartItem } from "../_store/store-cart";
import { ICoupon } from "../_store/store-coupon";
import { IProduct } from "../_store/store-product";

export const calculateItemTotal = (item: ICartItem): number => {
  const { product, quantity } = item;
  const { price } = product;

  const discount = getMaxApplicableDiscount(item);

  return price * quantity * (1 - discount);
};

export const calculateCartTotal = (
  cart: ICartItem[],
  selectedCoupon: ICoupon | null
) => {
  // 할인 전-후 금액
  const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);
  const totalAfterDiscount = calculateTotalAfterDiscount(cart, selectedCoupon);
  // 최종 할인된 금액
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const calculateTotalBeforeDiscount = (cart: ICartItem[]) => {
  const totalBeforeDiscount = cart.reduce((total, item) => {
    const { price } = item.product;
    const { quantity } = item;
    return total + price * quantity;
  }, 0);

  return totalBeforeDiscount;
};

export const calculateTotalAfterDiscount = (
  cart: ICartItem[],
  selectedCoupon: ICoupon | null
) => {
  const totalAfterDiscount = cart.reduce((total, item) => {
    const { price } = item.product;
    const { quantity } = item;
    const discount = getMaxApplicableDiscount(item);

    return total + price * quantity * (1 - discount);
  }, 0);

  // 쿠폰 적용한 최종값 반환
  return applyCouponDiscount(totalAfterDiscount, selectedCoupon);
};

export const getMaxApplicableDiscount = (item: ICartItem) => {
  const maxDiscount = item.product.discounts.reduce((maxDiscount, d) => {
    return item.quantity >= d.quantity && d.rate > maxDiscount
      ? d.rate
      : maxDiscount;
  }, 0);

  return maxDiscount;
};

export const applyCouponDiscount = (
  price: number,
  coupon: ICoupon | null
): number => {
  if (!coupon) return price;
  const { discountType, discountValue } = coupon;
  switch (discountType) {
    case "amount":
      price = Math.max(0, price - discountValue);
      break;
    case "percentage":
      price *= 1 - discountValue / 100;
      break;
  }
  return price;
};

export const updateCartItemQuantity = (
  cart: ICartItem[],
  productId: string,
  newQuantity: number
): ICartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item): item is ICartItem => item !== null);
};

export const findItemInCart = (
  cart: ICartItem[],
  productId: string
): ICartItem | null => {
  return cart.find((item) => item.product.id === productId) ?? null;
};

export const getRemainingStock = (
  cart: ICartItem[],
  { id, stock }: Pick<IProduct, "id" | "stock">
) => {
  const cartItem = findItemInCart(cart, id);
  return stock - (cartItem?.quantity || 0);
};

export const getAppliedDiscount = (item: ICartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const getLimitedQuantity = (quantity: number, stock: number) =>
  Math.min(quantity + 1, stock);

export const addQuantityInCart = (
  cart: ICartItem[],
  product: IProduct
): ICartItem[] => {
  const existingItem: ICartItem | null = findItemInCart(cart, product.id);
  if (existingItem) {
    const newCart = cart.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: getLimitedQuantity(item.quantity, product.stock),
          }
        : item
    );
    return newCart;
  }
  return [...cart, { product, quantity: 1 }];
};
