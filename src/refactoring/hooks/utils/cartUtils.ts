import { CartItem, Coupon, Product } from "../../../types";

export const calculateItemTotal = (item: CartItem): number => {
  const { product, quantity } = item;
  const { price } = product;

  const discount = getMaxApplicableDiscount(item);

  return price * quantity * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { product, quantity } = item;
  const { discounts } = product;

  let discountRate = 0;

  if (discounts.length > 0) {
    for (const discount of discounts) {
      if (discount.quantity <= quantity && discount.rate > discountRate) {
        discountRate = discount.rate;
      }
    }
  }

  return discountRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = item.product.discounts.reduce((maxDiscount, d) => {
      return quantity >= d.quantity && d.rate > maxDiscount
        ? d.rate
        : maxDiscount;
    }, 0);

    totalAfterDiscount += price * quantity * (1 - discount);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(
        0,
        totalAfterDiscount - selectedCoupon.discountValue
      );
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
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
    .filter((item): item is CartItem => item !== null);
};

export const findItemInCart = (
  cart: CartItem[],
  productId: string
): CartItem | null => {
  return cart.find((item) => item.product.id === productId) ?? null;
};

export const getRemainingStock = (
  cart: CartItem[],
  { id, stock }: Pick<Product, "id" | "stock">
) => {
  const cartItem = findItemInCart(cart, id);
  return stock - (cartItem?.quantity || 0);
};
