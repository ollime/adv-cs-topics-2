/** @overview Modal to confirm adding an event in the case that two events share the same name. */

import React from "react";
import Modal from "../../../components/Modal";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import { ListItem } from "./../../../types";

export default function confirmOverrideModal() {
  const { data, overrideKey } = useLocalSearchParams<{
    data: string;
    overrideKey?: string;
  }>();
  const currentData = data ? (JSON.parse(data) as ListItem) : undefined;

  const childContent = (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="m-5 dark:text-white">
          {currentData && overrideKey == currentData.key
            ? "The event already exists."
            : "This action will rename the event."}
        </Text>
        <Text className="m-5 dark:text-white">
          Are you sure you want to override this event?
        </Text>
        <View className="flex flex-1 flex-row">
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
                  overrideKey: overrideKey,
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
      </View>
    </>
  );

  return (
    <>
      <Modal childContent={childContent}></Modal>
    </>
  );
}
