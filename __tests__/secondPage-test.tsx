import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import SecondPage from "../app/(tabs)/secondPage";

describe("<SecondPage/>", () => {
  test("Test renders correctly on secondPage", async () => {
    const { getByText } = render(<SecondPage />);
    waitFor(() => {
      getByText("Test");
    });
  });
});
