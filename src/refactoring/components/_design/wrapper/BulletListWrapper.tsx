import { IChildrenProps } from "../../../shared/types";

export default function BulletListWrapper({ children }: IChildrenProps) {
  const className = "list-disc list-inside text-sm text-gray-500 mb-2";

  return <ul className={className}>{children}</ul>;
}
