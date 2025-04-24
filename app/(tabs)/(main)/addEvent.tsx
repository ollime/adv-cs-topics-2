import React from "react";

import { View, Text } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import Modal from "../../../components/Modal";
import TextField from "../../../components/TextField";
import DateField from "../../../components/DateField";
import RadioSelect from "../../../components/RadioSelect";
import { FilledPill, OutlinedPill } from "../../../components/PillButton";
import { SelectablePalette } from "../../../components/Palette";
import { ListItem } from "./../../../types";

export default function addEventScreen() {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [type, setType] = useState<"since" | "until" | "elapsed" | string>(
    "since"
  );
  const [iconColor, setIconColor] = useState<string | undefined>("white");

  const params = useLocalSearchParams() as unknown;
  // type checking the key
  const initialData =
    params && typeof params === "object" && "key" in params
      ? (params as ListItem)
      : null;

  // TODO: useEffect to load newData
  // loadData function
  useEffect(() => {
    if (initialData && initialData.type) {
      setModalTitle(initialData.key);
      setDescription(initialData.description);
      setType(initialData.type);
      setIconColor(initialData.color);
    }
  }, []);

  function getCurrentData() {
    if (modalTitle) {
      return {
        key: modalTitle,
        description: description,
        color: iconColor,
        type: type,
        time: 0,
      };
    }
  }

  function saveTitle(value: string) {
    return setModalTitle(value);
  }

  function saveDescription(value: string) {
    return setDescription(value);
  }

  function saveType(value: "since" | "until" | "elapsed") {
    return setType(value);
  }

  function saveColor(value: string) {
    return setIconColor(value);
  }

  // const isPresented = router.canGoBack();
  const childContent = (
    <>
      <Text className="mx-5 mt-5 flex items-start text-lg font-bold dark:text-white">
        Add new event
      </Text>

      {/* Main content */}
      <View className="flex items-center justify-center">
        <TextField
          label="Modal title"
          onChangeText={saveTitle}
          initialText={modalTitle}></TextField>
        <TextField
          label="Description"
          onChangeText={saveDescription}
          initialText={description}></TextField>

        <View className="m-2 flex flex-row items-center">
          <Text className="m-2 dark:text-white">Icon color</Text>
          <SelectablePalette
            onChangeOption={saveColor}
            selected={iconColor}></SelectablePalette>
        </View>

        <RadioSelect
          label="Days"
          options={["since", "until", "elapsed"]}
          onChangeOption={saveType}
          selected={type}></RadioSelect>

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
            if (modalTitle) {
              router.navigate({
                pathname: "/",
                params: { rawData: JSON.stringify(getCurrentData()) },
              });
            } else {
              // TODO: Create better alert popup
              alert("Add a title!");
            }
          }}></FilledPill>
        {/* Close modal without saving */}
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

  return <Modal childContent={childContent}></Modal>;
}
