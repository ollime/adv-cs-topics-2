import { Text, View } from "react-native";
import React from "react";
import HorizontalProgressBar from "./HorizontalProgressBar";
import GridProgressBar from "./GridProgressBar";
import Counter from "./Counter";

export function ElapsedEventCard({
  time,
  eventTitle,
}: {
  time: number;
  eventTitle: string;
}) {
  return (
    <View className="flex bg-background dark:bg-backgroundDark">
      <View className="m-4 mb-0 flex rounded-lg bg-white p-4">
        <Text className="text-lg font-bold">Time since {eventTitle}</Text>
        <HorizontalProgressBar progress={time}></HorizontalProgressBar>
        {/* <GridProgressBar progress={time}></GridProgressBar> */}
      </View>
    </View>
  );
}

export function UntilEventCard({
  time,
  eventTitle,
}: {
  time: number;
  eventTitle: string;
}) {
  return (
    <View className="flex bg-background dark:bg-backgroundDark">
      <View className="m-4 mb-0 flex rounded-lg bg-white p-4">
        <Text className="text-lg font-bold">Time until {eventTitle}</Text>
        <Counter progress={time}></Counter>
      </View>
    </View>
  );
}

export function SinceEventCard({
  time,
  eventTitle,
}: {
  time: number;
  eventTitle: string;
}) {
  return (
    <View className="flex bg-background dark:bg-backgroundDark">
      <View className="m-4 mb-0 flex rounded-lg bg-white p-4">
        <Text className="text-lg font-bold">Since {eventTitle}</Text>
        {/* <HorizontalProgressBar progress={time}></HorizontalProgressBar> */}
        <GridProgressBar progress={time}></GridProgressBar>
      </View>
    </View>
  );
}
