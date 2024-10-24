import { IChildrenProps } from "../../shared/types";

export default function ResponsiveTwoColGrid({ children }: IChildrenProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
}
