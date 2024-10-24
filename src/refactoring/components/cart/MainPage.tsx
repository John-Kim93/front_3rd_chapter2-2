import Title1 from "../_design/text/Title1.tsx";
import ResponsiveTwoColGrid from "../_layout/ResponsiveTwoColGrid.tsx";
import CartList from "./cartList/Wrapper.tsx";
import ProductList from "./productList/Wrapper.tsx";

export const CartMain = () => {
  return (
    <>
      <Title1 type="type2">장바구니</Title1>
      <ResponsiveTwoColGrid>
        <ProductList />
        <CartList />
      </ResponsiveTwoColGrid>
    </>
  );
};
