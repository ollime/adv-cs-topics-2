import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import RadioSelect from "../../components/RadioSelect";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function secondPage() {
  const [themeColor, setThemeColor] = React.useState<
    "dark" | "light" | "system"
  >();
  const { setColorScheme } = useColorScheme();

  React.useEffect(() => {
    const fetchData = async () => {
      const theme = await getData("theme");
      if (theme == "dark" || theme == "light" || theme == "system") {
        changeTheme(theme);
      }
    };
    fetchData();
  }, []);

  const saveInStorage = async (key: string, value: string) => {
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

  async function changeTheme(value: "dark" | "light" | "system" | string) {
    if (value == "dark" || value == "light" || value == "system") {
      setColorScheme(value);
      setThemeColor(value);
      saveInStorage("theme", value);
    }
  }

  return (
    <View className="flex flex-1 bg-background dark:bg-backgroundDark">
      <RadioSelect
        label="Dark mode"
        options={["system", "light", "dark"]}
        onChangeOption={changeTheme}
        selected={themeColor}></RadioSelect>
    </View>
  );
}
