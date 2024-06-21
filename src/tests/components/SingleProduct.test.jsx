// src/tests/components/SingleProduct.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DataContext } from "../../context";
import SingleProduct from "../../components/singleProduct";

const renderWithContext = (contextValue, product) => {
  return render(
    <DataContext.Provider value={contextValue}>
      <SingleProduct product={product} />
    </DataContext.Provider>
  );
};

describe("SingleProduct Component", () => {
  const product = {
    id: 1,
    name: "Producto 1",
    amount: 5,
    price: 10,
    img: "/img1.jpg",
  };

  test("renders product details", () => {
    const contextValue = { addToCart: jest.fn() };
    renderWithContext(contextValue, product);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("10 $")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 5")).toBeInTheDocument();
    expect(screen.getByAltText("Producto 1")).toHaveAttribute(
      "src",
      "/img1.jpg"
    );
  });

  test("handles quantity change", () => {
    const contextValue = { addToCart: jest.fn() };
    renderWithContext(contextValue, product);

    const quantityInput = screen.getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(quantityInput.value).toBe("3");
  });

  test("adds product to cart", () => {
    const addToCart = jest.fn();
    const contextValue = { addToCart };
    renderWithContext(contextValue, product);

    window.alert = jest.fn();

    const addButton = screen.getByText("Agregar al carrito");
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith(1, 1);
    expect(window.alert).toHaveBeenCalledWith("Producto agregado al carrito");
  });

  test("disables button when product is out of stock", () => {
    const outOfStockProduct = { ...product, amount: 0 };
    const contextValue = { addToCart: jest.fn() };
    renderWithContext(contextValue, outOfStockProduct);

    const addButton = screen.getByText("Agregar al carrito");
    expect(addButton).toBeDisabled();
  });
});
