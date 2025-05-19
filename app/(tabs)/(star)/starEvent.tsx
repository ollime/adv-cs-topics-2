import React from "react";
import DropdownComponent from "components/inputFields/DropdownField";
import Modal from "../../../components/Modal";

export default function StarEventModal() {
  const childContent = (
    <>
      <DropdownComponent
        data={testData}
        preset={["quarter", "red", "key"]}></DropdownComponent>
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
