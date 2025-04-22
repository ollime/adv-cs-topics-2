import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { FilledPill } from "./../../../components/PillButton";

// TODO: If using this later, add in parameter for JSX content
export default function Modal() {
  const isPresented = router.canGoBack();
  const childContent = (
    <>
      <View className="flex items-center justify-center bg-white">
        <Text className="m-5">Modal title</Text>
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
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}>
      {/* Dismiss modal when pressing outside */}
      <Link href={"/"} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown}
        style={{
          width: "70%",
          height: "70%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}>
        {childContent}
      </Animated.View>
    </Animated.View>
  );
}
