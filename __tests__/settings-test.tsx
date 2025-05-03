import React from "react";
import {
  render,
  screen,
  // userEvent,
  waitFor,
} from "@testing-library/react-native";
import Settings from "../app/(tabs)/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  // const user = userEvent.setup();

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
    AsyncStorage.setItem("darkMode", "dark");
    render(<Settings />);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("darkMode");
  });

  test("Radio button changes based on dark mode", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");
    render(<Settings />);

    await waitFor(() => {
      const darkModeRadioSelect = screen.getByRole("radio", { name: "dark" });
      expect(darkModeRadioSelect).toBeChecked();
    });
  });

  // test("Date format text displays correctly", async () => {
  //   render(<Settings />);

  //   await waitFor(() => {
  //     // const monthFormatRadio = screen.getByRole("radio", { name: "Month" });
  //     // const yearFormatSwitch = screen.getByRole("switch", {
  //     //   name: "Long form (year)",
  //     // });
  //     // user.press(monthFormatRadio);
  //     // user.press(yearFormatSwitch);
  //   });
  // });
});
