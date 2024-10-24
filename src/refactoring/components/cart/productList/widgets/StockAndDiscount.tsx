import InlineText from "../../../_design/text/InlineText";
import Text from "../../../_design/text/Text";
import BulletListWrapper from "../../../_design/wrapper/BulletListWrapper";
import { IProduct } from "../../_store/store-product";

interface Props {
  product: IProduct;
  hasStock: boolean;
  hasDiscount: boolean;
}

export default function StockAndDiscount({
  product,
  hasStock,
  hasDiscount,
}: Props) {
  const { stock } = product;

  const getMaxDiscount = (
    discounts: { quantity: number; rate: number }[]
  ): number => {
    const maxDiscount = discounts.reduce(
      (max, discount) => Math.max(max, discount.rate),
      0
    );
    return maxDiscount;
  };

  const maxDiscount = (getMaxDiscount(product.discounts) * 100).toFixed(0);

  return (
    <>
      <Text type="type1">
        {hasStock ? (
          <InlineText type="type3">재고: {stock}개</InlineText>
        ) : (
          <InlineText type="type4">재고: {stock}개</InlineText>
        )}
        {hasDiscount && (
          <InlineText type="type6">최대 {maxDiscount}% 할인</InlineText>
        )}
      </Text>
      {hasDiscount && (
        <BulletListWrapper>
          {product.discounts.map((discount, index) => {
            const { quantity, rate } = discount;
            const discountRate = (rate * 100).toFixed(0);
            return (
              <li key={index}>
                {quantity}개 이상: {discountRate}% 할인
              </li>
            );
          })}
        </BulletListWrapper>
      )}
    </>
  );
}
