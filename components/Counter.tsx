/**
 * @overview Button component with gradient style
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import Gradient from "./Gradient";

export default function Counter() {
  const [count, setCount] = React.useState<number>(0);

  function increment() {
    setCount((num) => num + 1);
  }

  return (
    <>
      <Text className="select-none">This is a test</Text>
      <View className="m-2 size-20 flex-shrink-0 overflow-hidden rounded-lg">
        <Pressable onPress={() => increment()}>
          <Gradient>
            <View className="size-20 items-center justify-center rounded-lg shadow-lg shadow-indigo-500/50">
              <Text className="text-2xl text-white first-line:select-none">
                {count}
              </Text>
            </View>
          </Gradient>
        </Pressable>
      </View>
    </>
  );
}
