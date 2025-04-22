import React from "react";
import { View, FlatList, Text } from "react-native";

export default function List() {
  interface ListItem {
    key: string;
  }

  const data = [
    { key: "quarter" },
    { key: "good-bye" },
    { key: "zephyr" },
    { key: "receptive" },
    { key: "stream" },
    { key: "unit" },
    { key: "summer" },
    { key: "tear" },
    { key: "course" },
    { key: "steel" },
    { key: "red" },
    { key: "hungry" },
    { key: "impartial" },
    { key: "writing" },
    { key: "quarter" },
    { key: "quill" },
    { key: "tearful" },
    { key: "swear" },
    { key: "left" },
    { key: "cute" },
    { key: "declare" },
    { key: "kick" },
    { key: "proud" },
    { key: "cheap" },
    { key: "wistful" },
    { key: "birthday" },
    { key: "torpid" },
    { key: "heavy" },
  ];

  return (
    <>
      <View className="m-2 h-[280px] w-[300px] rounded-lg p-2">
        <Text className="p-2 text-lg font-bold">this is a test list</Text>
        <FlatList
          data={data}
          renderItem={({ item }: { item: ListItem }) => (
            <>
              <Text className="mt-2 rounded-md bg-white p-4 shadow-sm">
                {item.key}
              </Text>
            </>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}></FlatList>
      </View>
    </>
  );
}
