/** @overview Tests the main functions of the Settings page.
 *
 * All inputs on the Settings page are tested for: 1.) Retrieving
 * data on page load 2.) UI change when changing input value and
 * 3.) Data saved to storage when changing input value.
 */

import React from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
  fireEvent,
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
    return AsyncStorage.clear(); // Clear Async Storage before each test to ensure clean db each time
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
      expect(textFormat).toHaveDisplayValue("01/1/70, 02:03:04");
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
      fireEvent(yearFormatSwitch, "onValueChange", true);
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
      fireEvent(dayFormatSwitch, "onValueChange", true);
      expect(textFormat).toHaveDisplayValue("1/01/70, 02:03:04");
    });
  });

  test("Year format is saved to storage", async () => {
    render(<Settings />);

    await waitFor(async () => {
      const yearFormatSwitch = screen.getByRole("switch", {
        name: "Long form (year)",
      });
      fireEvent(yearFormatSwitch, "onValueChange", true);
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "longYearFormat",
        "true"
      );
    });
  });

  test("Year format is retrieved from storage", async () => {
    await AsyncStorage.setItem("longYearFormat", "true");
    render(<Settings />);
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("longYearFormat");
    });
  });

  test("Year format is displayed from storage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("true");
    render(<Settings />);
    await waitFor(() => {
      const yearFormatSwitch = screen.getByRole("switch", {
        name: "Long form (year)",
      });
      expect(yearFormatSwitch).toBeChecked();
    });
  });

  test("Day format is displayed from storage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("true");
    render(<Settings />);
    await waitFor(() => {
      const dayFormatSwitch = screen.getByRole("switch", {
        name: "Leading zero (day)",
      });
      expect(dayFormatSwitch).toBeChecked();
    });
  });

  test("Month format is displayed from storage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("2-digit");
    render(<Settings />);
    await waitFor(() => {
      const monthFormatRadio = screen.getByRole("radio", { name: "MM" });
      expect(monthFormatRadio).toBeChecked();
    });
  });
});
