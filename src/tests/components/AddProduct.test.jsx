// src/components/AddProduct/AddProduct.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddProduct from "../../components/addNewProduct";
import { DataContext } from "../../context";

// Mock DataContext
const setProductsList = jest.fn();

const renderWithContext = (component) => {
  return render(
    <DataContext.Provider value={{ setProductsList }}>
      {component}
    </DataContext.Provider>
  );
};

describe("AddProduct Component", () => {
  beforeEach(() => {
    setProductsList.mockClear();
  });

  test("renders correctly", () => {
    renderWithContext(<AddProduct />);
    expect(screen.getByText("Agregar Nuevo Producto")).toBeInTheDocument();
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Precio")).toBeInTheDocument();
    expect(screen.getByText("Cantidad")).toBeInTheDocument();
    expect(screen.getByText("Imagen URL")).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    renderWithContext(<AddProduct />);
    const nameInput = screen.getByTestId("name-input");
    const priceInput = screen.getByTestId("price-input");
    const amountInput = screen.getByTestId("amount-input");
    const imgInput = screen.getByTestId("img-input");

    fireEvent.change(nameInput, {
      target: { value: "Test Product", name: "name" },
    });
    fireEvent.change(priceInput, { target: { value: "100", name: "price" } });
    fireEvent.change(amountInput, { target: { value: "10", name: "amount" } });
    fireEvent.change(imgInput, {
      target: { value: "http://example.com/image.png", name: "img" },
    });

    expect(nameInput.value).toBe("Test Product");
    expect(priceInput.value).toBe("100");
    expect(amountInput.value).toBe("10");
    expect(imgInput.value).toBe("http://example.com/image.png");
  });

  test("submits form and updates context", () => {
    renderWithContext(<AddProduct />);
    const nameInput = screen.getByTestId("name-input");
    const priceInput = screen.getByTestId("price-input");
    const amountInput = screen.getByTestId("amount-input");
    const imgInput = screen.getByTestId("img-input");
    const submitButton = screen.getByTestId("submit-btn");

    fireEvent.change(nameInput, {
      target: { value: "Test Product", name: "name" },
    });
    fireEvent.change(priceInput, { target: { value: "100", name: "price" } });
    fireEvent.change(amountInput, { target: { value: "10", name: "amount" } });
    fireEvent.change(imgInput, {
      target: { value: "http://example.com/image.png", name: "img" },
    });

    fireEvent.click(submitButton);

    expect(setProductsList).toHaveBeenCalledWith(expect.any(Function));
    expect(setProductsList.mock.calls[0][0]([])).toEqual([
      {
        name: "Test Product",
        price: 100,
        amount: 10,
        img: "http://example.com/image.png",
        id: 1,
      },
    ]);

    expect(nameInput.value).toBe("");
    expect(priceInput.value).toBe("");
    expect(amountInput.value).toBe("");
    expect(imgInput.value).toBe("");
  });
});
