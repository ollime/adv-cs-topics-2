/** @overview Alert popup that closes when clicked on. */

import React from "react";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Alert({ label }: { label: string }) {
  const [hide, setHide] = React.useState<boolean>(false);
  const hideAlert = () => {
    setHide(true);
  };

  return (
    <>
      {!hide ? (
        <>
          <View className="m-5 mx-10 flex flex-row items-center justify-between rounded-lg border border-red-400 bg-red-100 p-4">
            <View className="flex flex-row">
              <Text className="font-bold text-red-500">WARNING: </Text>
              <Text className="text-red-500">{label}</Text>
            </View>
            <Pressable onPress={hideAlert}>
              <MaterialIcons name="close" size={24} color="red" />
            </Pressable>
          </View>
        </>
      ) : (
        ""
      )}
    </>
  );
}
