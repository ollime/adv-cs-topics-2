import React from "react";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import AddEvent from "../app/(tabs)/(main)/(date)/addEvent";

jest.mock("expo-font");

describe("<AddEvent/>", () => {
  const user = userEvent.setup();

  test("Renders pill buttons correctly", () => {
    const { getByRole } = render(<AddEvent />);
    waitFor(() => {
      getByRole("button", { name: "Confirm" });
      getByRole("button", { name: "Cancel" });
    });
  });

  test("Renders radio buttons correctly", async () => {
    const { getByRole } = render(<AddEvent />);
    const radio = getByRole("radio", { name: "since" });
    await user.press(radio);
    expect(radio).toBeChecked();
  });
});
