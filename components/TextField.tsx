import React from "react";
import { TextInput, View, Text } from "react-native";

export default function TextField({ label }: { label: string }) {
  function onChangeText() {
    console.log("!!!!");
  }

  return (
    <>
      <View className="m-2 flex flex-row items-center justify-center">
        <Text className="m-2">{label}</Text>
        <TextInput
          className=" border-1 w-60 rounded-lg border p-2"
          onChangeText={onChangeText}></TextInput>
      </View>
    </>
  );
}
