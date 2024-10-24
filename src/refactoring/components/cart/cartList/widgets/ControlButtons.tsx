import { Button } from "../../../_design/button/Button";
import useCart from "../../_store/store-cart";

interface Props {
  productId: string;
  quantity: number;
}

export default function ControlButtons({ productId, quantity }: Props) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div>
      <Button
        onClick={() => updateQuantity(productId, quantity - 1)}
        type="type4"
      >
        -
      </Button>
      <Button
        onClick={() => updateQuantity(productId, quantity + 1)}
        type="type4"
      >
        +
      </Button>
      <Button onClick={() => removeFromCart(productId)} type="type5">
        삭제
      </Button>
    </div>
  );
}
