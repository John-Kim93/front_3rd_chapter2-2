import Title2 from "../../_design/text/Title2";
import CouponSelection from "../coupon/CouponSelection";
import useCart from "../_store/store-cart";
import Item from "./Item";
import SummaryOrder from "../summary/order";

export default function CartList() {
  const { cart } = useCart();
  return (
    <div>
      <Title2 type="type1">장바구니 내역</Title2>
      <div className="space-y-2">
        {cart.map((item) => {
          return <Item key={item.product.id} cartItem={item} />;
        })}
      </div>
      <CouponSelection />
      <SummaryOrder />
    </div>
  );
}
