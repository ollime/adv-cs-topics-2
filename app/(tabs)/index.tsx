import React from "react";
import Counter from "./../../components/Counter";
import PillButton from "./../../components/PillButton";

export default function index() {
  const callback = () => {
    console.log("messaged!");
  };

  return (
    <>
      <Counter></Counter>
      <PillButton label="Message" callback={callback}></PillButton>
    </>
  );
}
