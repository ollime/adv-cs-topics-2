import React from "react";
import { useRouter } from "expo-router";
import Counter from "../../../components/Counter";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import EventList from "../../../components/EventList";

export default function index() {
  const router = useRouter();
  const callback = () => {
    router.navigate("/modal");
  };

  const testData = [
    { key: "quarter", color: "indigo-300" },
    { key: "good-bye", color: "indigo-300" },
    { key: "zephyr", color: "primary" },
    { key: "stream" },
    { key: "unit" },
    { key: "receptive", color: "orange-300" },
    { key: "summer", color: "red-300" },
    { key: "tear", color: "green-300" },
    { key: "course" },
    { key: "steel" },
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

  return (
    <>
      <Counter></Counter>
      <FilledPill label="Message" callback={callback}></FilledPill>
      <OutlinedPill label="Message" callback={callback}></OutlinedPill>
      <EventList data={testData}></EventList>
    </>
  );
}
