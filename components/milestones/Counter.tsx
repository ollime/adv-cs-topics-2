/**
 * @overview Button component with gradient style
 */

import React from "react";
import { View, Text } from "react-native";
import Gradient from "../Gradient";
import { getAdjacentColor } from "utils/ColorCalculation";

export default function Counter({
  progress,
  color,
}: {
  progress: number;
  color?: string;
}) {
  const [count] = React.useState<number>(progress);
  const months = count / 30.417;
  const days = count % 30.417;
  // TODO: not actually time
  const hours = (count - Math.floor(count)) * 24;
  const minutes = (hours - Math.floor(hours)) * 60;

  return (
    <>
      <View className="mb-4 flex items-center justify-center">
        <Text className="items-center justify-center font-mono font-light dark:text-white">
          Time remaining
        </Text>
        <View className="flex flex-row flex-wrap items-center justify-center">
          <CounterButton progress={months} label="MONTHS" color={color} />
          <CounterButton progress={days} label="DAYS" color={color} />
          <CounterButton progress={hours} label="HOURS" color={color} />
          <CounterButton progress={minutes} label="MINUTES" color={color} />
        </View>
      </View>
    </>
  );
}

function CounterButton({
  progress,
  label,
  color,
}: {
  progress: number;
  label: string;
  color?: string;
}) {
  const [count] = React.useState<number>(progress);

  return (
    <>
      {/* uppermost view for rounded box shadow.
      size-min keeps the button to size defined below */}
      <View className="m-2 size-20 rounded-lg shadow-md shadow-indigo-500/50">
        {/* second view for rounded corner.
        overflow-hidden necessary to keep rounded corner */}
        <View className="size-20 overflow-hidden rounded-lg">
          <Gradient colors={getAdjacentColor(color)}>
            {/* change the size of the button here */}
            <View className="size-20 items-center justify-center">
              <Text className="text-2xl text-white first-line:select-none">
                {Math.floor(count)}
              </Text>
            </View>
          </Gradient>
        </View>
        <Text className="mt-1 flex items-center justify-center font-mono font-light dark:text-white">
          {label}
        </Text>
      </View>
    </>
  );
}
