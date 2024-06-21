// src/tests/components/ProductList.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { DataContext } from "../../context";
import ProductList from "../../components/productList";
import SingleProduct from "../../components/singleProduct";

// Mock del componente SingleProduct para evitar dependencias complejas en esta prueba
jest.mock("../../components/SingleProduct", () => ({ product }) => (
  <div data-testid="single-product">{product.name}</div>
));

const renderWithContext = (contextValue) => {
  return render(
    <DataContext.Provider value={contextValue}>
      <ProductList />
    </DataContext.Provider>
  );
};

describe("ProductList Component", () => {
  test("renders with empty products list", () => {
    const contextValue = { productsList: [] };
    renderWithContext(contextValue);

    expect(screen.getByText("Lista de Productos")).toBeInTheDocument();
    expect(screen.queryByTestId("single-product")).not.toBeInTheDocument();
  });

  test("renders with products in list", () => {
    const contextValue = {
      productsList: [
        { id: 1, name: "Producto 1", price: 10, quantity: 2, img: "/img1.jpg" },
        { id: 2, name: "Producto 2", price: 20, quantity: 1, img: "/img2.jpg" },
      ],
    };
    renderWithContext(contextValue);

    expect(screen.getByText("Lista de Productos")).toBeInTheDocument();
    expect(screen.getAllByTestId("single-product")).toHaveLength(2);
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
  });
});
