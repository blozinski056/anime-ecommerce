import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import SearchPageLayout from "./components/SearchPageLayout";
import ItemDescription from "./components/ItemDescription";
import ShoppingCart from "./components/ShoppingCart";
import WrongPage from "./components/WrongPage";

export default function App() {
  const [cart, setCart] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState({});

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<Navbar cart={cart} />}>
        <Route
          path="items/search/:param1?/:param2?"
          element={<SearchPageLayout setItemDetails={setItemDetails} />}
        />
        <Route
          path="items/:itemid"
          element={
            <ItemDescription itemDetails={itemDetails} setCart={setCart} />
          }
        />
        <Route path="cart" element={<ShoppingCart />} />
      </Route>
      <Route path="*" element={<WrongPage />} />
    </Routes>
  );
}
