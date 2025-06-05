/** @overview Radio buttons with text options
 *
 * Custom radio button group that selects a single option
 * from a list of values.
 */

import React from "react";
import { View, Text, Pressable } from "react-native";

/**
 * Radio button group.
 * @param label Label describing the entire radio button group
 * @param options Contains text for each radio option to display
 * @param onChangeOption Callback to send selected option to parent component
 * @param selected Current selected option
 */
export default function RadioSelect({
  label,
  options,
  onChangeOption,
  selected,
}: {
  label: string;
  options: Array<string>;
  onChangeOption: (value: string) => void;
  selected?: string;
}) {
  const [option, setOption] = React.useState<string>(selected || options[0]);
  const handleChangeOption = (value: string) => {
    setOption(value); // updates local state
    onChangeOption(value); // updates parent container
  };

  // Sync the internal state with the `selected` prop if it changes
  React.useEffect(() => {
    if (selected !== undefined && selected !== option) {
      setOption(selected);
    }
  }, [selected]);

  const radioBtns = options.map((item, key) => (
    <RadioButton
      key={"radio-" + item + key}
      label={item}
      onSelect={handleChangeOption}
      selected={option}></RadioButton>
  ));

  return (
    <>
      <View className="m-2 flex flex-row items-center">
        <Text className="m-2 mr-5 dark:text-white">{label}</Text>
        {radioBtns}
      </View>
    </>
  );
}

/**
 * Individual radio button.
 * @param label Text for this radio option
 * @param onSelect Callback to handle changing selection
 * @param selected Determines if this option is selected
 */
function RadioButton({
  label,
  onSelect,
  selected,
}: {
  label: string;
  onSelect: (value: string) => void;
  selected: string;
}) {
  const handleSelect = () => {
    onSelect(label);
  };

  return (
    <>
      <Pressable
        accessibilityRole="radio"
        accessibilityLabel={label}
        accessibilityState={{ checked: label == selected }}
        onPress={handleSelect}>
        <View className="flex flex-row items-center justify-center">
          <View
            className={
              "rounded-full ring-2 " +
              (label == selected
                ? "ring-primary ring-offset-4"
                : "ring-gray-400 ring-offset-2")
            }>
            <View
              className={
                "size-8 rounded-full " +
                (label == selected
                  ? "bg-primary ring-4 ring-white"
                  : "bg-white ring-2 ring-gray-400")
              }></View>
          </View>
          <Text className="mx-2 dark:text-white">{label}</Text>
        </View>
      </Pressable>
    </>
  );
}
