import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import RadioSelect from "../../components/RadioSelect";

export default function secondPage() {
  const { setColorScheme } = useColorScheme();
  setColorScheme("dark");

  return (
    <View className="dark:bg-backgroundDark flex flex-1 bg-background">
      <RadioSelect label="Dark mode"></RadioSelect>
    </View>
  );
}
