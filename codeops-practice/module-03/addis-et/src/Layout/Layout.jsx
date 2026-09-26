import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
