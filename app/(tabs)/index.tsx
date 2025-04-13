import React from "react";
import Counter from "./../../components/Counter";
import { FilledPill, OutlinedPill } from "./../../components/PillButton";

export default function index() {
  const callback = () => {
    console.log("messaged!");
  };

  return (
    <>
      <Counter></Counter>
      <FilledPill label="Message" callback={callback}></FilledPill>
      <OutlinedPill label="Message" callback={callback}></OutlinedPill>
    </>
  );
}
