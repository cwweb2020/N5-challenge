// src/tests/context/DataContext.test.jsx
import React from "react";
import { render } from "@testing-library/react";
import { DataContext, DataProvider } from "../../context";
import productsData from "../../products/products.json";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("DataContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("purchases cart and updates products list", async () => {
    let result;

    // Renderizamos el componente con el contexto
    result = render(
      <DataContext.Provider value={DataProvider}>
        <DataProvider />
      </DataContext.Provider>
    );

    // Esperamos a que se complete la actualización después de addToCart y purchaseCart
    await Promise.resolve();

    // Accedemos a los valores proporcionados por DataProvider
    const { addToCart, purchaseCart, productsList } = result.contextType;

    // Realizamos las operaciones directamente
    addToCart(1, 2);
    purchaseCart();

    // Aseguramos que las actualizaciones se reflejen correctamente
    const updatedProduct = productsData.products.find(
      (product) => product.id === 1
    );
    updatedProduct.amount -= 2;

    expect(productsList).toEqual([
      updatedProduct,
      ...productsData.products.filter((product) => product.id !== 1),
    ]);
    expect(result.contextType.cart).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([]);
  });
});
