// import { useState } from "react";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
