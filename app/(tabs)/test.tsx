import React from "react";
import { View, Text } from "react-native";

export default function secondPage() {
  const progress: number = 0.1;

  return (
    <>
      <View className="flex flex-1 bg-background dark:bg-backgroundDark">
        <View className="m-4 flex rounded-lg bg-white p-4">
          <Text className="text-lg font-bold">Event Title</Text>
          <ProgressBar progress={progress}></ProgressBar>
          <DateDisplay></DateDisplay>
        </View>
      </View>
    </>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <>
      <View className="my-2 flex h-8 flex-row">
        <View
          className={
            "rounded-l-lg bg-primary " + (progress == 1 ? "rounded-r-lg" : "")
          }
          style={{ flex: progress }}></View>
        <View
          className={
            "rounded-r-lg bg-gray-300 " + (progress == 0 ? "rounded-l-lg" : "")
          }
          style={{ flex: 1 - progress }}></View>
      </View>
    </>
  );
}

function DateDisplay() {
  const squareWidth: number = 20; // width of each square
  const totalDays: number = 20;
  const weeks: number = Math.floor(totalDays / 7);
  const days: number = totalDays % 7;

  return (
    <>
      {/* blocks for months */}
      <View
        className="my-2 flex bg-gray-300"
        style={{ width: squareWidth * 7, height: squareWidth * 5 }}>
        {/* rows for weeks */}
        <View
          className="flex size-10 bg-primary"
          style={{
            width: squareWidth * 7,
            height: squareWidth * weeks,
          }}></View>
        {/* squares for days */}
        <View
          className="flex size-10 bg-primary"
          style={{ width: squareWidth * days, height: squareWidth }}></View>
      </View>
    </>
  );
}
