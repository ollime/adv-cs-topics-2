/** @overview Layout for addEvent modal. */

import React from "react";
import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="events"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(date)"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="confirmOverride"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="testModal"
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
