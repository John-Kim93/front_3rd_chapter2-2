import { AdminPage } from "./components/admin/AdminPage.tsx";
import { useCoupons } from "./hooks/useCoupon.ts";
import { useProducts } from "./hooks/useProduct.ts";
import { IChildrenProps } from "./shared/types.ts";
import Header from "./components/Header.tsx";
import useAdmin from "./components/admin/store-admin.ts";
import { CartMain } from "./components/cart/MainPage.tsx";

const App = () => {
  const { products, updateProduct, addProduct } = useProducts([]);
  const { coupons, addCoupon } = useCoupons([]);
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
          <CartMain />
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
  return (
    <div className="container mx-auto mt-6">
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
}
