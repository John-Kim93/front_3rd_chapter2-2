import { IChildrenProps } from "../../../shared/types";

type ITypes =
  | "type1"
  | "type2"
  | "type3"
  | "type4"
  | "type5"
  | "type6"
  | "type7"
  | "type8";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
}

export default function InlineText({ children, type }: Props) {
  const className: IClassName = {
    type1: "font-semibold",
    type2: "text-gray-600",
    type3: "font-medium text-green-600",
    type4: "font-medium text-red-600",
    type5: "font-medium text-green-600",
    type6: "font-medium text-blue-600 ml-2",
    type7: "text-sm text-gray-600",
    type8: "text-green-600 ml-1",
  };

  return <span className={className[type]}>{children}</span>;
}
