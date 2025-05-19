import React from "react";
import { View, Text, ScrollView } from "react-native";

import {
  ElapsedEventCard,
  UntilEventCard,
  SinceEventCard,
} from "../../../components/milestones/MilestoneCard";
import Gradient from "../../../components/Gradient";
import { FilledPill } from "../../../components/PillButton";
import { useRouter } from "expo-router";

import {
  calculateTime,
  convertSecondsToDays,
} from "../../../utils/DateTimeCalculation";
import { ListItem } from "../../../types";

export default function homePage() {
  const router = useRouter();
  const startTime = 1725623522;
  const endTime = 1748222240;
  const time: number = calculateTime(startTime, endTime);

  // TODO: database retrieval
  const testData: Array<ListItem> = [
    {
      key: "quarter",
      color: "purple-400",
      type: "since",
      description: "A description of this event.",
      startTime: 1725623522,
      endTime: 1749222291,
    },
    {
      key: "good-bye",
      color: "purple-400",
      type: "until",
      endTime: 1762660048,
    },
    { key: "zephyr", color: "primary", type: "since", startTime: 1715309248 },
    {
      key: "stream",
      type: "elapsed",
      color: "blue-400",
      startTime: 1725623522,
      endTime: 1748222240,
    },
    { key: "unit", type: "until" },
    {
      key: "receptive",
      color: "orange-400",
      description:
        "This is what a long description looks like. It may break off into multiple lines.",
    },
    {
      key: "summer",
      color: "red-400",
      type: "since",
      description: `For multi-line descriptions,
          use \` markers or \\n
          newline characters.`,
    },
    { key: "tear", color: "green-400", type: "until", endTime: 1802660048 },
    { key: "course", color: "orange-400" },
    { key: "steel", color: "blue-400" },
    { key: "red", type: "until", endTime: 1903593432 },
    { key: "hungry", type: "until", endTime: 2003593432 },
    {
      key: "impartial",
      type: "until",
      endTime: 1749391692,
    },
    {
      key: "writing",
      color: "green-400",
      type: "since",
      startTime: 1697424893,
    },
    { key: "key" },
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

  const upcomingEvents = getUpcomingEvents().map((item) => (
    <View key={item.key}>
      <UntilEventCard
        time={convertSecondsToDays(item.endTime - Date.now() / 1000)}
        eventTitle={item.key}
        color={item.color}
      />
    </View>
  ));

  function getUpcomingEvents() {
    const filtered = testData
      .filter((item) => item.type == "until" && item.endTime)
      .toSorted(
        (a, b) =>
          calculateTime(a.startTime, a.endTime) -
          calculateTime(b.startTime, b.endTime)
      );
    return filtered.slice(0, 3);
  }

  // TODO: implement data retrieval for starred events
  const starred = [
    {
      key: "summer",
      color: "red-400",
      type: "since",
      description: `For multi-line descriptions,
          use \` markers or \\n
          newline characters.`,
      startTime: 1592323203,
    },
    { key: "red", type: "until", endTime: 1903593432 },
    {
      key: "stream",
      type: "elapsed",
      color: "blue-400",
      startTime: 1725623522,
      endTime: 1748222240,
    },
    {
      key: "writing",
      color: "green-400",
      type: "since",
      startTime: 1697424893,
    },
  ];

  const starredEvents = starred.map((item) => {
    if (item) {
      if (item.type === "until") {
        return (
          <UntilEventCard
            key={item.key}
            time={convertSecondsToDays(item.endTime - Date.now() / 1000)}
            eventTitle={item.key}
            color={item.color}
          />
        );
      }
      if (item.type === "since") {
        return (
          <SinceEventCard
            key={item.key}
            time={convertSecondsToDays(
              Date.now() / 1000 - (item.startTime ?? Date.now() / 1000)
            )}
            eventTitle={item.key}
            color={item.color}
          />
        );
      }
      if (item.type === "elapsed") {
        return (
          <ElapsedEventCard
            key={item.key}
            time={time}
            eventTitle={item.key}
            color={item.color}
          />
        );
      }
    }
  });

  const handleStarEvent = () => {
    router.navigate({
      pathname: "/starEvent",
    });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex bg-background dark:bg-backgroundDark">
          <View className="flex w-full flex-row justify-end">
            <FilledPill
              label="Add new event"
              callback={handleStarEvent}></FilledPill>
          </View>
          <Gradient>
            <>
              <Text className="flex justify-center p-2 text-lg font-bold text-white">
                Starred
              </Text>
            </>
          </Gradient>
          {starredEvents}
          <Text className="m-2 flex justify-end italic dark:text-white">
            To add more events, to go the Events panel and star an event.
          </Text>
          <Gradient>
            <>
              <Text className="flex justify-center p-2 text-lg font-bold text-white">
                Upcoming Events
              </Text>
            </>
          </Gradient>
          {upcomingEvents}
          <Gradient>
            <>
              <Text className="flex justify-center p-2 text-lg font-bold text-white">
                Longest Events
              </Text>
            </>
          </Gradient>
        </View>
      </ScrollView>
    </>
  );
}
