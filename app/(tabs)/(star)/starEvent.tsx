/**
 * @overview Modal to star a new event and view the list of
 * currently starred events.
 * */

import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

import Modal from "../../../components/Modal";
import DropdownComponent from "components/inputFields/DropdownField";
import { FilledPill, OutlinedPill } from "components/PillButton";

export default function StarEventModal() {
  const [values, setValues] = React.useState();
  const router = useRouter();

  const confirmItems = () => {
    // TODO: put in storage
    handleGoBack();
  };

  const handleGoBack = () => {
    router.navigate({
      pathname: "/starEvent",
    });
  };

  const childContent = (
    <>
      <Text className="m-5 mb-2 text-center text-lg font-bold dark:text-white">
        Select event(s) to add
      </Text>
      <DropdownComponent
        data={testData}
        preset={["quarter", "red", "key"]}
        callback={setValues}></DropdownComponent>

      <View className="flex flex-1 flex-row justify-center">
        <FilledPill label="Confirm" callback={confirmItems}></FilledPill>
        <OutlinedPill label="Cancel" callback={handleGoBack}></OutlinedPill>
      </View>
    </>
  );

  return (
    <>
      <Modal childContent={childContent}></Modal>
    </>
  );
}
const testData = [
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
