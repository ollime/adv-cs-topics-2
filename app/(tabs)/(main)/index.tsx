import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Counter from "../../../components/Counter";
import { OutlinedPill } from "../../../components/PillButton";
import EventList from "../../../components/EventList";
// import { ListItem } from "./../../../types";

export default function index() {
  const router = useRouter();
  const testCallback = () => {
    router.navigate("/testModal");
  };

  // TODO: make colors easier to select using variables
  const testData = [
    {
      key: "quarter",
      color: "purple-400",
      type: "since",
      time: 20,
      description: "A description of this event.",
    },
    { key: "good-bye", color: "purple-400", type: "until", time: 5 },
    { key: "zephyr", color: "primary", type: "since", time: 500 },
    { key: "stream", type: "elapsed", time: 200 },
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
      time: 10,
      description: `For multi-line descriptions,
      use \` markers or \\n
      newline characters.`,
    },
    { key: "tear", color: "green-400" },
    { key: "course", color: "orange-400" },
    { key: "steel", color: "blue-400" },
    { key: "red" },
    { key: "hungry" },
    { key: "impartial" },
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

  // TODO: useEffect to load newData
  // loadData function
  const key = useLocalSearchParams();
  console.log(key);
  if (key) {
    testData.push(key);
  }

  return (
    <>
      <View className="flex flex-1 bg-background dark:bg-backgroundDark">
        <Counter></Counter>
        <OutlinedPill label="Message" callback={testCallback}></OutlinedPill>
        <EventList data={testData}></EventList>
      </View>
    </>
  );
}
