// src/context/DataContext.js
import React, { createContext, useEffect, useState } from "react";
import productsData from "../products/products.json";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const productsListArray = productsData.products;

  // get from localStorage data
  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
  const [productsList, setProductsList] = useState(
    localStorageProducts || productsListArray
  );

  const localStorageCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(localStorageCart || []);

  // save products in localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productsList));
  }, [productsList]);

  // add to cart
  const addToCart = (id, quantity) => {
    setCart((prevCart) => {
      const productInCartIndex = prevCart.findIndex((item) => item.id === id);

      if (productInCartIndex !== -1) {
        // update quantity
        const updatedCart = [...prevCart];
        updatedCart[productInCartIndex].quantity += quantity;
        return updatedCart;
      } else {
        // add new product
        const productToAdd = productsList.find((product) => product.id === id);
        return [...prevCart, { ...productToAdd, quantity }];
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
  const purchaseCart = () => {
    setProductsList((prevProducts) =>
      prevProducts.map((product) => {
        const itemInCart = cart.find((item) => item.id === product.id);
        if (itemInCart) {
          return { ...product, amount: product.amount - itemInCart.quantity };
        }
        return product;
      })
    );
    clearCart();
  };

  return (
    <DataContext.Provider
      value={{
        productsList,
        cart,
        addToCart,
        setProductsList,
        clearCart,
        purchaseCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
