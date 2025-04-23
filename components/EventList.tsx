import React from "react";
import { View, FlatList, Text } from "react-native";

interface ListItem {
  key: string;
  color?: string;
}

export default function EventList({ data }: { data: Array<ListItem> }) {
  return (
    <>
      <View className="m-2 h-[280px] w-[300px] rounded-lg p-2">
        <Text className="p-2 text-lg font-bold">Event List</Text>
        <FlatList
          data={data}
          renderItem={({ item }: { item: ListItem }) => (
            <EventItem data={item}></EventItem>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}></FlatList>
      </View>
    </>
  );
}

function EventItem({ data }: { data: ListItem }) {
  return (
    <>
      <View className="mt-2 flex flex-row rounded-md bg-white p-4 shadow-sm">
        <View className={`size-10 rounded-full bg-${data.color}`}></View>
        <Text>{data.key}</Text>
      </View>
    </>
  );
}
