/** @overview Root layout for the app */

import React from "react";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";

import "./../global.css";

export default function App() {
  const { setColorScheme } = useColorScheme();

  /** Global color scheme */
  React.useEffect(() => {
    const setThemeColor = async () => {
      const theme = await getThemeData();
      if (theme == "dark" || theme == "light" || theme == "system") {
        setColorScheme(theme);
      }
    };
    setThemeColor();
  }, []);

  /** Retrieves existing theme */
  const getThemeData = async () => {
    try {
      const value = await AsyncStorage.getItem("darkMode");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}></Stack.Screen>
      </Stack>
    </>
  );
}
