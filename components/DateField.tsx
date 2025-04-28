/** Displays the currently selected date. */

import React from "react";
import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function DateField({
  label,
  type,
  time,
  disabled,
  openDatePicker,
}: {
  // visual text to display
  label: string;
  // type describing the time value stored
  type: "startTime" | "endTime" | string;
  time: number;
  disabled: boolean;
  openDatePicker: (type: string) => void;
}) {
  const [date, setDate] = React.useState<number>(time);

  /** Opens the selectDate modal. */
  function handleOpenDatePicker() {
    openDatePicker(type);
  }

  /**
   * Converts unix time to date string
   * @param unixTimestamp
   * @returns date string
   */
  function convertUnixToDate(unixTimestamp: number) {
    return new Date(unixTimestamp * 1000).toLocaleDateString();
  }

  // sync displayed date with passed in time argument
  React.useEffect(() => {
    if (time !== undefined && time !== date) {
      setDate(time);
    }
  }, [time]);

  return (
    <>
      <View className="mt-4 flex flex-row items-center">
        <Text className="mr-2 dark:text-white">{label}</Text>
        <Pressable
          className="rounded-lg"
          onPress={handleOpenDatePicker}
          disabled={disabled}>
          <View
            className={
              "border-1 flex w-40 flex-1 flex-row justify-between rounded-lg border p-2 dark:border-white " +
              (disabled ? "border-gray-500 bg-gray-300" : "bg-white")
            }>
            <Text className={disabled ? "text-gray-500" : " dark:text-white"}>
              {convertUnixToDate(date)}
            </Text>
            {disabled ? (
              <MaterialCommunityIcons
                name="calendar-lock"
                size={20}
                color="gray"
              />
            ) : (
              <MaterialCommunityIcons
                name="calendar-edit"
                size={20}
                color="black"
              />
            )}
          </View>
        </Pressable>
      </View>
    </>
  );
}
