import { IChildrenProps } from "../shared/types";
import useAdmin from "./admin/store-admin";
import { Button } from "./_design/button/Button";
import Title2 from "./_design/text/Title2";

export default function Header() {
  const { isAdmin, setIsAdmin } = useAdmin((state) => state);
  return (
    <NavContainer>
      <Title2 type="type1">쇼핑몰 관리 시스템</Title2>
      <Button onClick={() => setIsAdmin(!isAdmin)} type="type1">
        {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
      </Button>
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
