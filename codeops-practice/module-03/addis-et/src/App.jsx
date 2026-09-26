import Layout from "./Layout/Layout";
import Menu from "./Menu/Menu";
import { Route, Routes, Link } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import DishDetail from "./DishDetail/DishDetail";
import RequireAuth from "./auth/RequireAuth";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import TodaysSpecials from "./TodaysSpecials/TodaysSpecials";
import OrderCart from "./OrderCart/OrderCart";
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";

const Checkout = lazy(() => import("./Checkout/Checkout"));

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ErrorBoundary fallback={<p>Today's specials failed to load.</p>}>
                <TodaysSpecials />
              </ErrorBoundary>
            }
          />
          <Route
            path="/menu"
            element={
              <ErrorBoundary fallback={<p>The menu failed to load.</p>}>
                <Menu />
              </ErrorBoundary>
            }
          />

          <Route
            path="checkout"
            element={
              <ErrorBoundary fallback={<p>The checkout failed to load.</p>}>
                <Suspense fallback={<p>Loading checkout...</p>}>
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                </Suspense>
              </ErrorBoundary>
            }
          />

          <Route
            path="/cart"
            element={
              <RequireAuth>
                <OrderCart />
              </RequireAuth>
            }
          />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
