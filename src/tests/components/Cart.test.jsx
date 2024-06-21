// src/tests/components/Cart.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataContext } from "../../context";
import Cart from "../../components/cart";

const renderWithContext = (contextValue) => {
  return render(
    <DataContext.Provider value={contextValue}>
      <Cart />
    </DataContext.Provider>
  );
};

describe("Cart Component", () => {
  test("renders with empty cart", () => {
    const contextValue = {
      cart: [],
      clearCart: jest.fn(),
      purchaseCart: jest.fn(),
    };
    renderWithContext(contextValue);

    expect(screen.getByText("Carrito de Compras")).toBeInTheDocument();
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    expect(screen.getByText("Total: 0 $")).toBeInTheDocument();
  });

  test("renders with items in cart and calculates total", () => {
    const contextValue = {
      cart: [
        { id: 1, name: "Producto 1", price: 10, quantity: 2, img: "/img1.jpg" },
        { id: 2, name: "Producto 2", price: 20, quantity: 1, img: "/img2.jpg" },
      ],
      clearCart: jest.fn(),
      purchaseCart: jest.fn(),
    };
    renderWithContext(contextValue);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Precio: 10 $")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();

    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    expect(screen.getByText("Precio: 20 $")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();

    expect(screen.getByText("Total: 40 $")).toBeInTheDocument();
  });

  test("clearCart button works", () => {
    const clearCart = jest.fn();
    const contextValue = {
      cart: [
        { id: 1, name: "Producto 1", price: 10, quantity: 2, img: "/img1.jpg" },
      ],
      clearCart,
      purchaseCart: jest.fn(),
    };
    renderWithContext(contextValue);

    fireEvent.click(screen.getByText("Limpiar"));
    expect(clearCart).toHaveBeenCalled();
  });

  test("purchaseCart button works", () => {
    const purchaseCart = jest.fn();
    const contextValue = {
      cart: [
        { id: 1, name: "Producto 1", price: 10, quantity: 2, img: "/img1.jpg" },
      ],
      clearCart: jest.fn(),
      purchaseCart,
    };
    renderWithContext(contextValue);

    fireEvent.click(screen.getByText("Comprar"));
    expect(purchaseCart).toHaveBeenCalled();
  });
});
