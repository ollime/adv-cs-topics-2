import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ElapsedEventCard,
  UntilEventCard,
  SinceEventCard,
} from "../../components/MilestoneCard";
import Gradient from "../../components/Gradient";

import {
  calculateTime,
  convertSecondsToDays,
} from "../../utils/DateTimeCalculation";
import { ListItem } from "../../types";

export default function secondPage() {
  // const startTime = 1725623522;
  // const endTime = 1748222240;
  // const time: number = calculateTime(startTime, endTime);
  // // temporary variable, fix calculateTime later
  // const timeWithSeconds: number = calculateTime(startTime, endTime) + 0.4352;
  // const eventTitle = "My Event";

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
    { key: "stream", type: "elapsed" },
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
    { key: "writing" },
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

  const upcomingEvents = getLatestEvents().map((item) => (
    <View key={item.key}>
      <UntilEventCard
        time={convertSecondsToDays(item.endTime - Date.now() / 1000)}
        eventTitle={item.key}
      />
    </View>
  ));
  // React.useEffect(() => {}, []);

  function getLatestEvents() {
    const filtered = testData
      .filter((item) => item.type == "until" && item.endTime)
      .sort(
        (a, b) =>
          calculateTime(a.startTime, a.endTime) -
          calculateTime(b.startTime, b.endTime)
      );
    return filtered.slice(0, 3);
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex bg-background dark:bg-backgroundDark">
          <Gradient>
            <>
              <Text className="flex justify-center p-2 text-lg font-bold text-white">
                Starred
              </Text>
            </>
          </Gradient>

          <Gradient>
            <>
              <Text className="flex justify-center p-2 text-lg font-bold text-white">
                Upcoming Events
              </Text>
            </>
          </Gradient>
          {upcomingEvents}
          {/* <ElapsedEventCard time={time} eventTitle={eventTitle} />
          <UntilEventCard time={timeWithSeconds} eventTitle={eventTitle} />
          <SinceEventCard time={time} eventTitle={eventTitle} /> */}
          <Gradient>
            <>
              <Text className="flex justify-center p-2 text-lg font-bold text-white">
                Recently Added
              </Text>
            </>
          </Gradient>
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
