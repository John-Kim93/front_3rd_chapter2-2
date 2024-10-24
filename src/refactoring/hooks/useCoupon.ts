import { useState } from "react";
import { ICoupon } from "../components/cart/_store/store-coupon";

export const useCoupons = (
  initialCoupons: ICoupon[]
): { coupons: ICoupon[]; addCoupon: (newCoupon: ICoupon) => void } => {
  const [coupons, setCoupons] = useState<ICoupon[]>(initialCoupons);

  const addCoupon = (newCoupon: ICoupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
