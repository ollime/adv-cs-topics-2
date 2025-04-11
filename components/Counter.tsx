import React from "react";
import { View, Text, Pressable } from "react-native";

export default function Counter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount((num) => num + 1);
  }

  return (
    <>
      <View className="m-2">
        <Text className="select-none">This is a test</Text>
        <Pressable
          onPress={() => increment()}
          className="primary-gradient size-20 flex-shrink-0 items-center justify-center rounded-lg shadow-lg shadow-indigo-500/50">
          <Text className="select-none text-2xl text-white">{count}</Text>
        </Pressable>
      </View>
    </>
  );
}
