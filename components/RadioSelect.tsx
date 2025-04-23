import React from "react";
import { View, Text, Pressable } from "react-native";
import { useState } from "react";

export default function RadioSelect({
  label,
  options,
}: {
  label: string;
  options: Array<string>;
}) {
  const [option, useOption] = useState(options[0]);
  const handleChangeOption = (value: string) => {
    useOption(value);
  };

  const radioBtns = options.map((item, key) => (
    <RadioButton
      key={"radio-" + item + key}
      label={item}
      onSelect={handleChangeOption}
      selected={option}></RadioButton>
  ));

  return (
    <>
      <View className="m-2 flex flex-row items-center">
        <Text className="m-2 mr-5 dark:text-white">{label}</Text>
        {radioBtns}
      </View>
    </>
  );
}

function RadioButton({
  label,
  onSelect,
  selected,
}: {
  label: string;
  onSelect: Function;
  selected: string;
}) {
  const handleSelect = () => {
    onSelect(label);
  };

  return (
    <>
      <Pressable onPress={handleSelect}>
        <View className="flex flex-row items-center justify-center">
          <View
            className={`rounded-full ring-2 ${
              label == selected
                ? "ring-blue-500 ring-offset-4"
                : "ring-gray-400 ring-offset-2"
            }
          `}>
            <View
              className={`size-8 rounded-full bg-white ${
                label == selected
                  ? "bg-blue-500 ring-4 ring-white"
                  : "ring-2 ring-gray-400"
              }
            `}></View>
          </View>
          <Text className="mx-2 dark:text-white">{label}</Text>
        </View>
      </Pressable>
    </>
  );
}
