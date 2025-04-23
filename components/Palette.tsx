/** @overview Color palette */

import React from "react";
import { View } from "react-native";

// TODO: Use later for editing event
export default function Palette() {
  return (
    <>
      <View>
        <View className="m-2 flex flex-row">
          <View className="mr-1 size-10 rounded-full bg-red-400"></View>
          <View className="mr-1 size-10 rounded-full bg-orange-400"></View>
          <View className="mr-1 size-10 rounded-full bg-green-400"></View>
          <View className="mr-1 size-10 rounded-full bg-blue-400"></View>
          <View className="mr-1 size-10 rounded-full bg-purple-400"></View>
        </View>
        <View className="m-2 mt-0 flex flex-row">
          <View className="mr-1 size-10 rounded-full bg-primary"></View>
          <View className="mr-1 size-10 rounded-full bg-secondary"></View>
          <View className="mr-1 size-10 rounded-full border-2 border-dotted bg-white"></View>
        </View>
      </View>
    </>
  );
}
