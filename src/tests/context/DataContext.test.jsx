import React from "react";
import { render, act } from "@testing-library/react";
import { DataProvider, DataContext } from "../../context";
import productsData from "../../products/products.json";

describe("DataContext", () => {
  let localStorageMock;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = (function () {
      let store = {};
      return {
        getItem: function (key) {
          return store[key] || null;
        },
        setItem: function (key, value) {
          store[key] = value.toString();
        },
        clear: function () {
          store = {};
        },
        removeItem: function (key) {
          delete store[key];
        },
      };
    })();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it("should provide initial products and cart from localStorage", () => {
    localStorage.setItem("products", JSON.stringify(productsData.products));
    localStorage.setItem("cart", JSON.stringify([{ id: 1, quantity: 2 }]));

    let productsList, cart;

    render(
      <DataProvider>
        <DataContext.Consumer>
          {(value) => {
            productsList = value.productsList;
            cart = value.cart;
            return null;
          }}
        </DataContext.Consumer>
      </DataProvider>
    );

    expect(productsList).toEqual(productsData.products);
    expect(cart).toEqual([{ id: 1, quantity: 2 }]);
  });

  it("should add items to the cart", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(DataContext);
      return null;
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    act(() => {
      contextValue.addToCart(1, 2);
    });

    expect(contextValue.cart).toEqual([
      { ...productsData.products[0], quantity: 2 },
    ]);
  });

  it("should clear the cart", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(DataContext);
      return null;
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    act(() => {
      contextValue.addToCart(1, 2);
      contextValue.clearCart();
    });

    expect(contextValue.cart).toEqual([]);
  });

  it("should purchase the cart", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(DataContext);
      return null;
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    act(() => {
      contextValue.addToCart(1, 2);
      contextValue.purchaseCart();
    });

    expect(contextValue.cart).toEqual([]);
  });
});
