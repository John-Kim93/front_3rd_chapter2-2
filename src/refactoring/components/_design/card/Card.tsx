import { IChildrenProps } from "../../../shared/types";

type ITypes = "type1" | "type2";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
}

export default function Card({ children, type }: Props) {
  const className: IClassName = {
    type1: "bg-white p-3 rounded shadow",
    type2: "mt-6 bg-white p-4 rounded shadow",
  };
  return <div className={className[type]}>{children}</div>;
}
