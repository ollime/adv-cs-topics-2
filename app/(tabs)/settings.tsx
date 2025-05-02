import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RadioSelect from "../../components/RadioSelect";
import TextField from "../../components/TextField";
import ToggleSwitch from "../../components/ToggleSwitch";

export default function secondPage() {
  const [darkMode, setDarkMode] = React.useState<"dark" | "light" | "system">();
  const [dateFormat, setDateFormat] = React.useState<string>("MM/DD/YYYY");

  const { setColorScheme } = useColorScheme();

  React.useEffect(() => {
    const loadData = async () => {
      const darkMode = await getData("darkMode");
      if (darkMode == "dark" || darkMode == "light" || darkMode == "system") {
        changeTheme(darkMode);
      }
    };
    loadData();
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

  function changeDateFormat(value: string) {
    setDateFormat(value);
  }

  function changeValue(value: boolean) {
    return value;
  }

  return (
    <View className="flex flex-1 bg-background p-2 dark:bg-backgroundDark">
      <RadioSelect
        label="Dark mode"
        options={["system", "light", "dark"]}
        onChangeOption={changeTheme}
        selected={darkMode}></RadioSelect>
      <TextField
        label="Date format preview"
        onChangeText={changeDateFormat}
        initialText={dateFormat}
        multiline={false}
        disabled={true}></TextField>
      <ToggleSwitch
        label="Leading Zero (month)"
        callback={(isEnabled: boolean) =>
          changeValue(isEnabled)
        }></ToggleSwitch>
    </View>
  );
}
