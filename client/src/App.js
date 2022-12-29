import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import SearchPageLayout from "./components/SearchPageLayout";
import ItemDescription from "./components/ItemDescription";
import ShoppingCart from "./components/ShoppingCart";
import WrongPage from "./components/WrongPage";
import Tiles from "./components/Tiles";
import { data } from "./components/data.js";

export default function App() {
  const [cart, setCart] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState({});
  const [clickToggle, setClickToggle] = React.useState(false);

  React.useEffect(() => {
    const cartData = JSON.parse(window.localStorage.getItem("cart"));
    const itemDetailsData = JSON.parse(
      window.localStorage.getItem("itemDetails")
    );

    if (cartData !== null) setCart(cartData);
    if (itemDetailsData !== null) setItemDetails(itemDetailsData);
  }, []);

  React.useEffect(() => {
    if (cart.length !== 0) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  React.useEffect(() => {
    if (Object.keys(itemDetails).length !== 0) {
      window.localStorage.setItem("itemDetails", JSON.stringify(itemDetails));
    }
  }, [itemDetails]);

  const allTiles = React.useMemo(() => {
    let newArray = data.map((item) => {
      return (
        <Tiles key={item.id} item={item} setItemDetails={setItemDetails} />
      );
    });
    return newArray;
  }, [setItemDetails]);

  const updateCart = React.useCallback(
    (itemObj, itemSize, itemQuantity) => {
      let tempCart = [];
      let foundMatch = false;

      cart.forEach((item) => {
        if (item.obj.title === itemObj.title && item.size === itemSize) {
          if (item.quantity + itemQuantity !== 0) {
            tempCart.push({
              obj: item.obj,
              size: item.size,
              quantity: item.quantity + itemQuantity,
            });
          }
          foundMatch = true;
        } else {
          tempCart.push({ ...item });
        }
      });

      if (!foundMatch) {
        tempCart.push({ obj: itemObj, size: itemSize, quantity: itemQuantity });
      }

      setCart(tempCart);
    },
    [cart]
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<Navbar cart={cart} setClickToggle={setClickToggle} />}>
        <Route
          path="items/search/:param1?/:param2?"
          element={
            <SearchPageLayout allTiles={allTiles} clickToggle={clickToggle} />
          }
        />
        <Route
          path="items/:itemid"
          element={
            <ItemDescription
              itemDetails={itemDetails}
              updateCart={updateCart}
            />
          }
        />
        <Route
          path="cart"
          element={<ShoppingCart cart={cart} updateCart={updateCart} />}
        />
      </Route>
      <Route path="*" element={<WrongPage />} />
    </Routes>
  );
}
