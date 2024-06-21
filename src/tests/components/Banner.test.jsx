// src/tests/components/Banner.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Banner from "../../components/banner";

describe("Banner Component", () => {
  test("renders with default image", () => {
    render(<Banner />);

    const imgElement = screen.getByTestId("img-banner");
    expect(imgElement).toBeTruthy();
  });

  test("renders with custom image", () => {
    const customImg = "/img/custom-banner.jpg";
    render(<Banner imgBanner={customImg} />);

    const imgElement = screen.getByTestId("img-banner");
    expect(imgElement).toBeTruthy();
  });

  test("renders with correct text", () => {
    render(<Banner />);

    const textElement = screen.getByText("z market");
    expect(textElement).toBeTruthy();
  });
});
