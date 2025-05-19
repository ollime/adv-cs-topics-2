import React from "react";
import { View } from "react-native";
import Modal from "../../../components/Modal";

export default function StarEventModal() {
  const childContent = (
    <>
      <View>!!!</View>
    </>
  );

  return (
    <>
      <Modal childContent={childContent}></Modal>
    </>
  );
}
