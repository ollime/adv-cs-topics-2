import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";

export default function secondPage() {
  const { setColorScheme } = useColorScheme();
  setColorScheme("dark");

  return (
    <View className="dark:bg-backgroundDark flex flex-1 bg-background">
      <Text>Settings</Text>
    </View>
  );
}
