import React from "react";
import { View, Text, Pressable } from "react-native";
import Gradient from "./Gradient";

/**
 * Creates a pill-shaped button.
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
      <View className="m-2 h-[40px] w-[100px] rounded-full shadow-md shadow-indigo-500/50">
        <View className="h-[40px] w-[100px] overflow-hidden rounded-full">
          <Pressable onPress={() => callback()}>
            <Gradient>
              <View className="h-[40px] w-[100px] items-center justify-center">
                <Text className="select-none font-medium text-white">
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
          <Pressable onPress={() => callback()}>
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
