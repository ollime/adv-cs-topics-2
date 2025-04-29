/** @overview Text field component. */

import React from "react";
import { TextInput, View, Text } from "react-native";

/**
 * Contains an editable text field.
 * @param label Label for the text field
 * @param onChangeText Callback to handle changes to parent component
 * @param initialText Initial text to load in the text field
 * @param multiline Determines if the field should expand
 */
export default function TextField({
  label,
  onChangeText,
  initialText,
  multiline,
}: {
  label: string;
  onChangeText: (value: string) => void;
  initialText?: string;
  multiline: boolean;
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
          value={initialText ? initialText : ""}
          multiline={multiline}
          numberOfLines={2}></TextInput>
      </View>
    </>
  );
}
