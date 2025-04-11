import React from "react";
import Counter from "components/Counter";
import { View } from "react-native";

import "./global.css";

export default function App() {
  return (
    <>
      <View className="flex-1">
        <Counter></Counter>
      </View>
    </>
  );
}
