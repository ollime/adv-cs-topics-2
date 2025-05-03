import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RadioSelect from "../../components/RadioSelect";
import TextField from "../../components/TextField";
import ToggleSwitch from "../../components/ToggleSwitch";

import { formatDate } from "../../utils/DateTimeCalculation";

export default function secondPage() {
  const [darkMode, setDarkMode] = React.useState<"dark" | "light" | "system">();
  const [dateFormat, setDateFormat] = React.useState<string>();
  const [dateOptions, setDateOptions] =
    React.useState<Intl.DateTimeFormatOptions>();
  const [shortYearFormat, setShortYearFormat] = React.useState<boolean>(true);
  const [monthFormat, setMonthFormat] = React.useState<
    "2-digit" | "numeric" | "long" | "short" | "narrow"
  >("numeric");
  const [longDayFormat, setLongDayFormat] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    console.log("longDayFormat updated:", longDayFormat);
    console.log("Triggering changeDateFormat");
    changeDateFormat();
  }, [shortYearFormat, monthFormat, longDayFormat]);

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

  function changeDateFormat() {
    const options: Intl.DateTimeFormatOptions = {
      hour12: false,
      year: shortYearFormat ? "numeric" : "2-digit",
      month: monthFormat,
      day: longDayFormat ? "2-digit" : "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    setDateOptions(options);
    setDateFormat(formatDate(new Date(36184 * 1000), options));
  }

  function handleSetMonthFormat(value: string) {
    let newFormat: "numeric" | "2-digit" | "long" | "short" = "numeric";
    if (value == "MM") {
      newFormat = "2-digit";
    } else if (value == "Month") {
      newFormat = "long";
    } else if (value == "Mon") {
      newFormat = "short";
    }

    setMonthFormat(newFormat);
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
      <View className="m-4">
        <RadioSelect
          label="Month format"
          options={["M", "MM", "Month", "Mon"]}
          onChangeOption={(value: string) => {
            handleSetMonthFormat(value);
          }}
          selected={darkMode}></RadioSelect>
        <ToggleSwitch
          label="Leading zero (day)"
          callback={(isEnabled: boolean) =>
            setLongDayFormat(isEnabled)
          }></ToggleSwitch>
        <ToggleSwitch
          label="Long form (year)"
          callback={(isEnabled: boolean) =>
            setShortYearFormat(isEnabled)
          }></ToggleSwitch>
      </View>
    </View>
  );
}
