/** Multiselect dropdown field that allows the selection of
 * multiple items from a list.
 *
 * This component takes in a list of values (specifically the
 * list of events) and displays it in a dropdown UI element.
 * Clicking on items from the dropdown will display them in a
 * separate display, where multiple items can be shown at once.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

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

// custom styles
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
