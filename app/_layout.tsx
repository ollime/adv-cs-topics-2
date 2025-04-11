/** @overview Root layout for the app */

import React from "react";
import { Stack } from "expo-router";

import "./../global.css";

export default function App() {
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
