import React from "react";
import { View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

export default function Calendar() {
  const defaultClassNames = useDefaultClassNames();
  const [selected, setSelected] = React.useState<DateType>();

  return (
    <View className="m-20 flex w-56 min-w-[300px] rounded-xl bg-white">
      <DateTimePicker
        mode="single"
        date={selected}
        onChange={({ date }) => setSelected(date)}
        classNames={{
          ...defaultClassNames,
          header: "bg-gray-400 rounded-t-xl",
          today: "bg-gray-200",
          selected: "bg-primary",
          selected_label: "text-white",
          selected_month_label: "text-white",
          selected_year_label: "text-white",
          outside_label: "text-gray-400",
          weekday_label: "text-gray-400",
          weekdays: "border-b border-gray-400",
        }}
        showOutsideDays={true}
      />
    </View>
  );
}
