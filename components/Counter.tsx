import React from "react";
import { View, Text, Pressable } from "react-native";

export default function Counter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount((num) => num + 1);
    console.log(count);
  }

  return (
    <>
      <View className="m-2">
        <Pressable
          onPress={() => increment()}
          className="size-20 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
          <Text className="select-none text-2xl">{count}</Text>
        </Pressable>
      </View>
    </>
  );
}
