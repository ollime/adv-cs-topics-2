import React from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import Settings from "../app/(tabs)/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-router/testing-library";

jest.mock("expo-font");

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("nativewind", () => ({
  ...jest.requireActual("nativewind"),
  useColorScheme: jest.fn(() => ({
    setColorScheme: jest.fn(),
  })),
}));

describe("<Settings/>", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls and instances
    return AsyncStorage.clear();
  });

  test("Async Storage works", async () => {
    await AsyncStorage.setItem("currentUser", "value");
    await AsyncStorage.getItem("currentUser");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("currentUser");
  });

  test("Dark mode is loaded on page load", async () => {
    await AsyncStorage.setItem("darkMode", "dark");
    render(<Settings />);
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("darkMode");
    });
  });

  test("Radio button changes based on dark mode", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");
    render(<Settings />);

    await waitFor(() => {
      const darkModeRadioSelect = screen.getByRole("radio", { name: "dark" });
      expect(darkModeRadioSelect).toBeChecked();
    });
  });

  test("Month format displays correctly", async () => {
    render(<Settings />);

    await waitFor(async () => {
      const monthFormatRadio = screen.getByRole("radio", { name: "MM" });
      const textFormat = screen.getByRole("adjustable", {
        name: "Date format preview",
      });
      await user.press(monthFormatRadio);
      expect(textFormat).toHaveDisplayValue("01/1/1970, 02:03:04");
    });
  });

  test("Year format displays correctly", async () => {
    render(<Settings />);

    await waitFor(async () => {
      const yearFormatSwitch = screen.getByRole("switch", {
        name: "Long form (year)",
      });
      const textFormat = screen.getByRole("adjustable", {
        name: "Date format preview",
      });
      await user.press(yearFormatSwitch);
      expect(textFormat).toHaveDisplayValue("1/1/1970, 02:03:04");
    });
  });

  test("Day format displays correctly", async () => {
    render(<Settings />);

    await waitFor(async () => {
      const dayFormatSwitch = screen.getByRole("switch", {
        name: "Leading zero (day)",
      });
      const textFormat = screen.getByRole("adjustable", {
        name: "Date format preview",
      });
      await user.press(dayFormatSwitch);
      expect(textFormat).toHaveDisplayValue("1/01/70, 02:03:04");
    });
  });
});
