/** First landing page for the user.
 *
 * Displays the most important events by 1.) user selection
 * 2.) upcoming events (events whose endTime is closest)
 *
 * Each type of event is displayed differently.
 *    Since: Grid Progress Bar
 *    Until: Counter
 *    Elapsed: Horizontal Progress Bar
 * See the component .tsx files for more information on how
 * each event is displayed.
 */

import React from "react";
import { View, Text, ScrollView } from "react-native";

import {
  ElapsedEventCard,
  UntilEventCard,
  SinceEventCard,
} from "../../../components/milestones/MilestoneCard";
import Gradient from "../../../components/Gradient";
import { OutlinedPill } from "../../../components/PillButton";
import { useRouter } from "expo-router";

import {
  calculateTime,
  convertSecondsToDays,
} from "../../../utils/DateTimeCalculation";
import { ListItem } from "../../../types";

export default function homePage() {
  const router = useRouter();

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

  /** Given a list of upcoming events, create the JSX elements to
   * display those events.
   */
  const upcomingEvents = getUpcomingEvents().map((item) => (
    <View key={item.key}>
      <UntilEventCard
        time={convertSecondsToDays(
          item.endTime ? item.endTime - Date.now() / 1000 : 0
        )}
        eventTitle={item.key}
        color={item.color}
      />
    </View>
  ));

  /** Gets a list of events whose endTime values are closest to the
   * Date now. Returns the closest 3 events
   */
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

  // holds the data of events manually starred by the user
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

  /** Given a list of starred events, create the JSX elements to
   * display those events.
   */
  const starredEvents = starred.map((item) => {
    if (item) {
      if (item.type === "until") {
        return (
          <UntilEventCard
            key={item.key}
            time={convertSecondsToDays(
              item.endTime ? item.endTime - Date.now() / 1000 : 0
            )}
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
            time={calculateTime(item.startTime, item.endTime)}
            eventTitle={item.key}
            color={item.color ? item.color : ""}
          />
        );
      }
    }
  });

  /** If the user selects the option to star a new event,
   * navigates to the modal to select new starred events.
   */
  const handleStarEvent = () => {
    router.navigate({
      pathname: "/starEvent",
    });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex bg-background dark:bg-backgroundDark">
          <Gradient>
            <>
              <View className="flex flex-row">
                <Text className="flex w-full justify-center p-2 text-center text-lg font-bold text-white">
                  Starred
                </Text>
                <View className="flex flex-row justify-end">
                  <OutlinedPill
                    label="Star an event"
                    callback={handleStarEvent}></OutlinedPill>
                </View>
              </View>
            </>
          </Gradient>
          {starredEvents}
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
