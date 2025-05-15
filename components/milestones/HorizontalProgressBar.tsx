import React from "react";
import { Text, View } from "react-native";

export default function HorizontalProgressBar({
  progress,
  endGoal,
  color,
}: {
  progress: number;
  endGoal?: number;
  color: string;
}) {
  const current = progress;
  let goal: number = endGoal ? endGoal : 1;
  let text: string = "";
  if (current < 7) {
    goal = 7;
    text = "1 week";
  } else if (current < 30) {
    goal = 30;
    text = "1 month";
  } else if (current < 365) {
    goal = 365;
    text = "1 year";
  } else {
    goal = current - (current % 365) + 365;
    text = Math.floor(current / 365) + " years";
  }

  const fraction: number = current / goal;
  return (
    <>
      <View className="my-2 flex h-8 flex-row">
        <View
          className={
            `rounded-l-lg bg-${color}` + (fraction >= 1 ? "rounded-r-lg " : " ")
          }
          style={{ flex: fraction }}>
          <Text className="flex h-full items-center justify-center italic text-white">
            {current} / {goal} days
          </Text>
        </View>
        <View
          className={
            "rounded-r-lg bg-gray-300 " + (fraction <= 0 ? "rounded-l-lg" : "")
          }
          style={{ flex: 1 - fraction }}>
          <Text className="mr-4 flex h-full items-center justify-end overflow-clip italic text-gray-500">
            {text}
          </Text>
        </View>
      </View>
    </>
  );
}
