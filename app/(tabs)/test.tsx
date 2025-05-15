import React from "react";
import { ScrollView } from "react-native";
import {
  ElapsedEventCard,
  UntilEventCard,
  SinceEventCard,
} from "../../components/MilestoneCard";

import { calculateTime } from "../../utils/DateTimeCalculation";

export default function secondPage() {
  const startTime = 1725623522;
  const endTime = 1748222240;
  const time: number = calculateTime(startTime, endTime);
  // temporary variable, fix calculateTime later
  const timeWithSeconds: number = calculateTime(startTime, endTime) + 0.4352;
  console.log(timeWithSeconds);
  const eventTitle = "My Event";

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ElapsedEventCard time={time} eventTitle={eventTitle} />
        <UntilEventCard time={timeWithSeconds} eventTitle={eventTitle} />
        <SinceEventCard time={time} eventTitle={eventTitle} />
      </ScrollView>
    </>
  );
}
