import React from "react";
import { render, screen } from "@testing-library/react-native";
import SecondPage from "../app/(tabs)/secondPage";

describe("<SecondPage/>", () => {
  test("Test renders correctly on secondPage", () => {
    render(<SecondPage />);
    expect(screen.getByRole("text")).toHaveTextContent("Test");
  });
});
