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
  const totalDays: number = 40;

  const squareWidth: number = 20; // width of each square
  const months = Math.floor(totalDays / 30);
  const weeks: number = Math.floor((totalDays - months * 30) / 6);
  const days: number = totalDays % 6;

  const monthDisplay = Array.from(Array(months)).map((i) => (
    <View
      className="mr-2 flex bg-primary"
      style={{ width: squareWidth * 6, height: squareWidth * 5 }}
      key={"month" + i}></View>
  ));

  return (
    <>
      {/* display for months */}
      <View className="my-2 flex flex-row flex-wrap">
        {monthDisplay}
        {/* blocks for months */}
        <View
          className="flex bg-gray-300"
          style={{ width: squareWidth * 6, height: squareWidth * 5 }}>
          {/* rows for weeks */}
          <View
            className="flex size-10 bg-primary"
            style={{
              width: squareWidth * 6,
              height: squareWidth * weeks,
            }}></View>
          {/* squares for days */}
          <View
            className="flex size-10 bg-primary"
            style={{ width: squareWidth * days, height: squareWidth }}></View>
        </View>
      </View>
    </>
  );
}
