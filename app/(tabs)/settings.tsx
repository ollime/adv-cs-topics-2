import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import RadioSelect from "../../components/RadioSelect";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function secondPage() {
  const { setColorScheme } = useColorScheme();
  async function changeTheme(value: "dark" | "light" | "system" | string) {
    if (value == "dark" || value == "light" || value == "system") {
      setColorScheme(value);
      saveValue("theme", value);
      const newValue = await getData("theme");
      console.log(newValue);
    }
  }

  const saveValue = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="flex flex-1 bg-background dark:bg-backgroundDark">
      <RadioSelect
        label="Dark mode"
        options={["system", "light", "dark"]}
        onChangeOption={changeTheme}></RadioSelect>
    </View>
  );
}
