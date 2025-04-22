import React from "react";
import { View, Text } from "react-native";
import { Link, router } from "expo-router";

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <View className="m-auto flex flex-1 justify-center">
      <View className="align-center flex-shrink-1 flex size-80 justify-center rounded-xl border-2 border-black bg-white p-10">
        <Text>Modal title</Text>
        {/* If the modal was added on a stack, return to
        previous page. Otherwise, return to index */}
        <Link href={isPresented ? "../" : "/"}>
          {isPresented ? "Dismiss" : "Return to main page"}
        </Link>
      </View>
    </View>
  );
}
