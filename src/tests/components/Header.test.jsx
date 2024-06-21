// src/tests/components/Header.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContext } from "../../context";
import Header from "../../components/header";

const renderWithContext = (contextValue) => {
  return render(
    <DataContext.Provider value={contextValue}>
      <Router>
        <Header />
      </Router>
    </DataContext.Provider>
  );
};

describe("Header Component", () => {
  test("renders with initial state", () => {
    const contextValue = { cart: [] };
    renderWithContext(contextValue);

    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.getByText("Agregar Producto")).toBeTruthy();
  });

  test("renders with items in cart", () => {
    const contextValue = {
      cart: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
      ],
    };
    renderWithContext(contextValue);

    const totalItems = screen.getByText("5");
    expect(totalItems).toBeTruthy();
  });

  test("renders links correctly", () => {
    const contextValue = { cart: [] };
    renderWithContext(contextValue);

    const homeLink = screen.getByText("Inicio");
    const addProductLink = screen.getByText("Agregar Producto");
    const cartLink = screen.getByTestId("cart-icon");

    expect(homeLink).toBeTruthy();
    expect(addProductLink).toBeTruthy();
    expect(cartLink).toBeTruthy();
  });
});
