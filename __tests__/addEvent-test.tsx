import React from "react";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import AddEvent from "../app/(tabs)/(main)/(date)/addEvent";
import "expo-router/testing-library";

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

  test("Selects radio button option", async () => {
    const { getByRole } = render(<AddEvent />);
    const radio = getByRole("radio", { name: "since" });
    await user.press(radio);
    expect(radio).toBeChecked();
  });

  test("Edits text field", async () => {
    const { getByRole } = render(<AddEvent />);
    const textField = getByRole("adjustable", { name: "Event title" });
    await user.type(textField, "This is a test");
    expect(textField).toHaveDisplayValue("This is a test");
  });

  // test("Cancel button closes modal", async () => {
  //   const { getByRole } = render(<AddEvent />);
  //   const CancelBtn = getByRole("button", { name: "Cancel" });
  //   await user.press(CancelBtn);
  // });
});
