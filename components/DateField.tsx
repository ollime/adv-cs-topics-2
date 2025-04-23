import React from "react";
import { View, Text } from "react-native";

export default function DateField({ label }: { label: string }) {
  return (
    <>
      <View className="m-2 flex flex-row items-center justify-center">
        <Text className="m-2 dark:text-white">{label}</Text>
        <Text className="dark:text-white">Work in progress</Text>
      </View>
    </>
  );
}
