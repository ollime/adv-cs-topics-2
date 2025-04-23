import React from "react";
import Modal from "../../../components/Modal";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { FilledPill } from "../../../components/PillButton";

export default function testModal() {
  const isPresented = router.canGoBack();
  const childContent = (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="m-5 dark:text-white">Modal title</Text>
        <FilledPill
          label="Okay"
          callback={() => {
            {
              /* If the modal was added on a stack, return to
                previous page. Otherwise, return to index */
            }
            router.navigate(isPresented ? "../" : "/");
          }}></FilledPill>
      </View>
    </>
  );

  return (
    <>
      <Modal childContent={childContent}></Modal>
    </>
  );
}
