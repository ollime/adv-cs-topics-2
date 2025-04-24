import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import RadioSelect from "../../components/RadioSelect";

export default function secondPage() {
  const { setColorScheme } = useColorScheme();
  function changeTheme(value: "dark" | "light" | "system") {
    console.log(value);
    setColorScheme(value);
  }

  return (
    <View className="flex flex-1 bg-background dark:bg-backgroundDark">
      <RadioSelect
        label="Dark mode"
        options={["system", "light", "dark"]}
        onChangeOption={changeTheme}></RadioSelect>
    </View>
  );
}
