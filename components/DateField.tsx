import React from "react";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function DateField({
  label,
  time,
}: {
  label: string;
  time: number;
}) {
  const [date, setDate] = React.useState<number>(time);

  // TODO: open DatePicker modal
  function handleOpenDatePicker() {
    console.log("");
  }

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
        <Pressable className="rounded-lg" onPress={handleOpenDatePicker}>
          <View className="border-1 flex w-40 flex-1 flex-row justify-between rounded-lg border bg-white p-2 dark:border-white">
            <Text className="dark:text-white">{convertUnixToDate(date)}</Text>
            <MaterialIcons name="edit-calendar" size={20} color="black" />
          </View>
        </Pressable>
      </View>
    </>
  );
}
