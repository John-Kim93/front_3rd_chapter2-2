import InlineText from "../../../_design/text/InlineText";
import FlexContainer from "../../../_layout/FlexContainer";

interface Props {
  name: string;
  price: number;
}

export default function NameAndPrice({ name, price }: Props) {
  return (
    <FlexContainer type="type1">
      <InlineText type="type1">{name}</InlineText>
      <InlineText type="type2">{price.toLocaleString()}원</InlineText>
    </FlexContainer>
  );
}
