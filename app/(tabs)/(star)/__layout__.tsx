/** @overview Layout for addEvent modal. */

import React from "react";
import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="starEvent"
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
