import React from "react";
import { TextInput, View, Text } from "react-native";

export default function TextField({
  label,
  onChangeText,
  initialText,
}: {
  label: string;
  onChangeText: Function;
  initialText?: string;
}) {
  function handleChangeText(value: string) {
    onChangeText(value);
  }

  return (
    <>
      <View className="m-2 flex flex-row items-center">
        <Text className="m-2 dark:text-white">{label}</Text>
        <TextInput
          className="border-1 w-60 rounded-lg border bg-white p-2 dark:border-white"
          onChangeText={handleChangeText}
          value={initialText ? initialText : ""}></TextInput>
      </View>
    </>
  );
}
