import "./App.css";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import Home from "./layout/Home/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleProduct from "./layout/SingleProduct/SingleProduct";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
