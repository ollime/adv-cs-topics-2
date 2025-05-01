/** Contains list of events. */

import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { FilledPill } from "./PillButton";
import { ListItem } from "../types";
import { calculateTime } from "../utils/DateTimeCalculation";

export default function EventList({ data }: { data: Array<ListItem> }) {
  const router = useRouter();
  /** Opens the modal to add an event */
  function openAddEventModal() {
    router.navigate("/addEvent");
  }

  return (
    <>
      <View className="m-2 h-[400px] w-[300px] rounded-lg p-2">
        <View className="flex flex-row items-center justify-between">
          <Text className="p-2 text-lg font-bold dark:text-white">
            Event List
          </Text>
          <FilledPill
            label="Add event"
            callback={openAddEventModal}></FilledPill>
        </View>
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
  const router = useRouter();
  /** Opens the modal to add an event */
  function handleOpenModal() {
    router.navigate({
      pathname: "/addEvent",
      params: JSON.parse(JSON.stringify(data)),
    });
  }

  /**
   * Conditional text rendering based off event type
   * @param type
   * @param startTime
   * @param endTime
   * @returns Text to be displayed
   */
  function renderText(type?: string, startTime?: number, endTime?: number) {
    const time: number = calculateTime(startTime, endTime);

    if (type && (time || time === 0)) {
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
      <Pressable onPress={handleOpenModal}>
        <View className="mt-2 flex flex-row rounded-md bg-white p-4 shadow-sm dark:bg-lightDark">
          <View
            className={`mr-2 flex size-10 rounded-full bg-${data.color}`}></View>
          <View className="flex flex-1">
            <Text className="font-bold dark:text-white">{data.key}</Text>
            <Text className="dark:text-white">
              {renderText(data.type, data.startTime, data.endTime)}
            </Text>
            <Text className="mt-2 break-words dark:text-white">
              {data.description ? data.description : ""}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
