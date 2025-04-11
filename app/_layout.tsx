import React from "react";
import { Stack } from "expo-router";
import NavBar from "./../components/NavBar";

import "./../global.css";

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen
          name="secondPage"
          options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen
          name="settings"
          options={{ headerShown: false }}></Stack.Screen>
      </Stack>
    </>
  );
}
