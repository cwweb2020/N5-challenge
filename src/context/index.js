// src/context/DataContext.js
import React, { createContext, useEffect, useState } from "react";
import products from "../products/products.json";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  // Obtener productos de localStorage
  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
  const [productsList, setProductsList] = useState(
    localStorageProducts || products
  );
  const localStorageCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(localStorageCart || []);

  // save products in localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productsList));
  }, [productsList]);

  //  add to cart
  const addToCart = (id) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === id);
      if (productInCart) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const product = productsList.products.find(
          (product) => product.id === id
        );
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // empty cart
  const clearCart = () => {
    setCart([]);
  };

  //
  // purchase function

  return (
    <DataContext.Provider
      value={{
        productsList,
        cart,
        addToCart,
        setProductsList,
        clearCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
