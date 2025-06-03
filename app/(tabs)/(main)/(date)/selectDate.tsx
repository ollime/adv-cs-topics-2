/** @overview Calendar view modal to select a date. */

import React from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Modal from "../../../../components/Modal";
import DatePicker from "../../../../components/inputFields/DatePicker";
import { FilledPill, OutlinedPill } from "../../../../components/PillButton";
import { ListItem } from "../../../../types";

export default function selectDate() {
  /** @type current selected date */
  const [selectedDate, setSelectedDate] = React.useState<number>();
  /** @type determines if expo router is a stacked screen */
  const isPresented = router.canGoBack();

  const { typeOfDateLabel, rawData } = useLocalSearchParams<{
    typeOfDateLabel: string /* "startTime" or "endTime" */;
    rawData: string /* JSON formatted as a string */;
  }>();
  // converting data back into JSON
  const data = rawData ? (JSON.parse(rawData) as ListItem) : undefined;

  /** Sets the selected date to a specified value */
  function updateDateValue(date: number) {
    setSelectedDate(date);
  }

  /** Sets the selected date to the current date. */
  function setDateToNow() {
    setSelectedDate(Math.floor(Date.now() / 1000));
  }

  // load initial date data
  React.useEffect(() => {
    if (data) {
      if (typeOfDateLabel == "startTime") {
        setSelectedDate(data.startTime);
      }
      if (typeOfDateLabel == "endTime") {
        setSelectedDate(data.endTime);
      }
    }
  }, []);

  /** Closes the selectDate modal and updates the data for the previous page */
  const handleGoBack = () => {
    if (selectedDate && data) {
      if (typeOfDateLabel == "startTime") {
        data.startTime = selectedDate;
      }
      if (typeOfDateLabel == "endTime") {
        data.endTime = selectedDate;
      }
    }
    router.navigate({
      pathname: "/addEvent",
      params: JSON.parse(JSON.stringify(data)),
    });
  };

  const childContent = (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="m-5 mb-2 flex items-start text-lg font-bold dark:text-white">
          Select {typeOfDateLabel.slice(0, -4)} time
        </Text>

        <View className="mb-4">
          <FilledPill
            label="Set date to today"
            callback={setDateToNow}></FilledPill>
        </View>

        <DatePicker
          onDateChange={updateDateValue}
          initialDate={selectedDate}></DatePicker>

        <View className="m-5 flex flex-1 flex-row">
          <FilledPill label="Confirm" callback={handleGoBack}></FilledPill>
          <OutlinedPill
            label="Cancel"
            callback={() => {
              router.navigate({
                pathname: isPresented ? "../" : "",
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
