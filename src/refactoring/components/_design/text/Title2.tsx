import { IChildrenProps } from "../../../shared/types";

type ITypes = "type1" | "type2";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
}

export default function Title2({ children, type }: Props) {
  const className: IClassName = {
    type1: "text-2xl font-semibold mb-4",
    type2: "text-2xl font-semibold mb-2",
  };

  return <h2 className={className[type]}>{children}</h2>;
}
