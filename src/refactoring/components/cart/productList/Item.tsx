import { Button } from "../../_design/button/Button";
import Card from "../../_design/card/Card";
import useCart from "../_store/store-cart";
import { IProduct } from "../_store/store-product";
import { getRemainingStock } from "../_utils/cartUtils";
import NameAndPrice from "./widgets/NameAndPrice";
import StockAndDiscount from "./widgets/StockAndDiscount";

interface Props {
  product: IProduct;
}

export default function Item({ product }: Props) {
  const { cart, addToCart } = useCart();

  const remainingStock = getRemainingStock(cart, product);

  const hasStock = remainingStock > 0;
  const hasDiscount = product.discounts.length > 0;

  return (
    <div data-testid={`product-${product.id}`}>
      <Card type="type1">
        <NameAndPrice name={product.name} price={product.price} />
        <StockAndDiscount
          product={product}
          hasStock={hasStock}
          hasDiscount={hasDiscount}
        />

        <Button
          onClick={() => addToCart(product)}
          type={hasStock ? "type2" : "type3"}
          disabled={!hasStock}
        >
          {hasStock ? "장바구니에 추가" : "품절"}
        </Button>
      </Card>
    </div>
  );
}
