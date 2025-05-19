import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ListItem } from "../../types";

export default function DropdownComponent({
  data,
  preset,
  callback,
}: {
  data;
  preset: Array<string>;
  callback: (value: Array<string>) => void;
}) {
  const [value, setValue] = React.useState(preset);
  const [isFocus, setIsFocus] = React.useState(false);

  // // Sync the internal state with the `selected` prop if it changes
  // React.useEffect(() => {
  //   if (preset !== undefined && preset !== value) {
  //     setValue(preset);
  //   }
  // }, [preset]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="key"
        valueField="key"
        activeColor="#d1d1d1"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        selectedStyle={styles.selectedStyle}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          callback(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    backgroundColor: "white",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    backgroundColor: "white",
  },
});
