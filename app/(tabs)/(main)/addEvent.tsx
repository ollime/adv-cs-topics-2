import React from "react";
import Modal from "../../../components/Modal";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import Palette from "../../../components/Palette";
import TextField from "../../../components/TextField";
import DateField from "../../../components/DateField";
import RadioSelect from "../../../components/RadioSelect";

export default function addEventScreen() {
  function addNewEvent() {
    console.log("added!");
  }

  const isPresented = router.canGoBack();
  const childContent = (
    <>
      <Text className="mx-5 mt-5 flex items-start text-lg font-bold dark:text-white">
        Add new event
      </Text>

      {/* Main content */}
      <View className="flex items-center justify-center">
        <TextField label="Modal title"></TextField>
        <TextField label="Description"></TextField>

        <View className="m-2 flex flex-row items-center">
          <Text className="m-2 dark:text-white">Icon color</Text>
          <Palette></Palette>
        </View>

        <RadioSelect label="Type"></RadioSelect>

        <DateField label="Started"></DateField>
        <DateField label="Ended"></DateField>
      </View>

      <View className="mb-5 mr-5 flex flex-row content-end justify-end">
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
    </>
  );

  return <Modal childContent={childContent}></Modal>;
}
