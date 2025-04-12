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
      {/* uppermost view for rounded box shadow.
      size-min keeps the button to size defined below */}
      <View className="m-2 size-20 rounded-lg shadow-md shadow-indigo-500/50">
        {/* second view for rounded corner.
        overflow-hidden necessary to keep rounded corner */}
        <View className="size-20 overflow-hidden rounded-lg">
          <Pressable onPress={() => increment()}>
            <Gradient>
              {/* change the size of the button here */}
              <View className="size-20 items-center justify-center">
                <Text className="text-2xl text-white first-line:select-none">
                  {count}
                </Text>
              </View>
            </Gradient>
          </Pressable>
        </View>
      </View>
    </>
  );
}
