import { MouseEvent } from "react";
import { IChildrenProps } from "../../shared/types";

interface IButton extends IChildrenProps {
  type: "primary";
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Button1({ children, type, onClick }: IButton) {
  const buttonClassMapper = {
    primary: "bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100",
  };

  return (
    <button className={buttonClassMapper[type]} onClick={onClick}>
      {children}
    </button>
  );
}
