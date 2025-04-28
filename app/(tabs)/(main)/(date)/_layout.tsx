/** @overview Layout for selectDate modal */

import React from "react";
import { Stack } from "expo-router";

export default function CalendarModalLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="addEvent"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="selectDate"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
