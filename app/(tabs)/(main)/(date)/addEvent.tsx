import React from "react";

import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import Modal from "../../../../components/Modal";
import TextField from "../../../../components/TextField";
import DateField from "../../../../components/DateField";
import RadioSelect from "../../../../components/RadioSelect";
import { FilledPill, OutlinedPill } from "../../../../components/PillButton";
import { SelectablePalette } from "../../../../components/Palette";
import { ListItem } from "../../../../types";

export default function addEventScreen() {
  const [modalTitle, setModalTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string | undefined>("");
  const [type, setType] = React.useState<"since" | "until" | "elapsed">(
    "elapsed"
  );
  const [iconColor, setIconColor] = React.useState<string | undefined>("white");
  const [startTime, setStartTime] = React.useState<number>();
  const [endTime, setEndTime] = React.useState<number>();

  const params = useLocalSearchParams() as unknown;
  // type checking the key
  const initialData =
    params && typeof params === "object" && "key" in params
      ? (params as ListItem)
      : null;

  // loadData function
  React.useEffect(() => {
    if (initialData && initialData.type) {
      setModalTitle(initialData.key);
      setDescription(initialData.description);
      if (
        initialData.type === "since" ||
        initialData.type === "until" ||
        initialData.type === "elapsed"
      ) {
        setType(initialData.type);
      }
      setIconColor(initialData.color);
      if (initialData.startTime) {
        setStartTime(initialData.startTime);
      }
      if (initialData.endTime) {
        setEndTime(initialData.endTime);
      }
    }
  }, []);

  // sets startTime or endTime to today's date based on what type of event is selected
  React.useEffect(() => {
    if (type == "since") {
      setStartTime(Math.floor(Date.now() / 1000));
    }
    if (type == "until") {
      setEndTime(Math.floor(Date.now() / 1000));
    }
  }, [type]);

  function getCurrentData() {
    if (modalTitle) {
      return {
        /* use initial key, not current value, to prevent a bug where the
        initial key value changes between moving to the date picker modal
        and confirming changes. this results in event title changes being
        reverted back */
        key: initialData ? initialData.key : modalTitle,
        description: description,
        color: iconColor,
        type: type,
        startTime: startTime,
        endTime: endTime,
      };
    }
  }

  function getInitialKey() {
    if (initialData) {
      return initialData.key;
    } else {
      return null;
    }
  }

  function saveTitle(value: string) {
    setModalTitle(value);
  }

  function saveDescription(value: string) {
    setDescription(value);
  }

  function saveType(value: "since" | "until" | "elapsed") {
    setType(value);
  }

  function saveColor(value: string) {
    setIconColor(value);
  }

  function handleAddEvent() {
    /* If the modal was added on a stack, return to
          previous page. Otherwise, return to index */
    if (modalTitle) {
      router.navigate({
        pathname: "/",
        params: {
          rawData: JSON.stringify(getCurrentData()),
          overrideKey: getInitialKey(),
        },
      });
    } else {
      // TODO: Create better alert popup
      alert("Add a title!");
    }
  }

  function convertSecondsToDays(time: number) {
    return Math.round(time / 60 / 60 / 24);
  }

  function renderText(type?: string, startTime?: number, endTime?: number) {
    let time: number = 0;
    if (startTime && endTime) {
      time = convertSecondsToDays(endTime - startTime); // time elapsed
    } else if (startTime) {
      time = convertSecondsToDays(Date.now() / 1000 - startTime); // time since
    } else if (endTime) {
      time = convertSecondsToDays(endTime - Date.now() / 1000); // time until
    }

    if (type && (time || time === 0)) {
      if (type == "since") {
        return time + " days ago";
      } else if (type == "until") {
        return "in " + time + " days";
      } else if (type == "elapsed") {
        return "elapsed for " + time + " days";
      }
    } else {
      return "Error: Data not loaded.";
    }
  }

  function openDatePicker(type: string) {
    router.navigate({
      pathname: "/selectDate",
      params: {
        typeOfDateLabel: type,
        rawData: JSON.stringify(getCurrentData()),
      },
    });
  }

  const childContent = (
    <>
      <View className="mb-7 mt-7 flex flex-1 flex-row items-center justify-between">
        <Text className="mx-5 flex items-start text-lg font-bold dark:text-white">
          {initialData ? "Modify existing event" : "Add new event"}
        </Text>
        {initialData ? (
          <View className="mx-5 flex flex-row items-center">
            <Ionicons name="timer-outline" size={24} color="black" />
            <Text className="text-md ml-1 font-bold dark:text-white">
              {renderText(
                initialData.type,
                initialData.startTime,
                initialData.endTime
              )}
            </Text>
          </View>
        ) : (
          ""
        )}
      </View>

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
          onChangeOption={(value) =>
            saveType(value as "since" | "until" | "elapsed")
          }
          selected={type}></RadioSelect>

        <View className="my-5 flex w-80 flex-1 items-center border-t">
          <DateField
            label="Started"
            type="startTime"
            time={startTime}
            disabled={type == "since" ? true : false}
            openDatePicker={openDatePicker}></DateField>
          <DateField
            label="Ended"
            type="endTime"
            time={endTime}
            disabled={type == "until" ? true : false}
            openDatePicker={openDatePicker}></DateField>
        </View>
      </View>

      <View className="mb-5 mr-5 mt-2 flex flex-row content-end justify-end">
        {/* Save / close modal */}
        <FilledPill label="Confirm" callback={handleAddEvent}></FilledPill>
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
