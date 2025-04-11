import React from "react";
import { View } from "react-native";
import Counter from "./../components/Counter";

export default function index() {
  return (
    <>
      <View className="flex-1">
        <Counter></Counter>
      </View>
    </>
  );
}
