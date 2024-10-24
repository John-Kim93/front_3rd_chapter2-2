import { IChildrenProps } from "../../../shared/types";

type ITypes = "type1" | "type2";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
}

export default function Text({ children, type }: Props) {
  const className: IClassName = {
    type1: "text-sm text-gray-500 mb-2",
    type2: "text-green-600",
  };

  return <p className={className[type]}>{children}</p>;
}
