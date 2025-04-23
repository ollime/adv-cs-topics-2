import React from "react";
import Modal from "../../../components/Modal";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import Palette from "../../../components/Palette";

export default function addEventScreen() {
  function addNewEvent() {
    console.log("added!");
  }

  const isPresented = router.canGoBack();
  const childContent = (
    <>
      <View className="flex w-full flex-1">
        {/* Main content */}
        <View className="flex flex-1 items-center justify-center">
          <Text className="m-5">Modal title</Text>
          <Palette></Palette>
        </View>

        <View className="m-5 flex flex-row content-end justify-end">
          {/* Save / close modal */}
          <FilledPill
            label="Confirm"
            callback={() => {
              {
                /* If the modal was added on a stack, return to
                previous page. Otherwise, return to index */
              }
              addNewEvent();
              router.navigate(isPresented ? "../" : "/");
            }}></FilledPill>
          {/* Close modal without saving */}
          <OutlinedPill
            label="Cancel"
            callback={() => {
              router.navigate(isPresented ? "../" : "/");
            }}></OutlinedPill>
        </View>
      </View>
    </>
  );

  return <Modal childContent={childContent}></Modal>;
}
