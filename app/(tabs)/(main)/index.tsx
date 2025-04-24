import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Counter from "../../../components/Counter";
import { OutlinedPill } from "../../../components/PillButton";
import EventList from "../../../components/EventList";
import { ListItem } from "./../../../types";
import { useState, useEffect } from "react";

export default function index() {
  const router = useRouter();
  const testCallback = () => {
    router.navigate("/testModal");
  };

  const openConfirmOverride = (data) => {
    router.navigate({ pathname: "/confirmOverride", params: data });
  };

  const [testData, setTestData] = useState<Array<ListItem>>([
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
  ]);
  // TODO: make colors easier to select using variables

  const { rawData, override } = useLocalSearchParams<{
    rawData: string;
    override?: string;
  }>();

  // converting data back into JSON
  const data = rawData ? (JSON.parse(rawData) as ListItem) : undefined;

  // TODO: useEffect to load newData
  // TODO: delete existing event if changing name
  // loadData function
  useEffect(() => {
    if (data) {
      // checks if key already exists
      const keyAlreadyExists = testData.find((i) => i.key == data.key);
      if (keyAlreadyExists) {
        // override the existing event
        if (override) {
          // remove old version of event
          const filteredEvents = testData.filter(
            (item) => item.key != data.key
          );
          setTestData([...filteredEvents, data]);
        } else {
          openConfirmOverride(data);
        }
      } else {
        setTestData([...testData, data]);
      }
    }
  }, []);

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
