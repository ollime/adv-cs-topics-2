/**
 * @overview Modal to confirm adding an event in the case
 * that two events share the same name OR an existing event
 * is being renamed.
 * */

import React from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Modal from "../../../components/Modal";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import { ListItem } from "./../../../types";

export default function confirmOverrideModal() {
  const { data, overrideKey } = useLocalSearchParams<{
    /** Event data */
    data: string;
    /** Key of event being overridden */
    overrideKey?: string;
  }>();
  /** Event data in JSON format */
  const currentData = data ? (JSON.parse(data) as ListItem) : undefined;

  const childContent = (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="m-5 dark:text-white">
          {!overrideKey || (currentData && overrideKey == currentData.key)
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
