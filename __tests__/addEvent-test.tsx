/** @overview Tests for the addEvent page.
 *
 * Tests that buttons render correctly when the page loads.
 *
 * Most of the Jest functions have descriptions built into the
 * test function / describe block itself. Anything more complicated
 * will be documented with a comment.
 */

import React from "react";
import {
  render,
  userEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import AddEvent from "../app/(tabs)/(main)/(date)/addEvent";
import "expo-router/testing-library";

jest.mock("expo-font");

describe("<AddEvent/>", () => {
  const user = userEvent.setup();

  test("Renders pill buttons correctly", () => {
    render(<AddEvent />);
    waitFor(() => {
      screen.getByRole("button", { name: "Confirm" });
      screen.getByRole("button", { name: "Cancel" });
    });
  });

  test("Selects radio button option", async () => {
    render(<AddEvent />);
    const radio = screen.getByRole("radio", { name: "since" });
    await user.press(radio);
    expect(radio).toBeChecked();
  });

  test("Edits text field", async () => {
    render(<AddEvent />);
    const textField = screen.getByRole("adjustable", { name: "Event title" });
    await user.type(textField, "This is a test");
    expect(textField).toHaveDisplayValue("This is a test");
  });
});
