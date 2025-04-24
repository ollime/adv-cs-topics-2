/** @overview Color palette */

import React from "react";
import { View, Pressable } from "react-native";
import { useState } from "react";

// TODO: Use later for editing event
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

export function SelectablePalette({
  onChangeOption,
}: {
  onChangeOption: Function;
}) {
  const [option, useOption] = useState("red-400");
  const handleChangeOption = (value: string) => {
    // updates this function's copy of the selected option
    useOption(value);
    // updates parent container
    onChangeOption(value);
  };

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

function ColorOption({
  color,
  callback,
  selected,
}: {
  color: string;
  callback: Function;
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
