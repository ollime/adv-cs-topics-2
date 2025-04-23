import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import RadioSelect from "../../components/RadioSelect";

export default function secondPage() {
  const { setColorScheme } = useColorScheme();
  setColorScheme("dark");

  return (
    <View className="flex flex-1 bg-background dark:bg-backgroundDark">
      <RadioSelect
        label="Dark mode"
        options={["dark", "light", "automatic"]}></RadioSelect>
    </View>
  );
}
