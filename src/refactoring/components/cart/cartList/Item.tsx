import Card from "../../_design/card/Card";
import FlexContainer from "../../_layout/FlexContainer";
import { ICartItem } from "../_store/store-cart";
import { getAppliedDiscount } from "../_utils/cartUtils";
import ControlButtons from "./widgets/ControlButtons";
import ItemInfo from "./widgets/ItemInfo";

interface Props {
  cartItem: ICartItem;
}

export default function Item({ cartItem }: Props) {
  const { product, quantity } = cartItem;
  const appliedDiscount = getAppliedDiscount(cartItem);

  return (
    <Card type="type1">
      <FlexContainer type="type1">
        <ItemInfo
          name={product.name}
          price={product.price}
          quantity={quantity}
          appliedDiscount={appliedDiscount}
        />
        <ControlButtons productId={product.id} quantity={quantity} />
      </FlexContainer>
    </Card>
  );
}
