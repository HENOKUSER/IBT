import React from "react";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import Footer from "./Components/Footer";
import {CartProvider} from "./Components/CartProvider"

function App() {
  return (
    <CartProvider>
      <Header />
      <Menu category="" />
      <Footer />
    </CartProvider>
  );
}

export default App;
