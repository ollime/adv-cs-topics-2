/** Settings page.
 *
 * The settings page stores persistent data across app sessions
 * by storing key-value pairs in AsyncStorage. This file handles
 * setting these values, the UI changes associated with changing
 * values, and retrieval/storage of AsyncStorage data.
 *
 * These values are also available in other files that use
 * AsyncStorage for using the data stored.
 */

import React from "react";
import { View, Platform } from "react-native";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RadioSelect from "../../components/inputFields/RadioSelect";
import TextField from "../../components/inputFields/TextField";
import ToggleSwitch from "../../components/inputFields/ToggleSwitch";

import { formatDate } from "../../utils/DateTimeCalculation";
import { createDatabase } from "../../models/database";

export default function secondPage() {
  /** Background & text color of the page */
  const [darkMode, setDarkMode] = React.useState<"dark" | "light" | "system">();
  /** A string representing how dates will be stored. This string is also displayed for the user on the UI */
  const [dateFormat, setDateFormat] = React.useState<string>();
  /** @example Long year format is 2025, short year is 25*/
  const [longYearFormat, setLongYearFormat] = React.useState<boolean>(false);
  /** Stores the format of the month.
   * @example
   *    2-digit - 03
   *    numeric - 3
   *    long - March
   *    short - Mar
   */
  const [monthFormat, setMonthFormat] = React.useState<
    "2-digit" | "numeric" | "long" | "short" | "narrow"
  >("numeric");
  /** @example Long day format is 05, short day is 5 */
  const [longDayFormat, setLongDayFormat] = React.useState<boolean>(false);

  const { setColorScheme } = useColorScheme();

  /** Loads initial data from AsyncStorage */
  React.useEffect(() => {
    const loadData = async () => {
      const darkMode = await getData("darkMode");
      if (darkMode == "dark" || darkMode == "light" || darkMode == "system") {
        changeTheme(darkMode);
      }
      const longYearFormat = await getData("longYearFormat");
      const longDayFormat = await getData("longDayFormat");
      const monthFormat = await getData("monthFormat");
      setLongYearFormat(longYearFormat === "true");
      setLongDayFormat(longDayFormat === "true");
      if (
        // type checking
        monthFormat == "2-digit" ||
        monthFormat == "numeric" ||
        monthFormat == "long" ||
        monthFormat == "short" ||
        monthFormat == "narrow"
      ) {
        setMonthFormat(
          monthFormat as "2-digit" | "numeric" | "long" | "short" | "narrow"
        );
      }
    };
    loadData();
  }, []);

  /** If any of the 3 date format options change, change the display text
   * for the full date format string.
   */
  React.useEffect(() => {
    changeDateFormat();
  }, [longYearFormat, monthFormat, longDayFormat]);

  /** Creates the database. If it already exists, initializes database object */
  React.useEffect(() => {
    if (Platform.OS === "android") {
      (async () => {
        try {
          await createDatabase();
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

  /** Save a key-value pair to storage. */
  const saveInStorage = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  /** Retrieve a key-value pair from storage. */
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

  /** Changes the theme and saves the value to the database */
  async function changeTheme(value: "dark" | "light" | "system" | string) {
    if (value == "dark" || value == "light" || value == "system") {
      setColorScheme(value);
      setDarkMode(value);
      saveInStorage("darkMode", value);
    }
  }

  /** Updates the date format */
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
    setDateFormat(formatDate(new Date(36184 * 1000), options));
  }

  /** Sets the month format */
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
    saveInStorage("monthFormat", newFormat);
  }

  /** Sets the year format */
  function handleSetYearFormat(isEnabled: boolean) {
    setLongYearFormat(isEnabled);
    saveInStorage("longYearFormat", String(isEnabled));
  }

  /** Sets the day format */
  function handleSetDayFormat(isEnabled: boolean) {
    setLongDayFormat(isEnabled);
    saveInStorage("longDayFormat", String(isEnabled));
  }

  /** Converts between display and stored value of the month format */
  function getInitialMonth() {
    let value: string = "";
    if (monthFormat == "2-digit") {
      value = "MM";
    } else if (monthFormat == "long") {
      value = "Month";
    } else if (monthFormat == "short") {
      value = "mon";
    } else if (monthFormat == "numeric") {
      value = "M";
    }
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
      <View className="m-4">
        <RadioSelect
          label="Month format"
          options={["M", "MM", "Month", "Mon"]}
          onChangeOption={(value: string) => {
            handleSetMonthFormat(value);
          }}
          selected={getInitialMonth()}></RadioSelect>
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
