/** @overview Screen to add a new event or modify an existing event */

import React from "react";

import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import Modal from "../../../../components/Modal";
import TextField from "../../../../components/inputFields/TextField";
import DateField from "../../../../components/inputFields/DateField";
import RadioSelect from "../../../../components/inputFields/RadioSelect";
import Alert from "../../../../components/Alert";
import { FilledPill, OutlinedPill } from "../../../../components/PillButton";
import { SelectablePalette } from "../../../../components/inputFields/Palette";

import { ListItem } from "../../../../types";
import { calculateTime } from "../../../../utils/DateTimeCalculation";

export default function addEventScreen() {
  // Data type fields for current shown event
  const [eventTitle, setEventTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string | undefined>("");
  const [type, setType] = React.useState<"since" | "until" | "elapsed">(
    "elapsed"
  );
  const [iconColor, setIconColor] = React.useState<string | undefined>("white");
  // set default values to 0 to prevent error when creating new event
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(0);

  // If there is an error, display an alert
  const [displayAlert, setDisplayAlert] = React.useState<boolean>(false);
  const [alertLabel, setAlertLabel] = React.useState<string>("");

  const params = useLocalSearchParams() as unknown;
  // type checking the key
  const initialData =
    params && typeof params === "object" && "key" in params
      ? (params as ListItem)
      : null;

  // load initial data (for modifying existing event)
  React.useEffect(() => {
    if (initialData && initialData.type) {
      setEventTitle(initialData.key);
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (type == "since") {
      setEndTime(Math.floor(today.valueOf() / 1000)); // set to today at 0:00
    }
    if (type == "until") {
      setStartTime(Math.floor(today.valueOf() / 1000)); // set to today at 0:00
    }
  }, [type]);

  // alerts for data validation
  React.useEffect(() => {
    validateData();
  }, [startTime, endTime, eventTitle]);

  /**
   * Time data validation
   * @returns true if times are correct, false otherwise
   */
  function validateData() {
    if (startTime > endTime) {
      setAlertLabel("End date cannot be before the start date.");
      setDisplayAlert(true);
      return false;
    } else if (!eventTitle) {
      setAlertLabel("Add an event title.");
      setDisplayAlert(true);
      return false;
    } else {
      setDisplayAlert(false);
      return true;
    }
  }

  /** Retrieves data currently displayed on the screen
   * @returns {ListItem}
   */
  function getCurrentData() {
    if (eventTitle) {
      return {
        /* use initial key, not current value, to prevent a bug where the
        initial key value changes between moving to the date picker modal
        and confirming changes. this results in event title changes being
        reverted back */
        key: initialData ? initialData.key : eventTitle,
        description: description,
        color: iconColor,
        type: type,
        startTime: startTime,
        endTime: endTime,
      };
    }
  }

  /** Gets the key of the original data
   * @returns {string}
   */
  function getInitialKey() {
    if (initialData) {
      return initialData.key;
    } else {
      return null;
    }
  }

  /**
   * Conditional text rendering based off event type
   * @param type
   * @param startTime
   * @param endTime
   * @returns Text to be displayed
   */
  function renderText(type?: string, startTime?: number, endTime?: number) {
    const time: number = calculateTime(startTime, endTime);

    // TODO: consider moving to DateManager?
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

  /** Opens the selectDate modal */
  function openDatePicker(type: string) {
    router.navigate({
      pathname: "/selectDate",
      params: {
        typeOfDateLabel: type,
        rawData: JSON.stringify(getCurrentData()),
      },
    });
  }

  /** Closes the modal and sends current data */
  function openAddEvent() {
    if (!validateData()) {
      return;
    } else if (eventTitle) {
      router.navigate({
        pathname: "/events",
        params: {
          rawData: JSON.stringify(getCurrentData()),
          overrideKey: getInitialKey(),
        },
      });
    }
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
              {renderText(type, startTime, endTime)}
            </Text>
          </View>
        ) : (
          ""
        )}
      </View>

      {/* Main content */}
      <View className="flex items-center justify-center">
        <TextField
          label="Event title"
          onChangeText={setEventTitle}
          initialText={eventTitle}
          multiline={false}></TextField>
        <TextField
          label="Description"
          onChangeText={setDescription}
          initialText={description}
          multiline={true}></TextField>

        <View className="m-2 flex flex-row items-center">
          <Text className="m-2 dark:text-white">Icon color</Text>
          <SelectablePalette
            onChangeOption={setIconColor}
            selected={iconColor}></SelectablePalette>
        </View>

        <RadioSelect
          label="Days"
          options={["since", "until", "elapsed"]}
          onChangeOption={(value) =>
            setType(value as "since" | "until" | "elapsed")
          }
          selected={type}></RadioSelect>

        <View className="my-5 flex w-80 flex-1 items-center border-t">
          <DateField
            label="Started"
            type="startTime"
            time={startTime}
            disabled={type == "until" ? true : false}
            openDatePicker={openDatePicker}></DateField>
          <DateField
            label="Ended"
            type="endTime"
            time={endTime}
            disabled={type == "since" ? true : false}
            openDatePicker={openDatePicker}></DateField>
        </View>
      </View>

      {displayAlert ? (
        <Alert
          label={alertLabel}
          hidden={!displayAlert}
          setHidden={setDisplayAlert}></Alert>
      ) : (
        ""
      )}

      <View className="mb-5 mr-5 mt-2 flex flex-row content-end justify-end">
        {/* Save / close modal */}
        <FilledPill label="Confirm" callback={openAddEvent}></FilledPill>
        {/* Close modal without saving */}
        <OutlinedPill
          label="Cancel"
          callback={() => {
            router.navigate({
              pathname: "/events",
              params: {},
            });
          }}></OutlinedPill>
      </View>
    </>
  );

  return <Modal childContent={childContent}></Modal>;
}
