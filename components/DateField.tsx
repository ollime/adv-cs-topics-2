import React from "react";
import { View, Text, Pressable } from "react-native";

export default function DateField({ label }: { label: string }) {
  const [date, setDate] = React.useState("04/25/2025");

  // TODO: open DatePicker modal
  function handleOpenDatePicker() {
    console.log("");
  }

  return (
    <>
      <View className="mt-4 flex flex-row items-center">
        <Text className="mr-2 dark:text-white">{label}</Text>
        <Pressable
          className="rounded-lg bg-secondary p-1"
          onPress={handleOpenDatePicker}>
          <Text className="font-medium dark:text-white">{date}</Text>
        </Pressable>
      </View>
    </>
  );
}
