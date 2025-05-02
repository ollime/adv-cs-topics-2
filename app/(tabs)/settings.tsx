import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import RadioSelect from "../../components/RadioSelect";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function secondPage() {
  const [darkMode, setDarkMode] = React.useState<"dark" | "light" | "system">();
  const { setColorScheme } = useColorScheme();

  React.useEffect(() => {
    const fetchData = async () => {
      const darkMode = await getData("darkMode");
      if (darkMode == "dark" || darkMode == "light" || darkMode == "system") {
        changeTheme(darkMode);
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
      setDarkMode(value);
      saveInStorage("darkMode", value);
    }
  }

  return (
    <View className="flex flex-1 bg-background dark:bg-backgroundDark">
      <RadioSelect
        label="Dark mode"
        options={["system", "light", "dark"]}
        onChangeOption={changeTheme}
        selected={darkMode}></RadioSelect>
    </View>
  );
}
