import React from "react";
import { View, Text, Pressable } from "react-native";
import Gradient from "./Gradient";

/**
 * Creates a pill-shaped button with a gradient background.
 * @param label Label on the button
 * @param callback Callback function called when the button is pressed
 */
export function FilledPill({
  label,
  callback,
}: {
  label: string;
  callback: () => void;
}) {
  return (
    <>
      <View className="m-2 min-h-[40px] min-w-[100px] rounded-full shadow-md shadow-indigo-500/50">
        <View className="min-h-[40px] min-w-[100px] overflow-hidden rounded-full">
          <Pressable
            onPress={() => callback()}
            accessibilityRole="button"
            accessibilityLabel={label}>
            <Gradient>
              <View className="min-h-[40px] min-w-[100px] items-center justify-center px-2">
                <Text className="select-none px-2 font-medium text-white">
                  {label}
                </Text>
              </View>
            </Gradient>
          </Pressable>
        </View>
      </View>
    </>
  );
}

/**
 * Creates an outlined pill-shaped button with a white background.
 * @param label Label on the button
 * @param callback Callback function called when the button is pressed
 */
export function OutlinedPill({
  label,
  callback,
}: {
  label: string;
  callback: () => void;
}) {
  return (
    <>
      <View className="m-2 h-[36px] w-[100px] rounded-full shadow-md shadow-indigo-500/50 outline outline-primary">
        <View className="h-[36px] w-[100px] overflow-hidden rounded-full bg-white">
          <Pressable
            onPress={() => callback()}
            accessibilityRole="button"
            accessibilityLabel={label}>
            <View className="h-[36px] w-[100px] items-center justify-center">
              <Text className="select-none font-medium text-primary">
                {label}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}
