/** @overview Color palette */

import React from "react";
import { View, Pressable } from "react-native";

/** Displays color palette */
export function Palette() {
  return (
    <>
      <View>
        <View className="m-2 flex flex-row">
          <View className="mr-1 size-10 rounded-full bg-red-400"></View>
          <View className="mr-1 size-10 rounded-full bg-orange-400"></View>
          <View className="mr-1 size-10 rounded-full bg-green-400"></View>
          <View className="mr-1 size-10 rounded-full bg-blue-400"></View>
          <View className="mr-1 size-10 rounded-full bg-purple-400"></View>
        </View>
        <View className="m-2 mt-0 flex flex-row">
          <View className="mr-1 size-10 rounded-full bg-primary"></View>
          <View className="mr-1 size-10 rounded-full bg-secondary"></View>
          <View className="mr-1 size-10 rounded-full border-2 border-dotted bg-white"></View>
        </View>
      </View>
    </>
  );
}

/**
 * Color palette with selectable options (radio buttons)
 * @param onChangeOption Sends the selected color to parent component
 * @param selected Default selected value
 */
export function SelectablePalette({
  onChangeOption,
  selected,
}: {
  onChangeOption: (color: string) => void;
  selected?: string;
}) {
  /** Currently selected color. */
  const [option, useOption] = React.useState(selected || "white");

  /**
   * Callback for when the color changes
   * @param value New selected option
   */
  const handleChangeOption = (value: string) => {
    useOption(value); // updates local state
    onChangeOption(value); // updates parent state
  };

  // Sync the internal state with the parent `selected` prop if it changes
  React.useEffect(() => {
    if (selected !== undefined && selected !== option) {
      useOption(selected);
    }
  }, [selected]);

  return (
    <>
      <View>
        <View className="m-2 mb-0 flex flex-row items-center justify-center">
          <ColorOption
            color="red-400"
            callback={handleChangeOption}
            selected={option}></ColorOption>
          <ColorOption
            color="orange-400"
            callback={handleChangeOption}
            selected={option}></ColorOption>
          <ColorOption
            color="green-400"
            callback={handleChangeOption}
            selected={option}></ColorOption>
          <ColorOption
            color="blue-400"
            callback={handleChangeOption}
            selected={option}></ColorOption>
          <ColorOption
            color="purple-400"
            callback={handleChangeOption}
            selected={option}></ColorOption>
        </View>
        <View className="m-2 mt-0 flex flex-row">
          <ColorOption
            color="primary"
            callback={handleChangeOption}
            selected={option}></ColorOption>
          <ColorOption
            color="secondary"
            callback={handleChangeOption}
            selected={option}></ColorOption>
          <ColorOption
            color="white"
            callback={handleChangeOption}
            selected={option}></ColorOption>
        </View>
      </View>
    </>
  );
}

/**
 * Individual color option for selectable palette component.
 * @param color Color specified by the option
 * @param callback Sends the selected color to parent component
 * @param selected Determines if the current option is selected or not
 */
function ColorOption({
  color,
  callback,
  selected,
}: {
  color: string;
  callback: (color: string) => void;
  selected: string;
}) {
  const handleSelectOption = () => {
    callback(color);
  };

  return (
    <>
      <View
        className={
          "rounded-full " +
          (color == selected
            ? "m-2 size-8 ring-4 ring-primary ring-offset-2"
            : "m-1 size-10")
        }>
        <Pressable onPress={handleSelectOption}>
          <View
            className={
              "rounded-full " +
              (color == selected ? "size-8 ring-4 ring-white" : "size-10")
            }>
            <View
              className={`rounded-full bg-${color}
                ${color == selected ? "size-8" : "size-10"} ${color == "white" ? "border-2 border-dotted" : ""}`}></View>
          </View>
        </Pressable>
      </View>
    </>
  );
}
