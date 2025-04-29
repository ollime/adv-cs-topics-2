import React from "react";
import { render } from "@testing-library/react-native";
import SecondPage from "../app/(tabs)/secondPage";

describe("<SecondPage/>", () => {
  test("Test renders correctly on secondPage", () => {
    const { getByText } = render(<SecondPage />);
    getByText("Test");
  });
});
