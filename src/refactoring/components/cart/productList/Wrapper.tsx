import Title2 from "../../_design/text/Title2";
import useProduct from "../_store/store-product";
import Item from "./Item";

export default function ProductList() {
  const { products } = useProduct();
  return (
    <div>
      <Title2 type="type1">상품 목록</Title2>
      <div className="space-y-2">
        {products.map((product) => {
          return <Item key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
