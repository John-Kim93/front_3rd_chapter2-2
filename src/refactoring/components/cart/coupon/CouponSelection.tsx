import Card from "../../_design/card/Card";
import Text from "../../_design/text/Text";
import Title2 from "../../_design/text/Title2";
import useCart from "../_store/store-cart";
import useCoupon from "../_store/store-coupon";

export default function CouponSelection() {
  const { coupons } = useCoupon();
  const { selectedCoupon, applyCoupon } = useCart();
  return (
    <Card type="type2">
      <Title2 type="type2">쿠폰 적용</Title2>
      <select
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount"
              ? `${coupon.discountValue}원`
              : `${coupon.discountValue}%`}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <Text type="type2">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </Text>
      )}
    </Card>
  );
}
