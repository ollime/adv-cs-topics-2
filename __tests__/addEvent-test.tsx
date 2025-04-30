import React from "react";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import AddEvent from "../app/(tabs)/(main)/(date)/addEvent";

jest.mock("expo-font");

describe("<AddEvent/>", () => {
  test("Buttons rendered correctly", () => {
    const { getByRole } = render(<AddEvent />);
    waitFor(() => {
      getByRole("button", { name: "Confirm" });
      getByRole("button", { name: "Cancel" });
    });
  });

  // const user = userEvent.setup();
});
