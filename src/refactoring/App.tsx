import { CartPage } from "./components/CartPage.tsx";
import { AdminPage } from "./components/admin/AdminPage.tsx";
import { Coupon, Product } from "../types.ts";
import { useCoupons } from "./hooks/useCoupon.ts";
import { useProducts } from "./hooks/useProduct.ts";
import { IChildrenProps } from "./shared/types.ts";
import Header from "./components/layout/Header.tsx";
import useAdmin from "./components/admin/store-admin.ts";

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];

const initialCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const { isAdmin } = useAdmin();

  return (
    <AppContainer>
      <Header />
      <MainContainer>
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </MainContainer>
    </AppContainer>
  );
};

export default App;

function AppContainer({ children }: IChildrenProps) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
function MainContainer({ children }: IChildrenProps) {
  return <div className="container mx-auto mt-6">{children}</div>;
}
