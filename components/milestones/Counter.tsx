/**
 * @overview Button component that displays a number
 *
 * This module includes a larger display containing counter buttons
 * to display the date, as well as the logic for each individual
 * counter button.
 *
 * The button itself cannot be interacted with, but its values can
 * be modified with code elsewhere.
 */

import React from "react";
import { View, Text } from "react-native";

export default function Counter({
  progress,
  color,
}: {
  progress: number;
  color?: string;
}) {
  const [count] = React.useState<number>(progress);
  const years = count / 360;
  const months = (count % 360) / 30.417;
  const days = count % 30.417;

  return (
    <>
      <View className="mb-4 flex items-center justify-center">
        <Text className="items-center justify-center font-mono font-light dark:text-white">
          Time remaining
        </Text>
        <View className="flex flex-row flex-wrap items-center justify-center">
          <CounterButton progress={years} label="YEARS" color={color} />
          <CounterButton progress={months} label="MONTHS" color={color} />
          <CounterButton progress={days} label="DAYS" color={color} />
        </View>
      </View>
    </>
  );
}

/** Individual button component, including styles and stored value. */
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
          {/* change the size of the button here */}
          <View
            className={
              "size-20 items-center justify-center " +
              (color ? "bg-" + color : "bg-primary")
            }>
            <Text className="text-2xl text-white first-line:select-none">
              {Math.floor(count)}
            </Text>
          </View>
        </View>
        <Text className="mt-1 flex items-center justify-center font-mono font-light dark:text-white">
          {label}
        </Text>
      </View>
    </>
  );
}
