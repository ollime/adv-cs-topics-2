import React from "react";
import { View, Text, Pressable } from "react-native";
import Gradient from "./Gradient";

/**
 * Creates a pill-shaped button.
 * @param label Label on the button
 * @param callback Callback function called when the button is pressed
 * @returns
 */
export default function PillButton({
  label,
  callback,
}: {
  label: string;
  callback: () => void;
}) {
  return (
    <>
      <View className="m-2 h-[50px] w-[100px] overflow-hidden rounded-full">
        <Pressable onPress={() => callback()}>
          <Gradient>
            <View className="h-[50px] w-[100px] items-center justify-center">
              <Text className="select-none font-medium text-white">
                {label}
              </Text>
            </View>
          </Gradient>
        </Pressable>
      </View>
    </>
  );
}
