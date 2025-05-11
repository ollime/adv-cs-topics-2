import React from "react";
import { View, Text } from "react-native";
import Counter from "../../components/Counter";

export default function secondPage() {
  const days: number = 50;

  return (
    <>
      <View className="flex flex-1 bg-background dark:bg-backgroundDark">
        <View className="m-4 flex rounded-lg bg-white p-4">
          <Text className="text-lg font-bold">Elapsed Event</Text>
          <HorizontalProgressBar progress={days}></HorizontalProgressBar>
          <GridProgressBar progress={days}></GridProgressBar>
        </View>
      </View>
      <View className="flex flex-1 bg-background dark:bg-backgroundDark">
        <View className="m-4 flex rounded-lg bg-white p-4">
          <Text className="text-lg font-bold">Until Event</Text>
          <HorizontalProgressBar progress={days}></HorizontalProgressBar>
          <Counter progress={days}></Counter>
        </View>
      </View>
      <View className="flex flex-1 bg-background dark:bg-backgroundDark">
        <View className="m-4 flex rounded-lg bg-white p-4">
          <Text className="text-lg font-bold">Since Event</Text>
          <HorizontalProgressBar progress={days}></HorizontalProgressBar>
          <GridProgressBar progress={days}></GridProgressBar>
        </View>
      </View>
    </>
  );
}

function HorizontalProgressBar({ progress }: { progress: number }) {
  let goal: number = 0;
  let text: string = "";
  if (progress < 7) {
    goal = 7;
  } else if (progress < 30) {
    goal = 30;
  } else if (progress < 365) {
    goal = 365;
  }
  const fraction: number = progress / goal;
  return (
    <>
      <View className="my-2 flex h-8 flex-row">
        <View
          className={
            "rounded-l-lg bg-primary " + (fraction >= 1 ? "rounded-r-lg" : "")
          }
          style={{ flex: fraction }}>
          <Text className="flex h-full items-center justify-center italic text-white">
            {progress} / {goal}
          </Text>
        </View>
        <View
          className={
            "rounded-r-lg bg-gray-300 " + (fraction <= 0 ? "rounded-l-lg" : "")
          }
          style={{ flex: 1 - fraction }}></View>
      </View>
    </>
  );
}

function GridProgressBar({ progress }: { progress: number }) {
  const totalDays: number = progress;

  const squareWidth: number = 15; // width of each square
  const colors = [
    "#7BD1ED",
    "#73BDE9",
    "#6CAAE6",
    "#6596E2",
    "#5E83DF",
    "#5770DB",
    "#4F5CD7",
    "#484AD4",
    "#4137D0",
    "#3923CC",
    "#3210C9",
  ];

  const months = Math.floor(totalDays / 30);
  const weeks: number = Math.floor((totalDays - months * 30) / 6);
  const days: number = totalDays % 6;

  const monthDisplay = Array.from(Array(months)).map((i, index) => (
    <View
      className="mr-2 mt-2 flex"
      style={{
        width: squareWidth * 6,
        height: squareWidth * 5,
        backgroundColor: colors[index % 10],
      }}
      key={"month" + index}></View>
  ));

  return (
    <>
      {/* display for months */}
      <View className="my-1 flex flex-row flex-wrap">
        {monthDisplay}
        {/* blocks for months */}
        <View
          className="mt-2 flex bg-gray-300"
          style={{ width: squareWidth * 6, height: squareWidth * 5 }}>
          {/* rows for weeks */}
          <View
            className="flex size-10"
            style={{
              width: squareWidth * 6,
              height: squareWidth * weeks,
              backgroundColor:
                months % 10 < colors.length
                  ? colors[(months % 10) + 1]
                  : colors[0],
            }}></View>
          {/* squares for days */}
          <View
            className="flex size-10"
            style={{
              width: squareWidth * days,
              height: squareWidth,
              backgroundColor:
                months % 10 < colors.length
                  ? colors[(months % 10) + 1]
                  : colors[0],
            }}></View>
        </View>
      </View>
    </>
  );
}
