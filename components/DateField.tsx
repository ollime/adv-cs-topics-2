import React from "react";
import { View, Text } from "react-native";

export default function DateField({ label }: { label: string }) {
  return (
    <>
      <View className="m-2 flex flex-row items-center justify-center">
        <Text className="m-2">{label}</Text>
        <Text>Work in progress</Text>
      </View>
    </>
  );
}
