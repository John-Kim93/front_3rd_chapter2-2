import { IChildrenProps } from "../../shared/types";

type ITypes = "type1";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
}

export default function FlexContainer({ children, type }: Props) {
  const className: IClassName = {
    type1: "flex justify-between items-center",
  };

  return <div className={className[type]}>{children}</div>;
}
