/** @overview Text field component
 *
 * This is an editable text field that has the option to load
 * with an initial displayed value, multiline display, and
 * a disabled text field that the user cannot enter values in.
 */

import React from "react";
import { TextInput, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

/**
 * Contains an editable text field.
 * @param label Label for the text field
 * @param onChangeText Callback to handle changes to parent component
 * @param initialText Initial text to load in the text field
 * @param multiline Determines if the field should expand
 * @param disabled Disables text field from editing
 */
export default function TextField({
  label,
  onChangeText,
  initialText,
  multiline,
  disabled,
}: {
  label: string;
  onChangeText: (value: string) => void;
  initialText?: string;
  multiline?: boolean;
  disabled?: boolean;
}) {
  function handleChangeText(value: string) {
    onChangeText(value);
  }

  return (
    <>
      <View className="m-2 flex flex-row items-center">
        <Text className="m-2 dark:text-white">{label}</Text>
        <View
          className={
            "border-1 w-60 rounded-lg border " +
            (disabled
              ? "border-gray-500 bg-gray-300 text-gray-500"
              : "bg-white")
          }>
          <View
            className="flex flex-row justify-between"
            pointerEvents={disabled ? "none" : "auto"}>
            <TextInput
              onChangeText={handleChangeText}
              value={initialText ? initialText : ""}
              accessibilityRole="adjustable"
              accessibilityLabel={label}
              multiline={multiline}
              numberOfLines={2}
              editable={!disabled}
              selectTextOnFocus={!disabled}
              className="w-60 rounded-lg p-2"></TextInput>
            {disabled ? (
              <View className="flex items-center justify-center px-2">
                <MaterialIcons name="edit-off" size={20} color="gray" />
              </View>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    </>
  );
}
