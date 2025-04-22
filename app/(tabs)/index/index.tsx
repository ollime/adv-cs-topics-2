import React from "react";
import { useRouter } from "expo-router";
import Counter from "../../../components/Counter";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";

export default function index() {
  const router = useRouter();

  const callback = () => {
    router.navigate("/modal");
  };

  return (
    <>
      <Counter></Counter>
      <FilledPill label="Message" callback={callback}></FilledPill>
      <OutlinedPill label="Message" callback={callback}></OutlinedPill>
    </>
  );
}
