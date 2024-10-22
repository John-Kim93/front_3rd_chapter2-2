import { IChildrenProps } from "../../shared/types";
import Title1 from "../_design/Title1";
import useAdmin from "../admin/store-admin";
import { Button1 } from "./Button1";

export default function Header() {
  const { isAdmin, setIsAdmin } = useAdmin((state) => state);
  return (
    <NavContainer>
      <Title1>쇼핑몰 관리 시스템</Title1>
      <Button1 onClick={() => setIsAdmin(!isAdmin)} type="primary">
        {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
      </Button1>
    </NavContainer>
  );
}

function NavContainer({ children }: IChildrenProps) {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {children}
      </div>
    </nav>
  );
}
