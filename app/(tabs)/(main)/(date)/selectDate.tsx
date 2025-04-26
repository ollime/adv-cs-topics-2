/** @overview Calendar view modal to select a date. */

import React from "react";
import Modal from "../../../../components/Modal";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { FilledPill, OutlinedPill } from "../../../../components/PillButton";
import DatePicker from "../../../../components/DatePicker";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";

export default function selectDate() {
  const [selectedDate, setSelectedDate] = React.useState<number>();

  const isPresented = router.canGoBack();

  const { typeOfDateLabel } = useLocalSearchParams<{
    typeOfDateLabel: string;
  }>();
  const globalParams = useGlobalSearchParams();

  // TODO: write function to put new selected date in old data

  function updateDateValue(date: number) {
    setSelectedDate(date);
  }

  const handleGoBack = () => {
    // update the data with selectedDate
    if (selectedDate) {
      if (typeOfDateLabel == "startTime") {
        globalParams.startTime = selectedDate.toString();
      } else if (typeOfDateLabel == "endTime") {
        globalParams.endTime = selectedDate.toString();
      }
    }
    router.navigate({
      pathname: "/addEvent",
      params: globalParams,
    });
  };

  const childContent = (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="m-5 flex items-start text-lg font-bold dark:text-white">
          Select {typeOfDateLabel.slice(0, -4)} time
        </Text>

        <DatePicker onDateChange={updateDateValue}></DatePicker>
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
