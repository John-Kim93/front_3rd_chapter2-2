import InlineText from "../../../_design/text/InlineText";

interface Props {
  name: string;
  price: number;
  quantity: number;
  appliedDiscount: number;
}

export default function ItemInfo({
  name,
  price,
  quantity,
  appliedDiscount,
}: Props) {
  return (
    <div>
      <InlineText type="type1">{name}</InlineText>
      <br />
      <InlineText type="type7">
        {price}원 x {quantity}
        {appliedDiscount > 0 && (
          <InlineText type="type8">
            ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
          </InlineText>
        )}
      </InlineText>
    </div>
  );
}
