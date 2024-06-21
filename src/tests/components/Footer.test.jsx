import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/footer";

describe("FooterComponent", () => {
  test("renders correctly", () => {
    render(<Footer />);
    expect(screen.getByText("Trabajo realizado por C.M F.")).toBeTruthy();
  });
});
