import React from "react";
import { View, Text, Pressable } from "react-native";

export default function RadioSelect({
  label,
  options,
  onChangeOption,
  selected,
}: {
  label: string;
  options: Array<"since" | "until" | "elapsed">;
  onChangeOption: (value: "since" | "until" | "elapsed") => void;
  selected?: string;
}) {
  const [option, setOption] = React.useState<string>(selected || options[0]);
  const handleChangeOption = (value: "since" | "until" | "elapsed") => {
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

function RadioButton({
  label,
  onSelect,
  selected,
}: {
  label: "since" | "until" | "elapsed";
  onSelect: (value: "since" | "until" | "elapsed") => void;
  selected: string;
}) {
  const handleSelect = () => {
    onSelect(label);
  };

  return (
    <>
      <Pressable onPress={handleSelect}>
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
