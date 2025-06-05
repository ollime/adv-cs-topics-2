/** @overview ToggleSwitch
 *
 * Uses the built-in React Native ToggleSwitch component.
 */

import React from "react";
import { View, Text, Switch } from "react-native";

export default function toggleSwitch({
  label,
  callback,
  selected,
}: {
  label: string;
  callback: (isEnabled: boolean) => void;
  selected: boolean;
}) {
  const [isEnabled, setIsEnabled] = React.useState<boolean>(selected);
  const changeValue = (isEnabled: boolean) => {
    setIsEnabled(isEnabled);
    callback(isEnabled);
  };

  // Sync the internal state with the `selected` prop if it changes
  React.useEffect(() => {
    if (selected !== undefined && selected !== isEnabled) {
      setIsEnabled(selected);
    }
  }, [selected]);

  return (
    <>
      <View className="m-4 flex flex-row">
        <Text className="dark:text-white">{label}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#8f7ce6" }}
          thumbColor={!isEnabled ? "#ffffff" : "#ffffff"}
          //@ts-expect-error type
          activeThumbColor={"#3210C9"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={changeValue}
          value={isEnabled}
          className="ml-5 scale-150 transform"
          accessibilityRole="switch"
          accessibilityLabel={label}
        />
      </View>
    </>
  );
}
