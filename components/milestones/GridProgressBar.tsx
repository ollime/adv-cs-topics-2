import React from "react";
import { Text, View } from "react-native";
import { getGradientColors } from "utils/ColorCalculation";

export default function GridProgressBar({
  progress,
  color,
}: {
  progress: number;
  color?: string;
}) {
  const totalDays: number = progress;

  const squareWidth: number = 15; // width of each square
  const colors = color
    ? getGradientColors(color)
    : getGradientColors("primary");
  const colorsLength = colors.length;

  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays / 30) % 12);
  const weeks: number = Math.floor((totalDays / 7) % 5);
  const days: number = totalDays % 6;

  const yearDisplay = Array.from(Array(years)).map((i, index) => (
    <View
      className="mr-2"
      style={{
        height: squareWidth * 2,
        backgroundColor: colors[index % colorsLength],
      }}
      key={"year" + index}>
      {index == years - 1 ? (
        <Text className="m-2 font-mono text-white">{years} years</Text>
      ) : (
        ""
      )}
    </View>
  ));

  const monthDisplay = Array.from(Array(months)).map((i, index) => (
    <View
      className="mr-2 mt-2 flex"
      style={{
        width: squareWidth * 6,
        height: squareWidth * 5,
        backgroundColor: colors[index % colorsLength],
      }}
      key={"month" + index}>
      {index == months - 1 ? (
        <Text className="m-2 font-mono text-white">{months} months</Text>
      ) : (
        ""
      )}
    </View>
  ));

  return (
    <>
      {/* display for months */}
      <View className="my-1 flex flex-row flex-wrap">
        <View className="flex w-full">{yearDisplay}</View>
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
                months % colorsLength < colors.length
                  ? colors[months % colorsLength]
                  : colors[0],
            }}>
            <Text className="mr-1 flex flex-1 items-center justify-end font-mono text-white">
              {weeks} weeks
            </Text>
          </View>
          {/* squares for days */}
          <View
            className="flex size-10"
            style={{
              width: squareWidth * days,
              height: squareWidth,
              backgroundColor:
                months % colorsLength < colors.length
                  ? colors[months % colorsLength]
                  : colors[0],
            }}></View>
          <Text
            className="ml-1 flex font-mono"
            style={{
              color:
                months % colorsLength < colors.length
                  ? colors[months % colorsLength]
                  : colors[0],
            }}>
            {days} days
          </Text>
        </View>
      </View>
    </>
  );
}
