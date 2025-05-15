/** Select the current date. */

import React from "react";
import { View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

export default function Calendar({
  onDateChange,
  initialDate,
}: {
  onDateChange: (date: number) => void;
  initialDate?: number;
}) {
  const defaultClassNames = useDefaultClassNames();
  const [selected, setSelected] = React.useState<DateType>(initialDate);

  /**
   * Sets local and parent date variables
   * @param date
   */
  const handleDateChange = (date: DateType) => {
    const unixValue = date?.valueOf() as number;
    // update parent container state
    onDateChange(unixValue / 1000);
    // update local state
    setSelected(unixValue);
  };

  // Sync the internal state with the `initialDate` prop if it changes
  React.useEffect(() => {
    if (initialDate !== undefined && initialDate !== selected) {
      setSelected(initialDate * 1000);
    }
  }, [initialDate]);

  return (
    <View className="flex w-56 min-w-[300px] rounded-xl bg-white">
      <DateTimePicker
        mode="single"
        date={selected}
        onChange={({ date }) => handleDateChange(date)}
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
