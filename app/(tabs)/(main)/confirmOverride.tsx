/** @overview Modal to confirm adding an event in the case that two events share the same name. */

import React from "react";
import Modal from "../../../components/Modal";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
// import { ListItem } from "./../../../types";

export default function confirmOverrideModal() {
  const originalData = useLocalSearchParams() as unknown;
  // type checking the key
  const currentData =
    originalData && typeof originalData === "object" && "key" in originalData
      ? (originalData as ListItem)
      : null;

  const childContent = (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="m-5 dark:text-white">The event already exists.</Text>
        <Text className="m-5 dark:text-white">
          Are you sure you want to override this event?
        </Text>
        <FilledPill
          label="Confirm"
          callback={() => {
            {
              /* If the modal was added on a stack, return to
                        previous page. Otherwise, return to index */
            }
            router.navigate({
              pathname: "/",
              params: {
                rawData: JSON.stringify(currentData),
                override: "true",
              },
            });
          }}></FilledPill>
        <OutlinedPill
          label="Cancel"
          callback={() => {
            router.navigate({
              pathname: "/",
              params: {},
            });
          }}></OutlinedPill>
      </View>
    </>
  );

  return (
    <>
      <Modal childContent={childContent}></Modal>
    </>
  );
}
