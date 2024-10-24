import { MouseEvent } from "react";
import { IChildrenProps } from "../../../shared/types";

type ITypes = "type1" | "type2" | "type3" | "type4" | "type5";

type IClassName = {
  [key in ITypes]: string;
};

interface Props extends IChildrenProps {
  type: ITypes;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function Button({ children, type, onClick, disabled = false }: Props) {
  const className: IClassName = {
    type1: "bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100",
    type2: "w-full px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600",
    type3:
      "w-full px-3 py-1 rounded bg-gray-300 text-gray-500 cursor-not-allowed",
    type4: "bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400",
    type5: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600",
  };

  return (
    <button className={className[type]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
