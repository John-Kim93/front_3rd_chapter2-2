import { IChildrenProps } from "../../../shared/types";

type ITypes = "type1" | "type2";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
}

export default function Title1({ children, type }: Props) {
  const className: IClassName = {
    type1: "text-2xl font-bold",
    type2: "text-3xl font-bold mb-6",
  };

  return <h1 className={className[type]}>{children}</h1>;
}
