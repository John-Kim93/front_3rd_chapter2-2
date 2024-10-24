import useCart from "../_store/store-cart";
import { calculateCartTotal } from "../_utils/cartUtils";

export default function SummaryOrder() {
  const { cart, selectedCoupon } = useCart();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateCartTotal(cart, selectedCoupon);

  return (
    <div>
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
        <div className="space-y-1">
          <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
          <p className="text-green-600">
            할인 금액: {totalDiscount.toLocaleString()}원
          </p>
          <p className="text-xl font-bold">
            최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}
