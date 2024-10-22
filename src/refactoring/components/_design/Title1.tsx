import { IChildrenProps } from "../../shared/types";

export default function Title1({ children }: IChildrenProps) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}
