/** Main page containing the list of events. */

import React from "react";
import { ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import EventList from "../../../components/EventList";
import { ListItem } from "./../../../types";

export default function index() {
  const router = useRouter();

  /** If duplicate event names or renaming event, open confirmOverride modal */
  const openConfirmOverride = (data: ListItem, overrideKey?: string) => {
    router.navigate({
      pathname: "/confirmOverride",
      params: { data: JSON.stringify(data), overrideKey: overrideKey },
    });
  };

  const [testData, setTestData] = React.useState<Array<ListItem>>([
    {
      key: "quarter",
      color: "purple-400",
      type: "since",
      description: "A description of this event.",
      startTime: 1725623522,
      endTime: 1749222291,
    },
    { key: "good-bye", color: "purple-400", type: "until" },
    { key: "zephyr", color: "primary", type: "since" },
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

  const { rawData, override, overrideKey } = useLocalSearchParams<{
    /** Event data */
    rawData: string;
    /**
     * Boolean used only to check if override modal should show up or not.
     * If true, override the event. Otherwise, show the confirmOverride modal.
     */
    override?: "true" | string | undefined;
    /** Key of the event being overridden. */
    overrideKey?: string;
  }>();

  /** Event data in JSON format */
  const data = rawData ? (JSON.parse(rawData) as ListItem) : undefined;

  // loadData function
  React.useEffect(() => {
    if (data) {
      const keyAlreadyExists = testData.find(
        (i) => i.key == (overrideKey ? overrideKey : data.key)
      );
      if (keyAlreadyExists) {
        if (override) {
          // event already exists && override confirmed --> override event
          const filteredEvents = testData.filter(
            (item) => item.key != (overrideKey ? overrideKey : data.key)
          );
          setTestData([...filteredEvents, data]);
        } else {
          // event already exists && override not confirmed --> ask for confirmation
          if (overrideKey) {
            // event names don't match up --> pass in optional parameter
            openConfirmOverride(data, overrideKey);
          } else {
            openConfirmOverride(data);
          }
        }
      } else {
        // event doesn't already exist --> add event
        setTestData([...testData, data]);
      }
    }
  }, []);

  return (
    <>
      <ScrollView className="flex flex-1 bg-background dark:bg-backgroundDark">
        <EventList data={testData}></EventList>
      </ScrollView>
    </>
  );
}
