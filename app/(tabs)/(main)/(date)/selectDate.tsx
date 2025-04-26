/** @overview Calendar view modal to select a date. */

import React from "react";
import Modal from "../../../../components/Modal";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { FilledPill, OutlinedPill } from "../../../../components/PillButton";
import DatePicker from "../../../../components/DatePicker";
import { useLocalSearchParams } from "expo-router";
import { ListItem } from "../../../../types";

export default function selectDate() {
  const [selectedDate, setSelectedDate] = React.useState<number>();

  const isPresented = router.canGoBack();

  const { typeOfDateLabel, rawData } = useLocalSearchParams<{
    typeOfDateLabel: string;
    rawData: string;
  }>();
  // converting data back into JSON
  const data = rawData ? (JSON.parse(rawData) as ListItem) : undefined;

  // TODO: write function to put new selected date in old data

  function updateDateValue(date: number) {
    setSelectedDate(date);
  }

  // load initial date
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

  const handleGoBack = () => {
    // update the data with selectedDate
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
        <Text className="m-5 flex items-start text-lg font-bold dark:text-white">
          Select {typeOfDateLabel.slice(0, -4)} time
        </Text>

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
