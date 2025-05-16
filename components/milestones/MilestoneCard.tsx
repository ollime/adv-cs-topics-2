import React from "react";
import { Text, View } from "react-native";

import HorizontalProgressBar from "./HorizontalProgressBar";
import GridProgressBar from "./GridProgressBar";
import Counter from "./Counter";

export function ElapsedEventCard({
  time,
  eventTitle,
  color,
}: {
  time: number;
  eventTitle: string;
  color: string;
}) {
  return (
    <View className="m-4 mb-0 flex rounded-lg bg-white p-4 dark:bg-lightDark">
      <Text className="text-lg font-bold dark:text-white">{eventTitle}</Text>
      <HorizontalProgressBar
        progress={time}
        color={color}></HorizontalProgressBar>
      {/* <GridProgressBar progress={time}></GridProgressBar> */}
    </View>
  );
}

export function UntilEventCard({
  time,
  eventTitle,
  color,
}: {
  time: number;
  eventTitle: string;
  color?: string;
}) {
  return (
    <View className="m-4 mb-0 flex rounded-lg bg-white p-4 dark:bg-lightDark">
      <Text className="text-lg font-bold dark:text-white">{eventTitle}</Text>
      <Counter progress={time} color={color}></Counter>
    </View>
  );
}

export function SinceEventCard({
  time,
  eventTitle,
  color,
}: {
  time: number;
  eventTitle: string;
  color?: string;
}) {
  return (
    <View className="m-4 mb-0 flex rounded-lg bg-white p-4 dark:bg-lightDark">
      <Text className="text-lg font-bold dark:text-white">{eventTitle}</Text>
      {/* <HorizontalProgressBar progress={time}></HorizontalProgressBar> */}
      <GridProgressBar progress={time} color={color}></GridProgressBar>
    </View>
  );
}
