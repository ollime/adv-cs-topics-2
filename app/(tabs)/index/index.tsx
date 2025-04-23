import React from "react";
import { useRouter } from "expo-router";
import Counter from "../../../components/Counter";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import EventList from "../../../components/EventList";
import Palette from "../../../components/Palette";

export default function index() {
  const router = useRouter();
  const callback = () => {
    router.navigate("/modal");
  };

  // TODO: make colors easier to select using variables
  const testData = [
    { key: "quarter", color: "purple-400" },
    { key: "good-bye", color: "purple-400" },
    { key: "zephyr", color: "primary" },
    { key: "stream" },
    { key: "unit" },
    { key: "receptive", color: "orange-400" },
    { key: "summer", color: "red-400" },
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

  return (
    <>
      <Counter></Counter>
      <FilledPill label="Message" callback={callback}></FilledPill>
      <OutlinedPill label="Message" callback={callback}></OutlinedPill>
      <EventList data={testData}></EventList>
      <Palette></Palette>
    </>
  );
}
