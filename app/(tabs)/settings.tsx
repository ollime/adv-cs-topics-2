import React from "react";
import { View, Platform } from "react-native";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RadioSelect from "../../components/RadioSelect";
import TextField from "../../components/TextField";
import ToggleSwitch from "../../components/ToggleSwitch";

import { formatDate } from "../../utils/DateTimeCalculation";
import { createDatabase, getRow } from "../../models/database";

if (Platform.OS !== "web") {
  try {
    createDatabase();
    // alert(getRow());
  } catch (err) {
    alert(err);
  }
}

export default function secondPage() {
  const [darkMode, setDarkMode] = React.useState<"dark" | "light" | "system">();
  const [dateFormat, setDateFormat] = React.useState<string>();
  // const [dateOptions, setDateOptions] =
  //   React.useState<Intl.DateTimeFormatOptions>();
  const [longYearFormat, setLongYearFormat] = React.useState<boolean>(false);
  const [monthFormat, setMonthFormat] = React.useState<
    "2-digit" | "numeric" | "long" | "short" | "narrow"
  >("numeric");
  const [longDayFormat, setLongDayFormat] = React.useState<boolean>(false);

  const { setColorScheme } = useColorScheme();
  // TODO: save longYearFormat

  React.useEffect(() => {
    const loadData = async () => {
      const darkMode = await getData("darkMode");
      if (darkMode == "dark" || darkMode == "light" || darkMode == "system") {
        changeTheme(darkMode);
      }
      const longYearFormat = await getData("longYearFormat");
      const longDayFormat = await getData("longDayFormat");
      setLongYearFormat(longYearFormat === "true");
      setLongDayFormat(longDayFormat === "true");
    };
    loadData();
  }, []);

  React.useEffect(() => {
    changeDateFormat();
  }, [longYearFormat, monthFormat, longDayFormat]);

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

  async function changeDateFormat() {
    const options: Intl.DateTimeFormatOptions = {
      hour12: false,
      year: longYearFormat ? "numeric" : "2-digit",
      month: monthFormat,
      day: longDayFormat ? "2-digit" : "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    // setDateOptions(options);
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

  function handleSetYearFormat(isEnabled: boolean) {
    setLongYearFormat(isEnabled);
    saveInStorage("longYearFormat", String(isEnabled));
  }

  function handleSetDayFormat(isEnabled: boolean) {
    setLongDayFormat(isEnabled);
    saveInStorage("longDayFormat", String(isEnabled));
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
          callback={(isEnabled: boolean) => handleSetDayFormat(isEnabled)}
          selected={longDayFormat}></ToggleSwitch>
        <ToggleSwitch
          label="Long form (year)"
          callback={(isEnabled: boolean) => handleSetYearFormat(isEnabled)}
          selected={longYearFormat}></ToggleSwitch>
      </View>
    </View>
  );
}
