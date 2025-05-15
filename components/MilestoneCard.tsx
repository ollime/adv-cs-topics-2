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
    <View className="m-4 mb-0 flex rounded-lg bg-white p-4 dark:bg-lightDark">
      <Text className="text-lg font-bold dark:text-white">
        Time since {eventTitle}
      </Text>
      <HorizontalProgressBar progress={time}></HorizontalProgressBar>
      {/* <GridProgressBar progress={time}></GridProgressBar> */}
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
    <View className="m-4 mb-0 flex rounded-lg bg-white p-4 dark:bg-lightDark">
      <Text className="text-lg font-bold dark:text-white">
        Time until {eventTitle}
      </Text>
      <Counter progress={time}></Counter>
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
    <View className="m-4 mb-0 flex rounded-lg bg-white p-4 dark:bg-lightDark">
      <Text className="text-lg font-bold dark:text-white">
        Since {eventTitle}
      </Text>
      {/* <HorizontalProgressBar progress={time}></HorizontalProgressBar> */}
      <GridProgressBar progress={time}></GridProgressBar>
    </View>
  );
}
