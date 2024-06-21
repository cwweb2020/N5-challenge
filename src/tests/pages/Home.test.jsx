// src/tests/Home.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/home";

// Mock de componentes
jest.mock("../../components/banner", () => () => (
  <div data-testid="banner">Mocked Banner</div>
));
jest.mock("../../components/productList", () => () => (
  <div data-testid="product-list">Mocked ProductList</div>
));

describe("Home Component", () => {
  test("renders Banner and ProductList components", () => {
    render(<Home />);

    const bannerElement = screen.getByTestId("banner");
    expect(bannerElement).toBeInTheDocument();

    const productListElement = screen.getByTestId("product-list");
    expect(productListElement).toBeInTheDocument();
  });
});
