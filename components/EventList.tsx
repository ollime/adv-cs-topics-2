import React from "react";
import { View, FlatList, Text } from "react-native";

interface ListItem {
  key: string;
  color?: string;
  type?: "since" | "until" | "elapsed";
  /** TODO: determine time formatting later */
  time?: number;
  description?: string;
}

export default function EventList({ data }: { data: Array<ListItem> }) {
  return (
    <>
      <View className="m-2 h-[280px] w-[300px] rounded-lg p-2">
        <Text className="p-2 text-lg font-bold">Event List</Text>
        <FlatList
          data={data}
          renderItem={({ item }: { item: ListItem }) => (
            <EventListItem data={item}></EventListItem>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}></FlatList>
      </View>
    </>
  );
}

function EventListItem({ data }: { data: ListItem }) {
  function renderText(type?: string, time?: number) {
    if (type && time) {
      if (type == "since") {
        return time + " days ago";
      } else if (type == "until") {
        return "in " + time + " days";
      } else if (type == "elapsed") {
        return "elapsed for " + time + " days";
      }
    } else {
      return "Error: Data not loaded.";
    }
  }

  return (
    <>
      <View className="mt-2 flex flex-row rounded-md bg-white p-4 shadow-sm">
        <View
          className={`mr-2 flex size-10 rounded-full bg-${data.color}`}></View>
        <View className="flex flex-1">
          <Text className="font-bold">{data.key}</Text>
          <Text>{renderText(data.type, data.time)}</Text>
          <Text className="mt-2 break-words">
            {data.description ? data.description : ""}
          </Text>
        </View>
      </View>
    </>
  );
}
