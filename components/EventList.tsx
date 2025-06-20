/** Contains a list of events.
 *
 * A nicely formatted scrollable list containing event data.
 * There is an option to add a new event, as well as the ability
 * to modify an existing event by clicking on it.
 *
 * There are several sort options available:
 *  1.
 *  2.
 *  3.
 *  4.
 */

import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { FilledPill } from "./PillButton";
import { ListItem } from "../types";

import { calculateTime } from "../utils/DateTimeCalculation";

export default function EventList({ data }: { data: Array<ListItem> }) {
  const [sortOrder, setSortOrder] = React.useState<number>(0);

  const router = useRouter();
  /** Opens the modal to add an event */
  function openAddEventModal() {
    router.navigate("/addEvent");
  }

  React.useEffect(() => {
    sortDateItems(sortOrder);
  }, [sortOrder]);

  /** Creates multiple sorting options as defined in the module level comment. */
  function sortDateItems(sortOrder: number) {
    switch (sortOrder) {
      case 0:
        data.sort((a, b) => {
          if (a.key < b.key) {
            return -1;
          } else if (a.key > b.key) {
            return 1;
          }
          return 0;
        });
        break;
      case 1:
        data.sort((a, b) => {
          if (a.key > b.key) {
            return -1;
          } else if (a.key < b.key) {
            return 1;
          }
          return 0;
        });
        break;
      case 2:
        data.sort((a, b) => {
          if (!a.type) {
            return 1;
          }
          if (!b.type) {
            return -1;
          }
          return String(a.type).localeCompare(String(b.type));
        });
        break;
      case 3:
        data.sort(
          (a, b) =>
            -calculateTime(a.startTime, a.endTime) +
            calculateTime(b.startTime, b.endTime)
        );
        break;
    }
  }

  const sortOptions = ["A-Z", "Z-A", "type", "time"];
  function handleSortOrder() {
    if (sortOrder == sortOptions.length - 1) {
      sortDateItems(0);
      setSortOrder(0);
    } else {
      sortDateItems(sortOrder + 1);
      setSortOrder(sortOrder + 1);
    }
  }

  return (
    <>
      <View className="m-2 h-[500px] w-[300px] rounded-lg p-2">
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

        <Pressable onPress={handleSortOrder}>
          <Text className="m-1 flex flex-1 select-none items-center justify-end dark:text-white">
            Sort by {sortOptions[sortOrder]}
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </Text>
        </Pressable>
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
