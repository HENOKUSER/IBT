import Menu from "./Menu/Menu";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import DishDetail from "./DishDetail/DishDetail";
import NotFound from "./NotFound/NotFound";
import RequireAuth from "./auth/RequireAuth";
import Checkout from "./Checkout/Checkout";
import SignIn from "./SignIn/SignIn";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="signin" element={<SignIn />} />
          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path="/" elemet={<Layout />} /> */}
      </Routes>
    </div>
  );
};

export default App;
