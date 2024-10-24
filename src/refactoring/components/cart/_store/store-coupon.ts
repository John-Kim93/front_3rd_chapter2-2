import { create } from "zustand";

// store interface 정의
interface ICouponState {
  coupons: ICoupon[];
  addCoupon: (newCoupon: ICoupon) => void;
}

export interface ICoupon {
  name: string;
  code: string;
  discountType: "amount" | "percentage";
  discountValue: number;
}

// action 함수
const addCouponAction = (set: any, newCoupon: ICoupon) => {
  set(({ coupons }: ICouponState) => {
    return {
      coupons: [...coupons, newCoupon],
    };
  });
};

// 초기값 생성
const initialCoupons: ICoupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

// store 생성
const useCoupon = create<ICouponState>((set) => ({
  coupons: initialCoupons,
  addCoupon: (newCoupon: ICoupon) => addCouponAction(set, newCoupon),
}));

export default useCoupon;
